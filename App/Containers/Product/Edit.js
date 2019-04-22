import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { string } from 'prop-types';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Query, Mutation } from 'react-apollo';
import { Colors, Metrics } from 'Themes';
import Config from 'Config/AppConfig';
import { FETCH_PRODUCT_DETAIL } from 'GraphQL/Product/Query';
import { EDIT_PRODUCT } from 'GraphQL/Product/Mutation';
import { getEditedProduct } from 'Redux/ProductRedux';

class Edit extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Ubah produk'
    }
  }

  state = {
    title: '',
    description: '',
    stock: '',
    unit: '',
    price: '',
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
  }
  
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
  
  submitEdit = editProduct => {
    if (!this.isValid()) return;
    const { title, description, stock, unit, price, discount, expired_date, minimum_order } = this.state;
    const dataSubmit = {
      data: {
        title: (title || null),
        description: (description || null),
        stock: (stock || null),
        unit: (unit || null),
        price: (price || null),
        discount: (discount || null),
        expired_date: (expired_date || null),
        minimum_order: (minimum_order || null),
      }
    };
    console.tron.log('Edit/submitEdit', dataSubmit)
    editProduct(dataSubmit);
  };
  
  onUploadCompleted = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');
  };

  render() {
    const {
      title,
      description,
      stock,
      unit,
      price,
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
    } = this.state;
    const { editedProductId } = this.props
    return (
      <View style={{flex:1}}>
        <Query 
          variables={{ _id: editedProductId }}
          query={FETCH_PRODUCT_DETAIL}>
          {({ loading, error, data, refetch }) => {
            return (
              <Mutation
                mutation={EDIT_PRODUCT}
                onCompleted={this.onUploadCompleted}
                // update={(cache, data) => cacheAddAddress(cache, data, this.state)}
                ignoreResults={false}
                errorPolicy='all'>
                { (editProduct, {loading, error, data}) => {
                  console.tron.log('Edit/render', loading, error, data)
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
                              onSubmitEditing={() => this._unit.focus()}
                            />
                          </View>
                          <View style={{flex:1}}>
                            <TextField
                              ref={ref => this._unit = ref}
                              label="Unit"
                              value={unit}
                              error={error_unit}
                              onChangeText={(text) => this.setState({ unit: text })}
                              returnKeyType="next"
                              onSubmitEditing={() => this._price.focus()}
                            />
                          </View>
                        </View>
                        <TextField
                          ref={ref => this._price = ref}
                          label="Harga per unit"
                          value={price}
                          error={error_price}
                          onChangeText={(text) => this.setState({ price: text })}
                          returnKeyType="next"
                          onSubmitEditing={() => this._discount.focus()}
                        />
                        <TextField
                          ref={ref => this._discount = ref}
                          label="Diskon"
                          value={discount}
                          error={error_discount}
                          onChangeText={(text) => this.setState({ discount: text })}
                          returnKeyType="next"
                          onSubmitEditing={() => this._expired_date.focus()}
                        />
                        <TextField
                          ref={ref => this._expired_date = ref}
                          label="Tanggal Kadaluarsa"
                          value={expired_date}
                          error={error_expired_date}
                          onChangeText={(text) => this.setState({ expired_date: text })}
                          returnKeyType="next"
                          onSubmitEditing={() => this._minimum_order.focus()}
                        />
                        <TextField
                          ref={ref => this._minimum_order = ref}
                          label="Minimal pemesanan"
                          value={minimum_order}
                          error={error_minimum_order}
                          onChangeText={(text) => this.setState({ minimum_order: text })}
                          returnKeyType="go"
                          onSubmitEditing={this.submitEdit}
                        />
                      </ScrollView>
                      <TouchableOpacity
                        onPress={() => this.submitEdit(editProduct)}
                        style={{
                          flex: 1,
                          maxHeight: 50,
                          backgroundColor: Colors.green_light,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text style={{ color: 'white' }}>
                          Selesai
                        </Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  )
                }}
              </Mutation>
            )
          }}
        </Query>
      </View>
    )
  }
}

Edit.propTypes = {
  editedProductId: string,
};

const mapStateToProps = createStructuredSelector({
  editedProductId: getEditedProduct(),
})

export default connect(mapStateToProps, null)(Edit);