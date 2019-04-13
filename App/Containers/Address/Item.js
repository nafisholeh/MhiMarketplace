import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { string, shape, bool } from 'prop-types';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getReadableAddress,
  getReadableSubdistrict,
  getReadableCityState
} from 'Lib';
import AppConfig from 'Config/AppConfig';
import { Metrics, Images } from 'Themes';
import { SELECT_ADDRESS, cacheSelectAddress } from 'GraphQL/Address/Mutation';
import { getUserId } from 'Redux/SessionRedux';

class AddressItem extends Component {
  render() {
    const { data: address, data: { _id, selected }, userId } = this.props;
    return (
      <Mutation
        mutation={SELECT_ADDRESS}
        variables={{ user_id: userId , _id }}
        update={(cache, data) => cacheSelectAddress(cache, data, _id)}
        ignoreResults={false}
        errorPolicy='all'>
        { (selectAddress, {loading, error, data}) => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: 100,
                padding: Metrics.baseMargin,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,
              }}
              onPress={() => selectAddress()}
            >
              <View style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <Text>{getReadableAddress(address)}</Text>
                <Text>{getReadableSubdistrict(address)}</Text>
                <Text>{getReadableCityState(address)}</Text>
              </View>
              {selected &&
                <Image
                  source={Images[AppConfig.pageState.LOCATION]}
                  style={{ width: 20, height: 20 }}
                />
              }
            </TouchableOpacity>
          )
        }}
      </Mutation>
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
  userId: string,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

export default connect(mapStateToProps, null)(AddressItem);