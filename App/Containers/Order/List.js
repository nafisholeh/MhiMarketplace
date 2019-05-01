import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import Item from './Item';
import {
  INITIAL_CHECKOUT_LIST,
  COMPLETED_CHECKOUT_LIST,
  PAID_OFF_CHECKOUT_LIST,
} from 'GraphQL/Order/Query';
import { Images, Metrics } from 'Themes';
import { OptimizedList } from 'Components';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import styles from './Styles';

const types = ['initial', 'completed', 'paid-off'];

class List extends Component {
  
  _renderRow = (type, data) => <Item data={data} />

  render() {
    const { type = 'completed' } = this.props;
    let queryTitle = COMPLETED_CHECKOUT_LIST;
    let responseTitle = 'completedCheckouts';
    switch (type) {
      case 'initial':
        queryTitle = INITIAL_CHECKOUT_LIST;
        responseTitle = 'initialCheckouts';
        break;
      case 'paid-off':
        queryTitle = PAID_OFF_CHECKOUT_LIST;
        responseTitle = 'paidOffCheckouts';
        break;
      default:
        queryTitle = COMPLETED_CHECKOUT_LIST;
        responseTitle = 'completedCheckouts';
        break;
    }
    return (
      <View style={styles.container}>
        <Query query={queryTitle}>
          {({ loading, error, data, refetch }) => {
            if(error) {
              return (<View></View>)
            } else if(data) {
              const dataParsed = data[responseTitle] || [];
              if (dataParsed.length === 0) {
                return (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>(Kosong)</Text>
                  </View>
                );
              }
              return (
                <OptimizedList
                  itemWidth={160}
                  itemHeight={90}
                  data={dataParsed} 
                  renderRow={this._renderRow}
                  isHorizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 30 }}
                  style={{ padding: 10 }}
                />
              )
            }
          }}
        </Query>
      </View>
    )
  }
}

List.propTypes = {
  type: string,
};

export default connect(null, null)(List);