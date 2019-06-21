import React, { Component, Fragment } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { Query, Mutation } from 'react-apollo';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import moment from 'moment';

import { Colors } from 'Themes';
import { QueryEffectPage } from 'Components';
import OrderedProducts from '../Common/OrderedProducts';
import {
  getReadableAddress,
  getReadableSubdistrict,
  getReadableCityState,
  filterObject,
} from 'Lib';
import { getSelectedListId } from 'Redux/ListRedux';
import { FETCH_ORDER_DETAIL } from 'GraphQL/Order/Query';
import { SENDING_ORDER_PRODUCTS, cacheSendingOrderProducts } from 'GraphQL/Order/Mutation';
import { getUserId } from 'Redux/SessionRedux';

class Detail extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Detail Pesanan Terkirim',
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isFetchComplete: false,
    }
  }
  
  onFetchComplete = data => {
    const { orderDetail = {} } = data || {}; 
    const {
      requested_shipping_date: requested = [],
      actual_shipping_date: actual = [],
    } = orderDetail || {};
    
    this.setState(prevState => {
      return {
        isFetchComplete: true
      }
    });
  };

  render() {
    const { listId: _id, courierId } = this.props;
    return (
      <Fragment>
        <Query
          query={FETCH_ORDER_DETAIL}
          variables={{ _id }}
          onCompleted={this.onFetchComplete}
        >
          {({ loading, error, data, refetch }) => {
            if (loading || error || !data) {
              return (
                <QueryEffectPage
                  isLoading={loading}
                  isError={error}
                  onRefetch={refetch}
                />
              );
            }
            const { orderDetail = {} } = data || {}; 
            const {
              transaction_id,
              user_id = {},
              shipping_address = {},
              products = []
            } = orderDetail || {};
            const { name } = user_id;
            return (
              <ScrollView
                contentContainerStyle={{ 
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                }}
              >
                <Text style={{ textAlign: 'right' }}>{transaction_id}</Text>
                <Text>Nama: {name}</Text>
                <Text>Alamat:</Text>
                <Text>{getReadableAddress(shipping_address)}</Text>
                <Text>{getReadableSubdistrict(shipping_address)}</Text>
                <Text>{getReadableCityState(shipping_address)}</Text>
                <Text style={{ marginTop: 15, marginBottom: 10 }}>
                  Detail Barang
                </Text>
                <OrderedProducts
                  products={products}
                />
              </ScrollView>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

Detail.propTypes = {
  listId: string,
  courierId: string,
};

const mapStateToProps = createStructuredSelector({
  listId: getSelectedListId(),
  courierId: getUserId(),
});

export default connect(mapStateToProps, null)(Detail);
