import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { withNavigation } from 'react-navigation';

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
import ListActions from 'Redux/ListRedux';

class ReadyToProcessList extends Component {
  renderItems = ({item, index}) => {
    const { selectListItem, navigation } = this.props;
    const { _id, shipping_address, products = [], requested_shipping_date = [] } = item || {};
    const district = getReadableSubdistrict(shipping_address);
    const address = getReadableAddress(shipping_address);
    const schedule = getUpcomingShippingSched(requested_shipping_date);
    const totalWeight = calcTotalWeight(products);
    return (
      <Item
        id={_id}
        district={district}
        address={address}
        schedule={schedule}
        totalWeight={totalWeight}
        onSelectItem={id => {
          selectListItem(id);
          navigation.navigate('ReadyToProcessDetail');
        }}
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
            const { readyToProcessOrders = [] } = data || {};
            if (loading || error || !Array.isArray(readyToProcessOrders) || !readyToProcessOrders.length) {
              return (
                <QueryEffectSection
                  isLoading={loading}
                  isError={error}
                  isEmpty={!readyToProcessOrders.length}
                  onRefetch={refetch}
                />
              );
            }
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

ReadyToProcessList.propTypes = {
  selectListItem: func,
}

const mapDispatchToProps = dispatch => ({
  selectListItem: selectedId => dispatch(ListActions.selectListItem(selectedId)),
});

export default connect(null, mapDispatchToProps)(withNavigation(ReadyToProcessList));
