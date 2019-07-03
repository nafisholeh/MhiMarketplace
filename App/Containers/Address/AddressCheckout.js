import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { string, func } from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Item from './Item';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import { Metrics, Colors } from 'Themes';
import { ViewShadow } from 'Components';
import { screenWidth, moderateScale } from 'Lib';
import { FETCH_SELECTED_ADDRESS } from 'GraphQL/Address/Query';
import { getUserId } from 'Redux/SessionRedux';
import CheckoutActions from 'Redux/CheckoutRedux';

class AddressCheckout extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      address: null,
    };
  }

  onOpenList = () => {
    const { navigation } = this.props;
    navigation.navigate('AddressList');
  };
  
  onFetchComplete = data => {
    const { selectedAddress } = data || {};
    const { _id = '' } = selectedAddress || {};
    const { selectShipmentAddress } = this.props;
    selectShipmentAddress(_id);
  }
  
  render() {
    const { address } = this.state;
    const { userId } = this.props;
    return (
      <Query 
        query={FETCH_SELECTED_ADDRESS}
        onCompleted={this.onFetchComplete}
        variables={{ user_id: userId }}>
        {({ loading, error, data, refetch }) => {
          const { selectedAddress = {} } = data || {};
          return (
            <ViewShadow
              width={screenWidth - 35}
              height={100}
              borderRadius={10}
              shadowBorderRadiusAndroid={10}
              shadowRadiusAndroid={18}
              shadowOpacityAndroid={0.09}
              mainColor={Colors.white}
              shadowColor={Colors.brown_light}
              style={{ alignSelf: 'center' }}
            >
              <TouchableOpacity
                onPress={this.onOpenList}
                style={{ flex: 1, paddingHorizontal: moderateScale(5) }}
              >
                {!loading && selectedAddress && (
                  <Item
                    data={selectedAddress}
                    isDisabled
                  />
                )}
                {!selectedAddress && (
                  <Text
                    style={{
                      textAlign: 'center',
                      marginVertical: 20
                    }}
                  >
                    Silahkan pilih alamat pengiriman terlebih dahulu
                  </Text>
                )}
              </TouchableOpacity>
            </ViewShadow>
          );
        }}
      </Query>
    )
  }
}

AddressCheckout.propTypes = {
  userId: string,
  selectShipmentAddress: func,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  selectShipmentAddress: shipment_address => dispatch(CheckoutActions.selectShipmentAddress(shipment_address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AddressCheckout));
