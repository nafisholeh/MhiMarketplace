import React, { Component } from 'react';
import { View, Picker, Text } from 'react-native';
import { Query } from 'react-apollo';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

import { FETCH_DELIVERIES } from 'GraphQL/Delivery/Query';
import { Metrics, Colors } from 'Themes';

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
  
  onValueChange = (itemValue, itemIndex) => {
    this.setState({selected: itemValue})
  };
  
  onDaySelect = day => {
    const { markedDates } = this.state;
    const selectedDay = moment(day.dateString).format(DATE_FORMAT);
      
    let selected = true;
    if (markedDates[selectedDay]) {
      selected = !markedDates[selectedDay].selected;
    }
    
    const updatedMarkedDates = {...markedDates, ...{ [selectedDay]: { selected } } };
    this.setState({ markedDates: updatedMarkedDates });
  };
  
  render() {
    const { selected, markedDates } = this.state;
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
          query={FETCH_DELIVERIES}>
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
                      value={item._id}
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

export default DeliveryOptions;
