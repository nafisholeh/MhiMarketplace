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
import {
  FETCH_ORDER_DETAIL,
  FETCH_PROCESSING_LIST,
  FETCH_PROCESSING_COUNT
} from 'GraphQL/Order/Query';
import { TAKE_ORDER, cacheTakeOrder } from 'GraphQL/Order/Mutation';
import { getUserId } from 'Redux/SessionRedux';

class Detail extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Detail Pesanan Baru',
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
      minDate: null,
      maxDate: null,
      isFetchComplete: false,
    }
  }
  
  onDaySelect = day => {
    const { markedDates = {}, isFetchComplete } = this.state;
    const selectedDay = moment(day.dateString).format('YYYY-MM-DD');
    if (!isFetchComplete || !markedDates.hasOwnProperty(selectedDay)) return;
      
    let selected = true;
    if (markedDates[selectedDay]) {
      selected = !markedDates[selectedDay].selected;
    }
    
    const updatedMarkedDates = {
      ...markedDates,
      ...{ [selectedDay]: { marked: true, dotColor: 'red', selected } } 
    };
    this.setState({ markedDates: updatedMarkedDates });
  };
  
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
  
  getRequestedMinDate = (data = []) => {
    const { date = now } = data.reduce(
      (total, current) => {
        const { date: totalDate } = total || {};
        const { date: currentDate } = current || {};
        return new Date(totalDate) < new Date(currentDate) ? total : current;
      });
    return new Date(date); 
  };
  
  getRequestedMaxDate = (data = []) => {
    const { date = now } = data.reduce(
      (total, current) => {
        const { date: totalDate } = total || {};
        const { date: currentDate } = current || {};
        return new Date(totalDate) > new Date(currentDate) ? total : current;
      });
    return new Date(date); 
  };
  
  onFetchComplete = data => {
    const { orderDetail = {} } = data || {}; 
    const { requested_shipping_date: requested = [] } = orderDetail || {};
    
    this.setState(prevState => {
      return {
        isFetchComplete: true,
        markedDates: {...prevState.markedDates, ...this.getRequestedDate(requested)},
        minDate: this.getRequestedMinDate(requested),
        maxDate: this.getRequestedMaxDate(requested),
      }
    });
  };
  
  takeThisOrder = mutate => {
    const { markedDates = {} } = this.state;
    const { listId: _id, courierId } = this.props;
    const selectedDates = filterObject(markedDates, 'selected', true) || {};
    let normalizedSelectedDates = [];
    Object
      .keys(selectedDates)
      .forEach((key) => {
        const { date } = selectedDates[key];
        normalizedSelectedDates.push({ date: key, time_start: '00:00', time_end: '24:00' });
      });
    mutate({
      variables: {
        order_id: _id,
        courier_id: courierId,
        actual_shipping_date: normalizedSelectedDates,
      },
    });
  };
  
  onTakeOrderComplete = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { listId: _id, userId } = this.props;
    const { markedDates, minDate, maxDate } = this.state;
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
              requested_shipping_date: requested = [],
              products = []
            } = orderDetail || {};
            const { name } = user_id;
            const dateRequested = requested.reduce(
              (obj, item) => {
                const { date } = item || {};
                obj[date] = { marked: true }
                return obj
              },
              {}
            );
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
                  minDate={minDate}
                  maxDate={maxDate}
                  onDayPress={this.onDaySelect}
                  markedDates={markedDates}
                />
                <Text style={{ marginTop: 15, marginBottom: 10 }}>
                  Detail Barang
                </Text>
                <OrderedProducts products={products} />
              </ScrollView>
            );
          }}
        </Query>
        <Mutation
          mutation={TAKE_ORDER}
          update={(cache, data) => cacheTakeOrder(cache, data, _id, courierId)}
          onCompleted={this.onTakeOrderComplete}
          refetchQueries={
            [
              {
                query: FETCH_PROCESSING_LIST,
                variables: { courier_id: courierId }
              },
              {
                query: FETCH_PROCESSING_COUNT,
                variables: { courier_id: courierId }
              }
            ]
          }
          ignoreResults={false}
          errorPolicy='all'
        >
          {(takeOrder, {loading, error, data}) => {
            return (
              <TouchableOpacity
                onPress={() => this.takeThisOrder(takeOrder)}
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
                  <Text style={{ color: 'white' }}>AMBIL</Text>
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
