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
            <TouchableOpacity 
              onPress={this.onOpenList} 
              style={styles.container}
            >
              {!loading && selectedAddress && (
                <Item
                  data={selectedAddress}
                  isDisabled
                />
              )}
              {!selectedAddress && (
                <Text style={{ textAlign: 'center', marginVertical: 20 }}>
                  Silahkan pilih alamat pengiriman terlebih dahulu
                </Text>
              )}
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.brown_light,
    borderBottomWidth: 0.5,
  }
});

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  selectShipmentAddress: shipment_address => dispatch(CheckoutActions.selectShipmentAddress(shipment_address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AddressCheckout));
