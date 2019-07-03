import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CHECKOUT_ITEMS } from 'GraphQL/Order/Query';
import { getUserId } from 'Redux/SessionRedux';
import Item from './Item';

class CheckoutList extends Component {
  
  renderCheckoutItems = ({item, index}) => {
    return (
      <Item data={item} />
    );
  };
  
  render() {
    const { data } = this.props;
    return (
      <FlatList
        keyExtractor={(item, id) => item._id.toString()}
        data={data} 
        renderItem={this.renderCheckoutItems}
        // contentContainerStyle={{ paddingBottom: 100, backgroundColor: 'yellow' }}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

export default connect(mapStateToProps, null)(CheckoutList);