import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { bool, string, func } from 'prop-types';
import { BarIndicator } from 'react-native-indicators';

import { Colors } from 'Themes';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { FETCH_ADDRESS } from 'GraphQL/Address/Query';
import { FETCH_COURIER_COST } from 'GraphQL/CourierCost/Query';
import { FETCH_PAYMENT_OPTION } from 'GraphQL/paymentOptions/Query';
import { getUserId } from 'Redux/SessionRedux';
import CartActions, { isFetchingCart } from 'Redux/CartRedux';

class Setup extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isFetchingCourierCost: false,
      isCourierCostFinish: false,
      isFetchingPayment: false,
      isPaymentFinish: false,
    };
  }
  
  componentDidMount() {
    this.prefecthCart();
    this.prefecthCourierCost();
    this.prefecthPaymentOption();
  }
  
  componentDidUpdate(prevProps) {
    if(!prevProps.isFetchingCartSuccess && this.props.isFetchingCartSuccess) {
      this.checkIfDone();
    }
  }
  
  checkIfDone = () => {
    const { navigation, isFetchingCartSuccess } = this.props;
    const { isCourierCostFinish, isPaymentFinish } = this.state;
    if (isCourierCostFinish && isFetchingCartSuccess && isPaymentFinish) {
      navigation.navigate('Home');
    }
  };
  
  prefecthCart = async () => {
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
  };
  
  prefecthCourierCost = async () => {
    this.setState({
      isFetchingCourierCost: true,
      isCourierCostFinish: false,
    });
    ApolloClientProvider.client.query({
      query: FETCH_COURIER_COST
    })
    .then(data => {
      this.setState({
        isFetchingCourierCost: false,
        isCourierCostFinish: true,
      });
    }).catch(err => {
      this.setState({
        isFetchingCourierCost: false,
        isCourierCostFinish: true,
      });
    })
  };
  
  prefecthPaymentOption = async () => {
    this.setState({
      isFetchingPayment: true,
      isPaymentFinish: false,
    });
    ApolloClientProvider.client.query({
      query: FETCH_COURIER_COST
    })
    .then(data => {
      this.setState({
        isFetchingPayment: false,
        isPaymentFinish: true,
      });
    }).catch(err => {
      this.setState({
        isFetchingPayment: false,
        isPaymentFinish: true,
      });
    });
  };
  
  render() {
    const { isFetchingCart } = this.props;
    const { isFetchingCourierCost, isFetchingPayment } = this.state;
    return (
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        {(isFetchingCart || isFetchingCourierCost || isFetchingPayment) && (
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
  isFetchingCartSuccess: bool,
  onStartFetchingCart: func,
  onSuccessFetchingCart: func,
  onErrorFetchingCart: func,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  isFetchingCart: isFetchingCart(),
  isFetchingCartSuccess: isFetchingCartSuccess(),
});

const mapDispatchToProps = dispatch => ({
  onStartFetchingCart: () => dispatch(CartActions.onStartFetchingCart()),
  onSuccessFetchingCart: () => dispatch(CartActions.onSuccessFetchingCart()),
  onErrorFetchingCart: error => dispatch(CartActions.onErrorFetchingCart(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup);