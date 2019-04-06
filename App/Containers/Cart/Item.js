import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
import { shape, number, string } from 'prop-types'

import { parseToRupiah } from 'Lib'

class Item extends Component {
  
  onClick = () => {}
  
  render() {
    const { data } = this.props
    if (!data) {
      return <View />
    }
    console.tron.log('Item render', data)
    return (
      <TouchableOpacity 
        onPress={this.onClick}
        style={{ height: 100 }}
        >
        <View>
        </View>
      </TouchableOpacity>
    )
  }
}

Item.propTypes = {
  data: shape({}),
}

export default Item;