import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import Item from '../Product/Item';
import { FETCH_PRODUCT_LIST } from 'GraphQL/Product/Query';
import CartActions from 'Redux/CartRedux';
import { Images, Metrics } from 'Themes';
import { OptimizedList } from 'Components';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import styles from './Styles';
    
class Home extends Component {
  
  componentDidMount() {
    this.props.fetchCart();
  }
  
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

Home.propTypes = {
  fetchCart: func,
}

const mapDispatchToProps = (dispatch) => ({
  fetchCart: () => dispatch(CartActions.fetchCart()),
});

export default connect(null, mapDispatchToProps)(Home);