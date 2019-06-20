import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import { Query } from 'react-apollo';

import {
  getReadableAddress,
  getReadableSubdistrict,
  getUpcomingShippingSched,
  calcTotalWeight
} from 'Lib';
import { QueryEffectSection } from 'Components';
import { Colors } from 'Themes';
import Item from './Item';
import { FETCH_READY_TO_PROCESS_LIST } from 'GraphQL/Order/Query';

class ReadyToProcessList extends Component {
  renderItems = ({item, index}) => {
    const { _id, shipping_address, products = [], requested_shipping_date = [] } = item || {};
    const district = getReadableSubdistrict(shipping_address);
    const address = getReadableAddress(shipping_address);
    const schedule = getUpcomingShippingSched(requested_shipping_date);
    const totalWeight = calcTotalWeight(products);
    return (
      <Item
        district={district}
        address={address}
        schedule={schedule}
        totalWeight={totalWeight}
      />
    );
  };
  
  render() {
    return (
      <View>
        <Text style={{ marginBottom: 10, marginHorizontal: 10, marginTop: 10 }}>Daftar Pesanan Baru</Text>
        <Query 
          query={FETCH_READY_TO_PROCESS_LIST}
          onCompleted={this.onFetchComplete}
        >
          {({ loading, error, data, refetch }) => {
            if (!data) {
              return (
                <QueryEffectSection
                  loading={loading}
                  state={error}
                  onStateRefresh={refetch}
                />
              );
            }
            const { readyToProcessOrders } = data;
            return (
              <View style={{
                marginHorizontal: 10,
                marginVertical: 10,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: Colors.brown_light
              }}>
                <FlatList
                  keyExtractor={(item, id) => item._id.toString()}
                  data={readyToProcessOrders} 
                  renderItem={this.renderItems}
                />
              </View>
            )
          }}
        </Query>
      </View>
    );
  }
}

export default ReadyToProcessList;
