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
import { QueryEffectPage } from 'Components';
import { Colors } from 'Themes';
import Item from './Item';
import { FETCH_SENT_LIST } from 'GraphQL/Order/Query';
import ListActions from 'Redux/ListRedux';
import { getUserId } from 'Redux/SessionRedux';

class CompletedList extends Component {
  renderItems = ({item, index}) => {
    const { selectListItem, navigation } = this.props;
    const {
      _id,
      shipping_address,
      actual_shipping_date = [],
    } = item || {};
    const district = getReadableSubdistrict(shipping_address);
    const address = getReadableAddress(shipping_address);
    let injuryTime = null;
    if (actual_shipping_date.length) {
      const { date, time_start, time_end } = actual_shipping_date[0];
      const time = `${date} ${time_end}`;
      injuryTime = getIntervalTimeToday(time);
    }
    return (
      <Item
        id={_id}
        district={district}
        address={address}
        injuryTime={injuryTime}
        onSelectItem={id => {
          selectListItem(id);
          navigation.navigate('SentDetail');
        }}
      />
    );
  };
  
  render() {
    const { userId } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Query
          query={FETCH_SENT_LIST}
          variables={{ courier_id: userId }}
        >
          {({ loading, error, data, refetch }) => {
            const { sentOrders = [] } = data || {};
            if (Array.isArray(sentOrders) && sentOrders.length) {
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
                    data={sentOrders} 
                    renderItem={this.renderItems}
                  />
                </View>
              )
            }
            return (
              <QueryEffectPage
                isLoading={loading}
                isError={error}
                isEmpty={!sentOrders.length}
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
