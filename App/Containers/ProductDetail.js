import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Query } from 'react-apollo'

import { FETCH_PRODUCT_LIST } from './GraphQL/Query'
import { Images, Metrics } from '../Themes'
import { OptimizedList } from 'Components'
import styles from './Styles/LaunchScreenStyles'

export default class ProductDetail extends Component {
  
  render () {
    return (
      <View style={styles.container}>
        
      </View>
    )
  }
}
