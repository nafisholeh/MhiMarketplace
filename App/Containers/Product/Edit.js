import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { string } from 'prop-types';
import { TextField } from 'react-native-material-textfield';

import { Colors, Metrics } from 'Themes';

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
  
  submitEdit = () => {
    
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
    return (
      <View style={{flex:1}}>
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
          onPress={this.submitEdit}
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
      </View>
    )
  }
}

Edit.propTypes = {
  
};

export default Edit;