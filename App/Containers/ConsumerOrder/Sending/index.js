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
import Item from './Item';
import { FETCH_SENDING_LIST } from 'GraphQL/Order/Query';
import ListActions from 'Redux/ListRedux';
import { getUserId } from 'Redux/SessionRedux';

class SendingList extends Component {
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
          navigation.navigate('SendingDetail');
        }}
      />
    );
  };
  
  render() {
    const { userId } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text>Sedang dikirim kurir</Text>
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
