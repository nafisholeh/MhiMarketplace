import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Query } from 'react-apollo'

import { FETCH_PRODUCT_LIST } from './GraphQL/Query'
import { Images, Metrics } from '../Themes'
import { OptimizedList } from 'Components'
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  
  _onClickProduct = (data) => {
    console.tron.log('onClick ', data)
    this.props.navigation.navigate('ProductDetail', { data })
  }
  
  _renderRow = (type, data) => {
    return (
      <TouchableOpacity 
        onPress={() => this._onClickProduct(data)}
        style={styles.product__item}
        >
        <View style={styles.product__item_content}>
          <Image source={{uri: data.image_url }} style={{width:60, height:60}}/>
          <View style={{flexDirection:'column', justifyContent: 'center'}}>
            <Text style={{textAlign:'right', fontWeight:'bold'}}>{data.title}</Text>
            <Text style={{textAlign:'right'}}>{data.quantity} kg</Text>
          </View>
        </View>
        <Text numberOfLines={1}>{data.desc}</Text>
      </TouchableOpacity>
    )
  }
  
  render () {
    return (
      <View style={styles.container}>

        <View style={styles.section} >
          <Query query={FETCH_PRODUCT_LIST}>
            {(renderProps) => {
              if(renderProps.data) {
                return (
                  <OptimizedList
                    itemWidth={Metrics.deviceWidth}
                    itemHeight={120}
                    data={renderProps.data.products} 
                    renderRow={this._renderRow}
                  />
                )
              }
            }}
          </Query>
        </View>
        
      </View>
    )
  }
}
