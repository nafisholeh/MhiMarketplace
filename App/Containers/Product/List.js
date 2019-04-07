import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import Item from './Item';
import { FETCH_PRODUCT_LIST } from 'GraphQL/Product/Query';
import { Images, Metrics } from 'Themes';
import { OptimizedList } from 'Components';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import styles from './Styles';

class List extends Component {
  
  _renderRow = (type, data) => <Item data={data} />

  render() {
    return (
      <View style={styles.container}>
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
    )
  }
}

export default connect(null, null)(List);