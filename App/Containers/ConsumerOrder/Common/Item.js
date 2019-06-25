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
          <Text style={{ fontWeight: 'bold' }}>
            {`#${transactionId}` || '-'}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            {subtitle || '-'}
          </Text>
        </View>
        <Text>
          {title || '-'}
        </Text>
        {body && (
          <Text>
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
