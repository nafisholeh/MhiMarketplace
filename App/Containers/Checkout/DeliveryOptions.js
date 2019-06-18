import React, { Component } from 'react';
import { View, Picker, Text } from 'react-native';
import { Query } from 'react-apollo';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

import { FETCH_DELIVERIES } from 'GraphQL/Delivery/Query';
import { Metrics, Colors } from 'Themes';
import CheckoutActions from 'Redux/CheckoutRedux';

LocaleConfig.locales['fr'] = {
  monthNames: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','Nopember','Desember'],
  monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nop.','Des'],
  dayNames: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
  dayNamesShort: ['M','S','S','R','K','J','S'],
  today: 'Hari\'ini'
};
LocaleConfig.defaultLocale = 'fr';

const DATE_FORMAT = 'YYYY-MM-DD';
const TODAY = moment().format(DATE_FORMAT);

class DeliveryOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      markedDates: {},
    }
  }
  
  componentDidMount() {
    const { storeShipmentDate } = this.props;
    const data = {
      [TODAY]: { selected: true }
    };
    storeShipmentDate(data);
    this.setState({ markedDates: data });
  }
  
  onValueChange = (itemValue, itemIndex) => {
    const { storeShipmentTime } = this.props;
    storeShipmentTime(itemValue);
    this.setState({selected: itemValue})
  };
  
  onDaySelect = day => {
    const { storeShipmentDate } = this.props;
    const { markedDates } = this.state;
    const selectedDay = moment(day.dateString).format(DATE_FORMAT);
      
    let selected = true;
    if (markedDates[selectedDay]) {
      selected = !markedDates[selectedDay].selected;
    }
    
    const updatedMarkedDates = {...markedDates, ...{ [selectedDay]: { selected } } };
    storeShipmentDate(updatedMarkedDates);
    this.setState({ markedDates: updatedMarkedDates });
  };
  
  fetchTimeSuccess = data => {
    const { storeShipmentTime } = this.props;
    const { deliveries = [] } = data || {};
    if (deliveries.length) {
      const { time_start, time_end } = deliveries[0];
      if (time_start && time_end) {
        storeShipmentTime(`${time_start},${time_end}`);
      }
    }
    console.tron.log('fetchTimeSuccess', data);
  }
  
  render() {
    const { selected, markedDates } = this.state;
    const { storeShipmentTime } = this.props;
    return (
      <View style={{ borderBottomWidth: 0.4, borderBottomColor: Colors.brown_light }}>
        <CalendarList
          horizontal={true}
          pagingEnabled={true}
          minDate={TODAY}
          onDayPress={this.onDaySelect}
          markedDates={markedDates}
        />
        <Query 
          query={FETCH_DELIVERIES}
          onCompleted={this.fetchTimeSuccess}>
          {({ loading, error, data, refetch }) => {
            if (loading) return (<View />);
            else if (error) return (<View />);
            const { deliveries } = data;
            return (
              <View style={{ marginLeft: 25, marginRight: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>Jam:</Text>
                <Picker
                  selectedValue={selected}
                  style={{ flex:1, borderWidth:1, borderColor: 'gray' }}
                  itemStyle={{ textAlign: 'center' }}
                  onValueChange={this.onValueChange}>
                  {deliveries.map(item => (
                    <Picker.Item
                      key={item._id}
                      label={`${item.time_start} - ${item.time_end}`}
                      value={`${item.time_start},${item.time_end}`}
                    />
                  ))}
                </Picker>
              </View>
            );
          }}
        </Query>
      </View>
    );
  }
}

DeliveryOptions.propTypes = {
  storeShipmentDate: func,
  storeShipmentTime: func,
}

const mapDispatchToProps = dispatch => ({
  storeShipmentDate: shipment_date => dispatch(CheckoutActions.storeShipmentDate(shipment_date)),
  storeShipmentTime: shipment_time => dispatch(CheckoutActions.storeShipmentTime(shipment_time))
});

export default connect(null, mapDispatchToProps)(DeliveryOptions);
