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
import {
  QueryEffectPage,
  HeaderTitle,
  CustomHeader,
  ProductDetailWrapper,
  ViewShadow,
} from 'Components';
import OrderedProducts from './OrderedProducts';
import {
  getReadableAddress,
  getReadableSubdistrict,
  getReadableCityState,
  filterObject,
  screenWidth,
  moderateScale,
  parseToRupiah,
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
      header: <View></View>,
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

  render() {
    const { listId: _ids, courierId } = this.props;
    const _id = '5d160bf5f63f263fb73e48be';
    const { timeline } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#a8de1c',
        }}
      >
        <CustomHeader title="Detail" />
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
              total_cost,
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
                <ViewShadow
                  width={screenWidth - 60}
                  height={270}
                  borderRadius={10}
                  shadowBorderRadiusAndroid={10}
                  shadowRadiusAndroid={18}
                  shadowOpacityAndroid={0.09}
                  mainColor={Colors.white}
                  shadowColor={Colors.brown_light}
                  style={{
                    marginHorizontal: moderateScale(18),
                    marginTop: moderateScale(10)
                  }}
                  styleChildren={{
                    padding: moderateScale(15),
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'right',
                      fontFamily: 'CircularStd-Bold',
                      fontSize: 16,
                    }}
                  >
                    {transaction_id ? `#${transaction_id}` : `n/a`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'CircularStd-Book',
                      fontSize: 14,
                      color: Colors.text_light,
                      marginBottom: moderateScale(5),
                    }}
                  >
                    Harga Total
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'CircularStd-Book',
                      fontSize: 18,
                      color: Colors.veggie_dark,
                      marginBottom: moderateScale(10),
                    }}
                  >
                    {parseToRupiah(total_cost) || `n/a`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'CircularStd-Book',
                      fontSize: 14,
                      color: Colors.text_light,
                      marginBottom: moderateScale(5),
                    }}
                  >
                    Nama
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'CircularStd-Book',
                      fontSize: 16,
                      color: Colors.text,
                      marginBottom: moderateScale(10),
                    }}
                  >
                    {name || `n/a`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'CircularStd-Book',
                      fontSize: 14,
                      color: Colors.text_light,
                      marginBottom: moderateScale(5),
                    }}
                  >
                    Alamat
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'CircularStd-Book',
                      fontSize: 16,
                      color: Colors.text,
                    }}
                  >
                    {getReadableAddress(shipping_address)}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'CircularStd-Book',
                      fontSize: 16,
                      color: Colors.text,
                    }}
                  >
                    {getReadableSubdistrict(shipping_address)}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'CircularStd-Book',
                      fontSize: 16,
                      color: Colors.text,
                    }}
                  >
                    {getReadableCityState(shipping_address)}
                  </Text>
                </ViewShadow>
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
      </View>
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
