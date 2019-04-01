import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Query } from 'react-apollo'

import Item from '../Product/Item'
import { FETCH_PRODUCT_LIST } from 'GraphQL/Product/Query'
import { Images, Metrics } from 'Themes'
import { OptimizedList } from 'Components'
import styles from './Styles'
    
export default class Home extends Component {
  
  _renderRow = (type, data) => <Item data={data} navigation={this.props.navigation} />
  
  render () {
    return (
      <View style={styles.container}>

        <View style={styles.section} >
          <Query query={FETCH_PRODUCT_LIST}>
            {({ loading, error, data, refetch }) => {
              if(error) {
                return (<View></View>)
              } else if(data) {
                return (
                  <OptimizedList
                    itemWidth={Metrics.deviceWidth}
                    itemHeight={100}
                    data={data.products} 
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
