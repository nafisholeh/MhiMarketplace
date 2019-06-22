import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { string, func } from 'prop-types';

import { Colors } from 'Themes';

class ReadyToProcessItem extends Component {
  onClickItem = () => {
    const { onSelectItem, id } = this.props;
    if (onSelectItem) onSelectItem(id);
  };

  render() {
    const { id, district, address, schedule, totalWeight } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onClickItem}
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderBottomWidth: 0.5,
          borderColor: Colors.brown_light,
        }}
      >
        <Text>{district}</Text>
        <Text>{address}</Text>
        <Text>{schedule}</Text>
        <Text>Total Berat: {totalWeight}</Text>
      </TouchableOpacity>
    );
  }
}

ReadyToProcessItem.propTypes = {
  id: string,
  district: string,
  address: string,
  schedule: string,
  totalWeight: string,
  onSelectItem: func,
};

export default ReadyToProcessItem;
