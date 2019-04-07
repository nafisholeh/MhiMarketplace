import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
import { shape, number, string } from 'prop-types'

import { parseToRupiah } from 'Lib'

class Item extends Component {
  
  onClick = () => {}
  
  render() {
    const { data: { product: { title, photo } } } = this.props
    if (!data) {
      return <View />
    }
    console.tron.log('Item render', data)
    return (
      <TouchableOpacity 
        onPress={this.onClick}
        style={{ height: 100 }}
        >
        <Image source={{ uri: photo }} style={{width:60, height:60}}/>
        <Text>{title}</Text>
      </TouchableOpacity>
    )
  }
}

Item.propTypes = {
  data: shape({
    product: {
      _id: string,
      title: string,
      photo: string,
      price: number,
      discount: number,
    },
    qty: number,
  }),
}

export default Item;