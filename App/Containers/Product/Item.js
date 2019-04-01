import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
import { shape, number, string } from 'prop-types'

import { parseToRupiah, calcDiscount } from 'Lib'
import styles from './Styles'

class Item extends Component {
  
  onClick = () => {
    const { data, navigation } = this.props
    navigation.navigate('ProductDetail', { data })
  }
  
  render() {
    const { data } = this.props
    console.log('Item render', data)
    if (!data) {
      return <View />
    }
    const  { title, price, discount, photo } = data
    console.tron.log('Item ', this.props, title, price, discount, photo)
    return (
      <TouchableOpacity 
        onPress={this.onClick}
        style={styles.product__item}
        >
        <View style={styles.product__item_content}>
          <Image source={{uri: photo }} style={{width:60, height:60}}/>
          <View style={{flexDirection:'column', justifyContent: 'center'}}>
            <Text style={{textAlign:'right', fontWeight:'bold'}}>{title}</Text>
            <Text style={{textAlign:'right'}}>{parseToRupiah(price)}</Text>
            <Text style={{textAlign:'right'}}>{parseToRupiah(calcDiscount(price, discount))}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

Item.propTypes = {
  data: shape({
    title: string,
    price: string,
    discount: string,
    photo: string,
  }),
}

export default Item;