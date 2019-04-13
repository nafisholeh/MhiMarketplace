import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CHECKOUT_ITEMS } from 'GraphQL/Checkout/Query';
import { getUserId } from 'Redux/SessionRedux';
import Item from './Item';

class CheckoutList extends Component {
  
  renderCheckoutItems = ({item, index}) => {
    return (
      <Item data={item} />
    );
  };
  
  render() {
    const { userId } = this.props;
    return (
      <View style={{flex: 1}}>
        <Query 
          query={FETCH_CHECKOUT_ITEMS}
          variables={{ user_id: userId }}>
          {({ loading, error, data, refetch }) => {
            if (loading) return (<View />);
            else if (error) return (<View />);
            const { checkout } = data;
            return (
              <FlatList
                keyExtractor={(item, id) => item._id.toString()}
                data={checkout} 
                renderItem={this.renderCheckoutItems}
              />
            );
          }}
        </Query>
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

export default connect(mapStateToProps, null)(CheckoutList);