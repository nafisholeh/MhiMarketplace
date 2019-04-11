import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { string, shape, bool } from 'prop-types';

import {
  getReadableAddress,
  getReadableSubdistrict,
  getReadableCityState
} from 'Lib';
import AppConfig from 'Config/AppConfig';
import { Metrics, Images } from 'Themes';

class AddressItem extends Component {
  render() {
    const { data, data: { selected } } = this.props;
    return (
      <TouchableOpacity style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 100,
          padding: Metrics.baseMargin,
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
        }}>
        <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text>{getReadableAddress(data)}</Text>
          <Text>{getReadableSubdistrict(data)}</Text>
          <Text>{getReadableCityState(data)}</Text>
        </View>
        {selected &&
          <Image
            source={Images[AppConfig.pageState.LOCATION]}
            style={{ width: 20, height: 20 }}
          />
        }
      </TouchableOpacity>
    )
  }
}

AddressItem.propTypes = {
  data: shape({
    _id: string,
    alamat: string,
    rtrw: string,
    kelurahan: string,
    kecamatan: string,
    kota: string,
    provinsi: string,
    selected: bool,
  }),
};

export default AddressItem;