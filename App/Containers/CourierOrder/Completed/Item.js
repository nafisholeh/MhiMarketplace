import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { string, func } from 'prop-types';

import { Colors } from 'Themes';

class Item extends Component {
  onClickItem = () => {
    const { onSelectItem, id } = this.props;
    if (onSelectItem) onSelectItem(id);
  };

  render() {
    const { id, district, address, arrivalTime } = this.props;
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
        <Text>Terkirim: {arrivalTime || 'Belum terisi'}</Text>
      </TouchableOpacity>
    );
  }
}

Item.propTypes = {
  id: string,
  district: string,
  address: string,
  arrivalTime: string,
};

export default Item;
