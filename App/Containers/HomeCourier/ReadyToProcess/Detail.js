import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Query } from 'react-apollo';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

import { QueryEffectPage } from 'Components';
import OrderedProducts from './OrderedProducts';
import { getReadableAddress, getReadableSubdistrict, getReadableCityState } from 'Lib';
import { getSelectedListId } from 'Redux/ListRedux';
import { FETCH_ORDER_DETAIL } from 'GraphQL/Order/Query';

class Detail extends Component {
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
        obj[date] = { marked: true, dotColor: 'red' }
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

  render() {
    const { listId: _id } = this.props;
    const { markedDates, minDate, maxDate } = this.state;
    return (
      <Query
        query={FETCH_ORDER_DETAIL}
        variables={{ _id }}
        onCompleted={this.onFetchComplete}
      >
        {({ loading, error, data, refetch }) => {
          if (loading || error || !data) {
            return (
              <QueryEffectPage
                loading={loading}
                state={error}
                onStateRefresh={refetch}
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
    );
  }
}

Detail.propTypes = {
  listId: string,
};

const mapStateToProps = createStructuredSelector({
  listId: getSelectedListId(),
});

export default connect(mapStateToProps, null)(Detail);
