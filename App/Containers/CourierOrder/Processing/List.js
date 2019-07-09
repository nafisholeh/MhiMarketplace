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
  calcTotalWeight
} from 'Lib';
import { QueryEffectPage } from 'Components';
import { Colors } from 'Themes';
import Item from './Item';
import { FETCH_PROCESSING_LIST } from 'GraphQL/Order/Query';
import ListActions from 'Redux/ListRedux';
import { getUserId } from 'Redux/SessionRedux';

class ProcessingList extends Component {
  renderItems = ({item, index}) => {
    const { selectListItem, navigation } = this.props;
    const { _id, shipping_address, products = [], requested_shipping_date = [], actual_shipping_date = [] } = item || {};
    const district = getReadableSubdistrict(shipping_address);
    const address = getReadableAddress(shipping_address);
    const consumerSchedule = getUpcomingShippingSched(requested_shipping_date);
    const courierSchedule = getUpcomingShippingSched(actual_shipping_date);  
    return (
      <Item
        id={_id}
        district={district}
        address={address}
        consumerSchedule={consumerSchedule}
        courierSchedule={courierSchedule}
        onSelectItem={id => {
          selectListItem(id);
          navigation.navigate('ProcessingDetail');
        }}
      />
    );
  };
  
  render() {
    const { userId } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Query
          query={FETCH_PROCESSING_LIST}
          variables={{ courier_id: userId }}
        >
          {({ loading, error, data, refetch }) => {
            const { processingOrders = [] } = data || {};
            if (Array.isArray(processingOrders) && processingOrders.length) {
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
                    data={processingOrders} 
                    renderItem={this.renderItems}
                  />
                </View>
              )
            }
            return (
              <QueryEffectPage
                isLoading={loading}
                isError={error}
                isEmpty={!processingOrders.length}
                onRefetch={refetch}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}

ProcessingList.propTypes = {
  selectListItem: func,
  userId: string,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  selectListItem: selectedId => dispatch(ListActions.selectListItem(selectedId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ProcessingList));
