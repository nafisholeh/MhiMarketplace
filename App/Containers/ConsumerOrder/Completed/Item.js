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
    const { id, transactionId, title, subtitle, body } = this.props;
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            numberOfLines={1}
            style={{ fontWeight: 'bold' }}>
            {`#${transactionId}` || '-'}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontWeight: 'bold' }}>
            {subtitle || '-'}
          </Text>
        </View>
        <Text numberOfLines={1}>
          {title || '-'}
        </Text>
        {body && (
          <Text numberOfLines={1}>
            {body}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

Item.propTypes = {
  id: string,
  transactionId: string,
  title: string,
  subtitle: string,
  body: string,
};

export default Item;
