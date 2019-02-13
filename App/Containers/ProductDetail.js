import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Query } from 'react-apollo'

import { FETCH_PRODUCT_LIST } from './GraphQL/Query'
import { Images, Metrics } from '../Themes'
import { OptimizedList } from 'Components'
import styles from './Styles/LaunchScreenStyles'

export default class ProductDetail extends Component {
  
  _onAddCart = () => {
    
  }
  
  render () {
    const { navigation: { state: { params: { data: { title, desc, quantity, image_url } }}} } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{ uri: image_url }} style={{ width: Metrics.deviceWidth, height: 200 }} />
        
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{title}</Text>
          <Text>{quantity} kg</Text>
          <Text style={{ marginTop: 25 }}>{desc}</Text>
        </View>
        
        <TouchableOpacity
          onPress={() => this._onAddCart()}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, width: Metrics.deviceWidth, height: 50, backgroundColor: 'gray',
            alignItems: 'center', justifyContent: 'center'
          }}
          >
          <Text style={{color: 'white'}}>
            Pesan Sekarang
          </Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}
