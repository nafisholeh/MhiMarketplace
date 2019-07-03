import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { string, shape, bool, func } from 'prop-types';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import {
  getReadableAddress,
  getReadableSubdistrict,
  getReadableCityState
} from 'Lib';
import AppConfig from 'Config/AppConfig';
import { Metrics, Images } from 'Themes';
import { SELECT_ADDRESS, cacheSelectAddress } from 'GraphQL/Address/Mutation';
import { FETCH_SELECTED_ADDRESS } from 'GraphQL/Address/Query';
import { getUserId } from 'Redux/SessionRedux';
import CheckoutActions from 'Redux/CheckoutRedux';

class AddressItem extends Component {
  
  syncSelectedAddressOnAll = selectAddress => {
    // let selected address on checkout page got updated quickly
    const { data: selectedAddress, data: { _id } = {}, userId, selectShipmentAddress } = this.props;
    selectShipmentAddress(_id);
    
    ApolloClientProvider.client.cache.writeQuery({
      query: FETCH_SELECTED_ADDRESS,
      variables: { user_id: userId },
      data: { selectedAddress }
    });
    // sync selected address on server and local
    selectAddress();  
  }
  
  render() {
    const {
      data: address,
      data: { _id, selected },
      userId,
      isDisabled
    } = this.props;
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
                borderBottomWidth: isDisabled ? 0 : 0.5,
              }}
              onPress={() => this.syncSelectedAddressOnAll(selectAddress)}
              disabled={isDisabled}
            >
              <View style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'CircularStd-Book',
                    fontSize: 14,
                    color: 'rgba(29, 29, 29, 0.5)'
                  }}
                >
                  {getReadableAddress(address)}
                </Text>
                <Text
                  style={{
                    fontFamily: 'CircularStd-Book',
                    fontSize: 14,
                    color: 'rgba(29, 29, 29, 0.5)'
                  }}
                >
                  {getReadableSubdistrict(address)}
                </Text>
                <Text
                  style={{
                    fontFamily: 'CircularStd-Book',
                    fontSize: 14,
                    color: 'rgba(29, 29, 29, 0.5)'
                  }}
                >
                  {getReadableCityState(address)}
                </Text>
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
  isDisabled: bool,
  selectShipmentAddress: func,
};

AddressItem.defaultProps = {
  isDisabled: false,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  selectShipmentAddress: shipment_address => dispatch(CheckoutActions.selectShipmentAddress(shipment_address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressItem);
