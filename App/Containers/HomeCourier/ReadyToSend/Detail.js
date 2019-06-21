import React, { Component, Fragment } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { Query, Mutation } from 'react-apollo';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

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
import { TAKE_ORDER_PRODUCTS, cacheTakeOrderProducts } from 'GraphQL/Order/Mutation';
import { getUserId } from 'Redux/SessionRedux';

class Detail extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Detail Pesanan Saya',
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
      allProducts: [],
      isFetchComplete: false,
    }
  }
  
  getRequestedDate = (data = []) => {
    return data.reduce(
      (obj, item) => {
        const { date } = item || {};
        obj[date] = {
          marked: true,
          dotColor: 'red',
          disabled: false
        };
        return obj
      },
      {}
    );
  };
  
  getActualDate = (data = []) => {
    return data.reduce(
      (obj, item) => {
        const { date } = item || {};
        obj[date] = { selected: true };
        return obj
      },
      {}
    );
  };
  
  onFetchComplete = data => {
    const { orderDetail = {} } = data || {}; 
    const {
      requested_shipping_date: requested = [],
      actual_shipping_date: actual = [],
    } = orderDetail || {};
    
    this.setState(prevState => {
      return {
        isFetchComplete: true,
        markedDates: {
          ...prevState.markedDates,
          ...this.getRequestedDate(requested),
          ...this.getActualDate(actual),
        },
      }
    });
  };
  
  takeOrderProduct = mutate => {
    const { listId: _id } = this.props;
    mutate({
      variables: { order_id: _id }
    });
  };
  
  onTakeOrderProductComplete = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { listId: _id, courierId } = this.props;
    const { markedDates } = this.state;
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
                <Text style={{ marginTop: 15 }}>Pilih Jadwal Pengiriman</Text>
                <CalendarList
                  horizontal={true}
                  pagingEnabled={true}
                  minDate={new Date('2018-01-01')}
                  maxDate={new Date('2018-01-01')}
                  markedDates={markedDates}
                />
                <Text style={{ marginTop: 15, marginBottom: 10 }}>
                  Detail Barang
                </Text>
                <OrderedProducts
                  products={products}
                />
              </ScrollView>
            );
          }}
        </Query>
        <Mutation
          mutation={TAKE_ORDER_PRODUCTS}
          update={(cache, data) => cacheTakeOrderProducts(cache, data, _id, courierId)}
          onCompleted={this.onTakeOrderProductComplete}
          ignoreResults={false}
          errorPolicy='all'
        >
          {(takeOrder, {loading, error, data}) => {
            return (
              <TouchableOpacity
                onPress={() => this.takeOrderProduct(takeOrder)}
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
                    BERANGKAT NGIRIM
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
