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
  getIntervalTimeToday,
  parseToRupiah,
} from 'Lib';
import { QueryEffectSection } from 'Components';
import { Colors } from 'Themes';
import Item from '../Common/Item';
import { FETCH_SENDING_LIST } from 'GraphQL/Order/Query';
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
        <Text style={{ paddingHorizontal: 10 }}>Sedang dikirim kurir</Text>
        <Query
          query={FETCH_SENDING_LIST}
          variables={{ courier_id: null, user_id: userId }}
        >
          {({ loading, error, data, refetch }) => {
            const { sendingOrders = [] } = data || {};
            if (Array.isArray(sendingOrders) && sendingOrders.length) {
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
                    data={sendingOrders} 
                    renderItem={this.renderItems}
                  />
                </View>
              )
            }
            return (
              <QueryEffectSection
                isLoading={loading}
                isError={error}
                isEmpty={!sendingOrders.length}
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
