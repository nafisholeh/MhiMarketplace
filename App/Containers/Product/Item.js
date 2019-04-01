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
    if (!data) {
      return <View />
    }
    const  { title, price, discount, photo } = data
    return (
      <TouchableOpacity 
        onPress={this.onClick}
        style={styles.product__item}
        >
        <View style={styles.product__item_content}>
          <Image source={{uri: photo }} style={{width:60, height:60}}/>
          <View style={{flexDirection:'column', justifyContent: 'center'}}>
            <Text style={{textAlign:'right', fontWeight:'bold'}}>{title}</Text>
            <Text style={
                discount ? 
                  {textAlign:'right', textDecorationLine: 'line-through', textDecorationStyle: 'solid'} 
                  : {textAlign:'right'}
            }>
              {parseToRupiah(price)}
            </Text>
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
    price: number,
    discount: number,
    photo: string,
  }),
}

export default Item;