import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { bool, string, func } from 'prop-types';
import { BarIndicator } from 'react-native-indicators';

import { Colors } from 'Themes';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { getUserId } from 'Redux/SessionRedux';
import CartActions, { isFetchingCart } from 'Redux/CartRedux';

class Setup extends Component {
  
  componentDidMount() {
    this.setupCart();
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.isFetchingCart && !this.props.isFetchingCart) {
      const { navigation } = this.props;
      navigation.navigate('Home');
    }
  }
  
  setupCart = () => {
    this.fetchCart()
    .then(res => {
      console.tron.log('componentDidMount/result', res)  
    })
    .catch(err => {
      console.tron.log('componentDidMount/err', err)  
    })
  }
  
  fetchCart = async () => {
    const { 
      userId: user_id,
      onStartFetchingCart,
      onSuccessFetchingCart,
      onErrorFetchingCart
    } = this.props;
    onStartFetchingCart();
    return new Promise((resolve, reject) => {
      try {
        ApolloClientProvider.client.query({
          query: FETCH_CART,
          variables: { user_id }
        })
        .then(data => {
          onSuccessFetchingCart();
          resolve(true);
        }).catch(err => {
          onErrorFetchingCart(err);
          reject(err);
        })
      } catch(err) {
        onErrorFetchingCart(err);
        reject(err);
      }
    });
  }
  
  render() {
    const { isFetchingCart } = this.props;
    return (
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        {isFetchingCart && (
          <BarIndicator
            color={Colors.green_dark}
            count={5}
            size={50}
          />
        )}
      </View>
    )
  }
}

Setup.propTypes = {
  userId: string,
  isFetchingCart: bool,
  onStartFetchingCart: func,
  onSuccessFetchingCart: func,
  onErrorFetchingCart: func,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  isFetchingCart: isFetchingCart(),
});

const mapDispatchToProps = dispatch => ({
  onStartFetchingCart: () => dispatch(CartActions.onStartFetchingCart()),
  onSuccessFetchingCart: () => dispatch(CartActions.onSuccessFetchingCart()),
  onErrorFetchingCart: error => dispatch(CartActions.onErrorFetchingCart(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup);