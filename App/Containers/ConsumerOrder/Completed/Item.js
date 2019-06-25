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
    const { id, district, address, injuryTime } = this.props;
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
        <Text style={{ fontWeight: 'bold' }}>
          {injuryTime ? 
            `Ditunggu ${injuryTime}` :
            'Belum terisi'
          }
        </Text>
        <Text>{district}</Text>
        <Text>{address}</Text>
      </TouchableOpacity>
    );
  }
}

Item.propTypes = {
  id: string,
  district: string,
  address: string,
  injuryTime: string,
};

export default Item;
