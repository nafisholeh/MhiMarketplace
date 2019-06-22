import React, { Component, Fragment } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { Query, Mutation } from 'react-apollo';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import moment from 'moment';
import Timeline from 'react-native-timeline-listview';

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
import AppConfig from 'Config/AppConfig';

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
      timeline: [],
    }
  }
  
  parseTimeline = timestamp => {
    const {
      incomplete,
      ready_to_process,
      processing,
      ready_to_send,
      sending,
      complete
    } = timestamp || {};
    let timeline = [];
    Object.keys(timestamp).forEach(key => {
      if (key === '__typename') return;
      timeline.push({
        title: AppConfig.timelineTitle[key],
        time: moment(timestamp[key], 'YYYY-MM-DD hh:mm:ss').format('hh:mm'),
      });
    });
    return timeline;
  };
  
  onFetchComplete = data => {
    const { orderDetail = {} } = data || {}; 
    const {
      requested_shipping_date: requested = [],
      actual_shipping_date: actual = [],
      time_stamp = {}
    } = orderDetail || {};
    
    this.setState(prevState => {
      return {
        isFetchComplete: true,
        timeline: this.parseTimeline(time_stamp),
      }
    });
  };

  render() {
    const { listId: _id, courierId } = this.props;
    const { timeline } = this.state;
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
                <Text style={{ marginTop: 15, marginBottom: 10 }}>
                  Lini Masa
                </Text>
                <Timeline
                  data={timeline}
                  innerCircle="dot"
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
