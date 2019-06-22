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
} from 'Lib';
import { QueryEffectPage } from 'Components';
import { Colors } from 'Themes';
import Item from './Item';
import { FETCH_COMPLETED_LIST } from 'GraphQL/Order/Query';
import ListActions from 'Redux/ListRedux';
import { getUserId } from 'Redux/SessionRedux';

class CompletedList extends Component {
  renderItems = ({item, index}) => {
    const { selectListItem, navigation } = this.props;
    const { _id, shipping_address, time_stamp: { complete } = {} } = item || {};
    const district = getReadableSubdistrict(shipping_address);
    const address = getReadableAddress(shipping_address);
    const arrivalTime = getReadableDate(complete);
    return (
      <Item
        id={_id}
        district={district}
        address={address}
        arrivalTime={arrivalTime}
        onSelectItem={id => {
          selectListItem(id);
          navigation.navigate('CompletedDetail');
        }}
      />
    );
  };
  
  render() {
    const { userId } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Query
          query={FETCH_COMPLETED_LIST}
          variables={{ courier_id: userId }}
        >
          {({ loading, error, data, refetch }) => {
            const { completedOrders = [] } = data || {};
            if (Array.isArray(completedOrders) && completedOrders.length) {
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
                    data={completedOrders} 
                    renderItem={this.renderItems}
                  />
                </View>
              )
            }
            return (
              <QueryEffectPage
                isLoading={loading}
                isError={error}
                isEmpty={!completedOrders.length}
                onRefetch={refetch}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}

CompletedList.propTypes = {
  selectListItem: func,
  userId: string,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  selectListItem: selectedId => dispatch(ListActions.selectListItem(selectedId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CompletedList));
