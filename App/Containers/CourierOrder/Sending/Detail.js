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
import { FETCH_ORDER_DETAIL, FETCH_SENT_LIST } from 'GraphQL/Order/Query';
import { FINISH_SENDING_ORDER, cacheFinishSendingOrder } from 'GraphQL/Order/Mutation';
import { getUserId } from 'Redux/SessionRedux';
import AppConfig from 'Config/AppConfig';

class Detail extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Detail Pesanan Sedang Kirim',
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
    let timeline = [];
    Object.keys(timestamp).forEach(key => {
      if (
        key === '__typename' ||
        !timestamp[key]
      ) {
        return;
      }
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
  
  finishSendingOrder = mutate => {
    const { listId: order_id } = this.props;
    mutate({
      variables: { order_id }
    });
  };
  
  onSentOrderComplete = () => {
    const { navigation } = this.props;
    navigation.goBack();
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
          notifyOnNetworkStatusChange
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
                  timeStyle={{ fontWeight: 'normal' }}
                  titleStyle={{ fontWeight: 'normal' }}
                />
              </ScrollView>
            );
          }}
        </Query>
        <Mutation
          mutation={FINISH_SENDING_ORDER}
          update={(cache, data) => cacheFinishSendingOrder(cache, data, _id, courierId)}
          onCompleted={this.onSentOrderComplete}
          refetchQueries={
            [
              {
                query: FETCH_SENT_LIST,
                variables: { courier_id: courierId }
              }
            ]
          }
          ignoreResults={false}
          errorPolicy='all'
        >
          {(mutate, {loading, error, data}) => {
            return (
              <TouchableOpacity
                onPress={() => this.finishSendingOrder(mutate)}
                style={{
                  height: 50,
                  backgroundColor: Colors.green_light,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {loading &&
                  <DotIndicator
                    count={4}
                    size={7}
                    color='white'
                    animationDuration={800}
                  />
                }
                {!loading &&
                  <Text style={{ color: 'white' }}>
                    PESANAN TERKIRIM
                  </Text>
                }
              </TouchableOpacity>
            );
          }}
        </Mutation>
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
