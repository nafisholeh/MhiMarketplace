import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { string } from 'prop-types';

import { Colors } from 'Themes';

class ReadyToProcessItem extends Component {
  render() {
    const { district, address, schedule, totalWeight } = this.props;
    return (
      <View style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderBottomWidth: 0.5,
          borderColor: Colors.brown_light,
        }}>
        <Text>{district}</Text>
        <Text>{address}</Text>
        <Text>{schedule}</Text>
        <Text>{totalWeight}</Text>
      </View>
    );
  }
}

ReadyToProcessItem.propTypes = {
  district: string,
  address: string,
  schedule: string,
  totalWeight: string,
};

export default ReadyToProcessItem;
