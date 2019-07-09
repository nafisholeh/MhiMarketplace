import React, { Component, Fragment } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { Query, Mutation } from 'react-apollo';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string, bool } from 'prop-types';
import moment from 'moment';
import Timeline from 'react-native-timeline-listview';
import { withNavigation } from 'react-navigation';

import { Colors } from 'Themes';
import {
  QueryEffectPage,
  HeaderTitle,
  CustomHeader,
  ProductDetailWrapper,
  ViewShadow,
  DayTimeline,
  ButtonPrimary,
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
import { FETCH_ORDER_DETAIL, FETCH_SENDING_LIST } from 'GraphQL/Order/Query';
import {
  CONFIRM_ORDER_ARRIVAL,
  SENDING_ORDER_PRODUCTS,
  cacheSendingOrderProducts,
  cacheOrderArrival
} from 'GraphQL/Order/Mutation';
import { getUserId } from 'Redux/SessionRedux';
import { isSendingOrder } from 'Redux/ProductRedux';
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
      timeline: [],
    }
  }

  onConfirmOrder = mutate => {
    const { listId } = this.props;
    mutate({
      variables: { order_id: listId }
    });
  };

  onConfirmComplete = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { listId: _id, courierId, isSendingOrder } = this.props;
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
              products = [],
              time_stamp
            } = orderDetail || {};
            const { _id, name } = user_id;
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
                <Text
                  style={{
                    fontFamily: 'CircularStd-Book',
                    fontSize: 16,
                    color: Colors.text,
                    marginTop: moderateScale(20),
                    marginBottom: moderateScale(10),
                    marginHorizontal: moderateScale(20),
                  }}
                >
                  Detail Barang
                </Text>
                <OrderedProducts
                  products={products}
                />
                <Text
                  style={{
                    fontFamily: 'CircularStd-Book',
                    fontSize: 16,
                    color: Colors.text,
                    marginTop: moderateScale(15),
                    marginBottom: moderateScale(15),
                    marginHorizontal: moderateScale(20),
                  }}
                >
                  Lini Masa
                </Text>
                <DayTimeline data={time_stamp} />
              </ScrollView>
            );
          }}
        </Query>
        {isSendingOrder ? (
          <Mutation
            mutation={CONFIRM_ORDER_ARRIVAL}
            refetchQueries={
              mutationResult => [{
                query: FETCH_SENDING_LIST,
                variables: { courier_id: null, user_id: courierId }
              }]
            }
            awaitRefetchQueries={true}
            // update={(cache, data) => cacheOrderArrival(cache, data, _id, courierId)}
            onCompleted={this.onConfirmComplete}
            ignoreResults={false}
            errorPolicy='all' 
          >
            { (mutate, {loading, error, data}) => {
              return (
                <ButtonPrimary
                  onPress={() => this.onConfirmOrder(mutate)}
                  title="PESANAN SUDAH SAMPAI"
                  loading={loading}
                />
              );
            }}
          </Mutation>
        ) : null}
      </View>
    );
  }
}

Detail.propTypes = {
  listId: string,
  courierId: string,
  isSendingOrder: bool,
};

const mapStateToProps = createStructuredSelector({
  listId: getSelectedListId(),
  courierId: getUserId(),
  isSendingOrder: isSendingOrder(),
});

export default connect(mapStateToProps, null)(withNavigation(Detail));
