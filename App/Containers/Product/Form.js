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
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import { DotIndicator } from 'react-native-indicators';
import { ReactNativeFile } from 'apollo-upload-client';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { Mutation } from 'react-apollo';
import { Colors, Metrics } from 'Themes';
import Config from 'Config/AppConfig';
import { FETCH_PRODUCT_DETAIL, FETCH_PRODUCT_LIST } from 'GraphQL/Product/Query';
import { ADD_PRODUCT, EDIT_PRODUCT } from 'GraphQL/Product/Mutation';
import { getEditedProduct } from 'Redux/ProductRedux';
import { KeyboardFriendlyView, LoadingPage, StatePage, QueryEffectPage, ImagePicker, ImageRobust, InputText } from 'Components';
import { InAppNotification, getReadableDate, parseToRupiah, moderateScale } from 'Lib';
import { getUserId } from 'Redux/SessionRedux';

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
    per_unit: '',
    price: '',
    price_parsed: '',
    discount: '',
    label: '',
    expired_date: '',
    minimum_order: '',
    photos: null,
    error_title: null,
    error_description: null,
    error_stock: null,
    error_unit: null,
    error_per_unit: null,
    error_price: null,
    error_discount: null,
    error_label: null,
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
    const {
      title,
      description,
      stock,
      unit,
      per_unit,
      price,
      label,
      minimum_order
    } = this.state;
    this.setState({
      error_title: !title ? Config.warningMandatory : null,
      error_description: !description ? Config.warningMandatory : null,
      error_stock: !stock ? Config.warningMandatory : null,
      error_unit: !unit ? Config.warningMandatory : null,
      error_per_unit: !per_unit ? Config.warningMandatory : null,
      error_price: !price ? Config.warningMandatory : null,
      error_label: !label ? Config.warningMandatory : null,
      error_minimum_order: !minimum_order ? Config.warningMandatory : null,
    });
    return (
      title &&
      description &&
      stock &&
      unit &&
      per_unit &&
      price &&
      label &&
      minimum_order
    ) ? true : false;
  };
  
  submit = mutate => {
    const { isEdit, userId } = this.props;
    this.setState({ data_invalid: false });
    if (!this.isValid()) {
      this.setState({ data_invalid: true });
      return;
    }
    const {
      _id,
      title,
      description,
      stock,
      unit,
      per_unit,
      price,
      discount,
      label,
      expired_date,
      minimum_order,
      photos,
    } = this.state;
    const dataSubmit = {
      title: (title || null),
      description: (description || null),
      stock: (parseFloat(stock) || null),
      unit: (unit || null),
      per_unit: (per_unit || null),
      price: (parseFloat(price) || null),
      discount: (parseFloat(discount) || null),
      label: (label || null),
      expired_date: (expired_date || null),
      minimum_order: (parseFloat(minimum_order) || null),
    };
    const id = { _id };
    let variables = {
      data: isEdit ? {...dataSubmit, ...id} : dataSubmit
    };
    if (Array.isArray(photos) && photos.length) {
      const images = photos.map((item, index) => 
        new ReactNativeFile({
          uri: item.path,
          name: `${moment().format('YYYYMMDDHHmmss')}_${index}_${userId}`,
          type: item.mime
        })
      );
      variables = Object.assign({}, variables, images);
    }
    mutate({
      variables,
      context: {
        hasUpload: true, // activate Upload link
      }
    });
  };
  
  onUploadCompleted = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');
  };
  
  onChangeStok = (text) => {
    if (!text) {
      this.setState({ stock: null });
      return;
    }
    const stokInt = parseInt(text, 10);
    let result = '';
    if (stokInt <= 0) {
      result = `1`;
    } else if(stokInt > 0) {
      result = `${stokInt}`;
    }
    this.setState({ stock: result });
  }
  
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
  
  onPhotoPicked = (raw, paths) => {
    const photos = paths.map((item, i) => {
      return {
        mime: raw[i][0].mime,
        path: item[0],
      };
    })
    this.setState({ photos });
  }

  render() {
    const {
      title,
      description,
      stock,
      unit,
      per_unit,
      price,
      price_parsed,
      discount,
      label,
      expired_date,
      minimum_order,
      photos,
      error_title,
      error_description,
      error_stock,
      error_unit,
      error_per_unit,
      error_price,
      error_discount,
      error_label,
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
          isLoading={fetching_init}
          isError={fetching_error}
          onRefetch={() => this.fetchInitData()}
        />
      );
    }
    return (
      <KeyboardFriendlyView style={{flex:1}}>
        <Mutation
          mutation={isEdit ? EDIT_PRODUCT : ADD_PRODUCT}
          onCompleted={this.onUploadCompleted}
          refetchQueries={[{
            query: FETCH_PRODUCT_LIST
          }]}
          ignoreResults={false}
          errorPolicy='all'>
          { (mutate, {loading, error, data}) => {
            return (
              <React.Fragment>
                <ScrollView
                  style={{flex:1}}
                  contentContainerStyle={{ padding: Metrics.baseMargin }}
                >
                  <InputText
                    title="Judul"
                    placeholder="Judul produk"
                    value={title}
                    error={error_title}
                    onChangeText={(text) => this.setState({ title: text })}
                    returnKeyType="next"
                    onSubmitEditing={() => this._description.focus()}
                  />
                  <InputText
                    refs={ref => this._description = ref}
                    title="Deskripsi"
                    placeholder="Deskripsi produk"
                    multiline={true}
                    value={description}
                    error={error_description}
                    onChangeText={(text) => this.setState({ description: text })}
                    returnKeyType="done"
                  />
                  <RNPickerSelect
                    placeholder={{
                      label: 'Pilih Unit',
                      value: null,
                    }}
                    items={[{label: 'kg', value: 'kg'}, {label: 'gram', value: 'gram'}, {label: 'pcs', value: 'pcs'}]}
                    onValueChange={(val, i) => this.setState({ unit: val})}
                    value={unit}>
                    <InputText
                      title="Unit"
                      placeholder="Pilih unit satuan"
                      value={unit}
                      error={error_unit}
                    />
                  </RNPickerSelect>
                  <InputText
                    title="Jumlah Unit per Satu bungkus"
                    placeholder="Berapa unit untuk satu bungkus"
                    value={per_unit}
                    error={error_per_unit}
                    suffix={unit ? `/${unit}` : ''}
                    onChangeText={(text) => this.setState({ per_unit: text })}
                    returnKeyType="next"
                    keyboardType="numeric"
                    onSubmitEditing={() => this._price.focus()}
                  />
                  <InputText
                    refs={ref => this._price = ref}
                    title="Harga per bungkus"
                    placeholder="Harga per bungkus"
                    value={price_parsed}
                    prefix="Rp"
                    editable={per_unit && unit ? true : false}
                    styleInput={
                      !per_unit || !unit ? {
                        backgroundColor: Colors.border
                      }
                      : null
                    }
                    suffix={per_unit && unit ? `/${per_unit} ${unit}` : ''}
                    error={error_price}
                    onChangeText={(text) => this.setState({
                      price: text.replace(/\D+/g, ''),
                      price_parsed: parseToRupiah(text, ' ') || '-',
                    })}
                    returnKeyType="next"
                    keyboardType="numeric"
                    onSubmitEditing={() => this._minimum_order.focus()}
                  />
                  <InputText
                    refs={ref => this._minimum_order = ref}
                    title="Minimal pemesanan"
                    placeholder="Minimal pemesanan per order"
                    value={minimum_order}
                    editable={per_unit && unit ? true : false}
                    suffix="bungkus"
                    error={error_minimum_order}
                    onChangeText={(text) => this.setState({ minimum_order: text })}
                    returnKeyType="next"
                    keyboardType="numeric"
                    onSubmitEditing={() => this._stock.focus()}
                    styleInput={
                      !per_unit || !unit ? {
                        backgroundColor: Colors.border
                      }
                      : null
                    }
                  />
                  <InputText
                    refs={ref => this._stock = ref}
                    title="Stok"
                    placeholder="Stok yang tersedia"
                    value={stock}
                    error={error_stock}
                    suffix="bungkus"
                    editable={per_unit && unit ? true : false}
                    onChangeText={this.onChangeStok}
                    returnKeyType="next"
                    keyboardType="numeric"
                    onSubmitEditing={() => this._discount.focus()}
                    styleInput={
                      !per_unit || !unit ? {
                        backgroundColor: Colors.border
                      }
                      : null
                    }
                  />
                  <InputText
                    refs={ref => this._discount = ref}
                    title="Diskon"
                    placeholder="Diskon dalam bentuk %"
                    value={discount}
                    suffix={
                      price && discount ?
                        `- ${parseToRupiah((price * discount * 0.01)) || ''}` :
                        ''
                    }
                    error={error_discount}
                    onChangeText={this.onChangeDiscount}
                    returnKeyType="done"
                    keyboardType="numeric"
                  />
                  <RNPickerSelect
                    placeholder={{
                      label: 'Pilih label',
                      value: null,
                    }}
                    items={[{label: 'MHI Bebas Peskim', value: 'mhi'}, {label: 'Umum', value: 'umum'}]}
                    onValueChange={(val, i) => this.setState({ label: val})}
                    value={label}>
                    <InputText
                      title="Label"
                      placeholder="Pilih apa item ini berlabel MHI atau Umum"
                      value={label}
                      error={error_label}
                    />
                  </RNPickerSelect>
                  <TouchableOpacity
                    onPress={this.selectKadaluarsa}>
                    <InputText
                      title="Tanggal Kadaluarsa"
                      placeholder="Estimasi tanggal kadaluarsa"
                      value={
                        expired_date ?
                          getReadableDate(expired_date, 'DD-MM-YYYY', 'id', 'DD MMM YYYY') :
                          ''
                      }
                      error={error_expired_date}
                      editable={false}
                    />
                  </TouchableOpacity>
                  <Text 
                    style={{
                      color: 'rgba(0,0,0,0.68)',
                      fontFamily: 'CircularStd-Book',
                      fontSize: 14,
                      letterSpacing: -0.34,
                      marginBottom: moderateScale(6),
                    }}
                  >
                    Foto Produk
                  </Text>
                  <ImagePicker
                    onChange={this.onPhotoPicked}
                    data={photos}
                    titleBottomSheet='Pilih Foto'
                    isMultiplePick={true}
                    isShowCancelButton={false}
                    isShowGallery
                    styleButtonOk={{
                      backgroundColor: Colors.fruit_dark,
                      padding: moderateScale(8),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                    }}
                    styleTitleOk={{ color: Colors.white }}
                  />
                </ScrollView>
                <TouchableOpacity
                  disabled={data_invalid}
                  onPress={() => this.submit(mutate)}
                  style={{
                    flex: 1,
                    height: 50,
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
      </KeyboardFriendlyView>
    )
  }
}

Form.propTypes = {
  isEdit: bool,
  editedProductId: string,
  userId: string,
};

const mapStateToProps = createStructuredSelector({
  editedProductId: getEditedProduct(),
  userId: getUserId(),
})

export default connect(mapStateToProps, null)(withNavigation(Form));
