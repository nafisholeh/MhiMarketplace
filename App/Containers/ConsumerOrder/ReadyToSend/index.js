import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { createStructuredSelector } from 'reselect';

import {
  getReadableAddress,
  getReadableSubdistrict,
  getUpcomingShippingSched,
  calcTotalWeight,
  getReadableDate,
  getIntervalTimeToday
} from 'Lib';
import { QueryEffectSection } from 'Components';
import { Colors } from 'Themes';
import Item from '../Common/Item';
import { FETCH_READY_TO_SEND_LIST } from 'GraphQL/Order/Query';
import ListActions from 'Redux/ListRedux';
import { getUserId } from 'Redux/SessionRedux';

class SendingList extends Component {
  renderItems = ({item, index}) => {
    const { selectListItem, navigation } = this.props;
    const {
      _id,
      products,
      transaction_id,
      total_cost,
      actual_shipping_date,
    } = item || {};
    const title = getAggregateProducts(products);
    const shippingDate = getUpcomingShippingSched(actual_shipping_date);
    return (
      <Item
        id={_id}
        transactionId={transaction_id}
        title={title}
        subtitle={parseToRupiah(total_cost)}
        body={shippingDate}
        onSelectItem={id => {
          selectListItem(id);
          navigation.navigate('SendingDetail');
        }}
      />
    );
  };
  
  render() {
    const { userId } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ paddingHorizontal: 10 }}>Barang siap dikirim kurir</Text>
        <Query
          query={FETCH_READY_TO_SEND_LIST}
          variables={{ courier_id: null, user_id: userId }}
        >
          {({ loading, error, data, refetch }) => {
            const { readyToSendOrders = [] } = data || {};
            if (Array.isArray(readyToSendOrders) && readyToSendOrders.length) {
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
                    data={readyToSendOrders} 
                    renderItem={this.renderItems}
                  />
                </View>
              )
            }
            return (
              <QueryEffectSection
                isLoading={loading}
                isError={error}
                isEmpty={!readyToSendOrders.length}
                onRefetch={refetch}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}

SendingList.propTypes = {
  selectListItem: func,
  userId: string,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  selectListItem: selectedId => dispatch(ListActions.selectListItem(selectedId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SendingList));
