import React, { Component } from 'react';
import { View, Picker, Text } from 'react-native';
import { Query } from 'react-apollo';

import { FETCH_DELIVERIES } from 'GraphQL/Delivery/Query';

class DeliveryOptions extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    }
  }
  
  onValueChange = (itemValue, itemIndex) => {
    this.setState({selected: itemValue})
  };
  
  render() {
    const { selected } = this.state;
    return (
      <View>
        <Query 
          query={FETCH_DELIVERIES}>
          {({ loading, error, data, refetch }) => {
            if (loading) return (<View />);
            else if (error) return (<View />);
            const { deliveries } = data;
            return (
              <View>
                <Text>Pilih Jadwal Pengiriman:</Text>
                <Picker
                  selectedValue={selected}
                  style={{height: 50, width: 250}}
                  onValueChange={this.onValueChange}>
                  {deliveries.map(item => (
                    <Picker.Item
                      key={item._id}
                      label={`${item.day} ${item.time_start} - ${item.time_end}`}
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
