import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Query } from 'react-apollo'

import { FETCH_PRODUCT_LIST } from './GraphQL/Query'
import { Images, Metrics } from '../Themes'
import { OptimizedList } from 'Components'
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  
  _onClickProduct = (data) => {
    
  }
  
  _renderRow = (type, data) => {
    return (
      <TouchableOpacity 
        onPress={() => this._onClickProduct(data)}
        style={{width: Metrics.vw * 50, height: 200}}>
        <Text>{data.title}</Text>
        <Text>{data.desc}</Text>
        <Text>{data.quantity}</Text>
      </TouchableOpacity>
    )
  }
  
  render () {
    return (
      <ScrollView style={styles.container}>

        <View style={styles.section} >
          <Query query={FETCH_PRODUCT_LIST}>
            {(renderProps) => {
              if(renderProps.data) {
                return (
                  <OptimizedList
                    itemWidth={Metrics.vw * 50}
                    itemHeight={235}
                    data={renderProps.data.products} 
                    renderRow={this._renderRow}
                  />
                )
              }
            }}
          </Query>
        </View>
        

      </ScrollView>
    )
  }
}
