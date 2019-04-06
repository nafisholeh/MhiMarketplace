import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { string } from 'prop-types';
import { createStructuredSelector } from 'reselect';

import Item from './Item';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { FETCH_SOME_PRODUCT } from 'GraphQL/Product/Query';
import { OptimizedList } from 'Components';
import { getUserId } from 'Redux/SessionRedux';
import { Metrics } from 'Themes';
import ApolloClientProvider from 'Services/ApolloClientProvider';

class Cart extends Component {
  
  _renderRow = (type, data) => <Item data={data} navigation={this.props.navigation} />

  render() {
    const { userId } = this.props;
    return (
      <View style={{flex:1}}>
        <Query 
          query={FETCH_CART}
          variables={{ user_id: userId }}>
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return (<View></View>)
            } else if (error) {
              return (<View></View>)
            } else if (data) {
              const { cart: { products = [] } } = data;
              return (
                <OptimizedList
                  itemWidth={Metrics.deviceWidth}
                  itemHeight={100}
                  data={products} 
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

Cart.propTypes = {
  userId: string,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

export default connect(mapStateToProps, null)(Cart);