import React, { Component } from 'react';
import {
  DatePickerAndroid,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Picker
} from 'react-native';
import { bool, string } from 'prop-types';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import { DotIndicator } from 'react-native-indicators';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { Mutation } from 'react-apollo';
import { Colors, Metrics } from 'Themes';
import Config from 'Config/AppConfig';
import { FETCH_PRODUCT_DETAIL, FETCH_PRODUCT_LIST } from 'GraphQL/Product/Query';
import { ADD_PRODUCT, EDIT_PRODUCT } from 'GraphQL/Product/Mutation';
import { getEditedProduct } from 'Redux/ProductRedux';
import { LoadingPage, StatePage, QueryEffectPage } from 'Components';
import { InAppNotification, getReadableDate, parseToRupiah } from 'Lib';

class Form extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Ubah produk'
    }
  }

  state = {
    _id: '',
    title: '',
    description: '',
    stock: '',
    unit: '',
    price: '',
    price_parsed: '',
    discount: '',
    expired_date: '',
    minimum_order: '',
    error_title: null,
    error_description: null,
    error_stock: null,
    error_unit: null,
    error_price: null,
    error_discount: null,
    error_expired_date: null,
    error_minimum_order: null,
    fetching_init: false,
    fetching_error: false,
    fetching_complete: false,
    data_invalid: false,
  }
  
  componentDidMount() {
    this.fetchInitData();
  }
  
  fetchInitData = () => {
    const { editedProductId, isEdit } = this.props;
    if (!isEdit) return;
    this.setState({ fetching_init: true, fetching_error: false, fetching_complete: false });
    ApolloClientProvider.client.query({
      query: FETCH_PRODUCT_DETAIL,
      variables: { _id: editedProductId }
    })
    .then(data => {
      const { data: productData } = data;
      const { 
        product: { 
          _id = null,
          title = '',
          description = '',
          stock = '',
          unit = '',
          photo = '',
          price = '',
          discount = '',
          expired_date = '',
          minimum_order = '',
        }
      } = productData || {};
      this.setState({
        _id,
        title,
        description,
        stock: stock.toString(),
        unit,
        price: price.toString(),
        price_parsed: parseToRupiah(price, ' '),
        discount: discount.toString(),
        expired_date,
        minimum_order: minimum_order.toString(),
        fetching_init: false,
        fetching_complete: true,
      });
    })
    .catch(error => {
      this.setState({ fetching_init: false, fetching_error: true });
    });
  };
  
  isValid = () => {
    const { title, description, stock, unit, price, minimum_order } = this.state;
    this.setState({
      error_title: !title ? Config.warningMandatory : null,
      error_description: !description ? Config.warningMandatory : null,
      error_stock: !stock ? Config.warningMandatory : null,
      error_unit: !unit ? Config.warningMandatory : null,
      error_price: !price ? Config.warningMandatory : null,
      error_minimum_order: !minimum_order ? Config.warningMandatory : null,
    });
    return title && description && stock && unit && price && minimum_order;
  };
  
  submit = mutate => {
    const { isEdit } = this.props;
    this.setState({ data_invalid: false });
    if (!this.isValid()) {
      this.setState({ data_invalid: true });
      return;
    }
    const { _id, title, description, stock, unit, price, discount, expired_date, minimum_order } = this.state;
    const dataSubmit = {
      title: (title || null),
      description: (description || null),
      stock: (parseFloat(stock) || null),
      unit: (unit || null),
      price: (parseFloat(price) || null),
      discount: (parseFloat(discount) || null),
      expired_date: (expired_date || null),
      minimum_order: (parseFloat(minimum_order) || null),
    };
    const id = {
      _id
    };
    mutate({
      variables: {
        data: isEdit ? {...dataSubmit, ...id} : dataSubmit
      } 
    });
  };
  
  onUploadError = error => {
    InAppNotification.error();
  };
  
  onUploadCompleted = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');
  };
  
  onChangeDiscount = (text) => {
    const discountInt = parseInt(text, 10);
    let result = '';
    if (discountInt >= 0 && discountInt <= 100) {
      result = `${discountInt}`;
    } else if (discountInt > 100) {
      result = `100`;
    } else if (discountInt <= 0) {
      result = `0`;
    }
    this.setState({ discount: result });
  };
  
  selectKadaluarsa = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
        minDate: new Date(),
        mode: 'calendar'
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const days = day < 10 ? `0${day}` : day;
        const months = month < 10 ? `0${month}` : month;
        this.setState({ expired_date: `${days}-${months}-${year}` });
      }
    } catch ({code, message}) {
      InAppNotification.errorLocal(null, message);
    }
  }

  render() {
    const {
      title,
      description,
      stock,
      unit,
      price,
      price_parsed,
      discount,
      expired_date,
      minimum_order,
      error_title,
      error_description,
      error_stock,
      error_unit,
      error_price,
      error_discount,
      error_expired_date,
      error_minimum_order,
      fetching_init,
      fetching_complete,
      fetching_error,
      data_invalid,
    } = this.state;
    const { isEdit } = this.props;
    if (isEdit && !fetching_complete) {
      return (
        <QueryEffectPage
          loading={fetching_init}
          state={fetching_error}
          onStateRefresh={() => this.fetchInitData()}
        />
      );
    }
    return (
      <View style={{flex:1}}>
        <Mutation
          mutation={isEdit ? EDIT_PRODUCT : ADD_PRODUCT}
          onCompleted={this.onUploadCompleted}
          onError={this.onUploadError}
          refetchQueries={[{
            query: FETCH_PRODUCT_LIST
          }]}
          ignoreResults={false}
          errorPolicy='all'>
          { (mutate, {loading, error, data}) => {
            console.tron.log('Form/render', loading, error, data);
            return (
              <React.Fragment>
                <ScrollView
                  style={{flex:1}}
                  contentContainerStyle={{ padding: Metrics.baseMargin }}
                >
                  <TextField
                    label="Judul"
                    value={title}
                    error={error_title}
                    onChangeText={(text) => this.setState({ title: text })}
                    returnKeyType="next"
                    onSubmitEditing={() => this._description.focus()}
                  />
                  <TextField
                    ref={ref => this._description = ref}
                    label="Deskripsi"
                    value={description}
                    error={error_description}
                    onChangeText={(text) => this.setState({ description: text })}
                    returnKeyType="next"
                    onSubmitEditing={() => this._stock.focus()}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                      <TextField
                        ref={ref => this._stock = ref}
                        label="Stok"
                        value={stock}
                        error={error_stock}
                        onChangeText={(text) => this.setState({ stock: text })}
                        returnKeyType="next"
                      />
                    </View>
                    <View style={{flex:1}}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Pilih Unit',
                          value: null,
                        }}
                        items={[{label: 'kg', value: 'kg'}, {label: 'gram', value: 'gram'}]}
                        onValueChange={(val, i) => this.setState({ unit: val})}
                        value={unit}>
                        <TextField
                          label="Unit"
                          value={unit}
                          error={error_unit}
                        />
                      </RNPickerSelect>
                    </View>
                  </View>
                  <TextField
                    ref={ref => this._price = ref}
                    label="Harga per unit"
                    value={price_parsed}
                    prefix="Rp"
                    suffix={unit ? `/${unit}` : ''}
                    error={error_price}
                    onChangeText={(text) => this.setState({
                      price: text.replace(/\D+/g, ''),
                      price_parsed: parseToRupiah(text, ' ') || '-',
                    })}
                    returnKeyType="next"
                    onSubmitEditing={() => this._discount.focus()}
                  />
                  <TextField
                    ref={ref => this._discount = ref}
                    label="Diskon"
                    value={discount}
                    suffix={
                      price && discount ?
                        `- ${parseToRupiah((price * discount * 0.01)) || ''}` :
                        ''
                    }
                    error={error_discount}
                    onChangeText={this.onChangeDiscount}
                    returnKeyType="next"
                  />
                  <TouchableOpacity
                    onPress={this.selectKadaluarsa}>
                    <TextField
                      label="Tanggal Kadaluarsa"
                      value={
                        expired_date ?
                          getReadableDate(expired_date, 'DD-MM-YYYY', 'id', 'DD MMM YYYY') :
                          ''
                      }
                      error={error_expired_date}
                      editable={false}
                    />
                  </TouchableOpacity>
                  <TextField
                    ref={ref => this._minimum_order = ref}
                    label="Minimal pemesanan"
                    value={minimum_order}
                    suffix={unit}
                    error={error_minimum_order}
                    onChangeText={(text) => this.setState({ minimum_order: text })}
                    returnKeyType="go"
                    onSubmitEditing={() => this.submit(mutate)}
                  />
                </ScrollView>
                <TouchableOpacity
                  disabled={data_invalid}
                  onPress={() => this.submit(mutate)}
                  style={{
                    flex: 1,
                    maxHeight: 50,
                    backgroundColor: data_invalid ? Colors.brown_light : Colors.green_light,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {loading &&
                    <DotIndicator
                      count={4}
                      size={7}
                      color='white'
                      animationDuration={800}
                    />
                  }
                  {!loading &&
                    <Text style={{ color: 'white' }}>
                      Selesai
                    </Text>
                  }
                </TouchableOpacity>
              </React.Fragment>
            )
          }}
        </Mutation>
      </View>
    )
  }
}

Form.propTypes = {
  isEdit: bool,
  editedProductId: string,
};

const mapStateToProps = createStructuredSelector({
  editedProductId: getEditedProduct(),
})

export default connect(mapStateToProps, null)(withNavigation(Form));
