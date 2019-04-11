import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { string, shape } from 'prop-types';

import {
  getReadableAddress,
  getReadableSubdistrict,
  getReadableCityState
} from 'Lib';
import { Metrics } from 'Themes';

class AddressItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 100,
          padding: Metrics.baseMargin,
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
        }}>
        <Text>{getReadableAddress(data)}</Text>
        <Text>{getReadableSubdistrict(data)}</Text>
        <Text>{getReadableCityState(data)}</Text>
      </View>
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
    provinsi: string
  }),
};

export default AddressItem;