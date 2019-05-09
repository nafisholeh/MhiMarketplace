import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { bool, string, func } from 'prop-types';
import { BarIndicator } from 'react-native-indicators';
import OneSignal from 'react-native-onesignal';

import { Colors } from 'Themes';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { FETCH_ADDRESS } from 'GraphQL/Address/Query';
import { FETCH_COURIER_COST } from 'GraphQL/CourierCost/Query';
import { FETCH_PAYMENT_OPTION } from 'GraphQL/PaymentOption/Query';
import { ADD_ONE_SIGNAL_TOKEN } from 'GraphQL/OneSignal/Mutation';
import SessionActions, { getUserId } from 'Redux/SessionRedux';
import CartActions, { isFetchingCart, isFetchingCartSuccess } from 'Redux/CartRedux';

class Setup extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      isFetchingCourierCost: false,
      isCourierCostFinish: false,
      isFetchingPayment: false,
      isPaymentFinish: false,
      isUploadingToken: false,
      isTokenFinish: false,
    };
    OneSignal.addEventListener('ids', this.onOneSignalIdsReceived);
    // OneSignal.configure();
  }
  
  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onOneSignalIdsReceived);
  }
  
  componentDidMount() {
    this.checkIfDone();
    this.prefecthCart();
    this.prefecthCourierCost();
    this.prefecthPaymentOption();
  }
  
  componentDidUpdate(prevProps) {
    if(!prevProps.isFetchingCartSuccess && this.props.isFetchingCartSuccess) {
      this.checkIfDone();
    }
  }
  
  onOneSignalIdsReceived = device => {
    const { userId: token } = device || {};
    const { storeNotifId } = this.props;
    storeNotifId(token);
    this.preUploadToken(token);
  }
  
  checkIfDone = () => {
    const { navigation, isFetchingCartSuccess } = this.props;
    const { isCourierCostFinish, isPaymentFinish, isTokenFinish } = this.state;
    if (
      isCourierCostFinish && isFetchingCartSuccess && 
      isPaymentFinish && isTokenFinish
    ) {
      navigation.navigate('Home');
    }
  };
  
  preUploadToken = async token => {
    const { userId } = this.props;
    if (!userId) {
      this.setState({ isTokenFinish: true });
      return;
    }
    this.setState({
      isUploadingToken: true,
      isTokenFinish: false,
    });
    ApolloClientProvider.client.mutate({
      mutation: ADD_ONE_SIGNAL_TOKEN,
      variables: { user_id: userId, token },
    })
    .finally(() => {
      this.setState({
        isUploadingToken: false,
        isTokenFinish: true,
      });
      this.checkIfDone();
    })
  }
  
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
    .finally(() => {
      this.setState({
        isFetchingCourierCost: false,
        isCourierCostFinish: true,
      });
      this.checkIfDone();
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
    .finally(() => {
      this.setState({
        isFetchingPayment: false,
        isPaymentFinish: true,
      });
      this.checkIfDone();
    })
  };
  
  render() {
    const { isFetchingCart } = this.props;
    const { isFetchingCourierCost, isFetchingPayment, isUploadingToken } = this.state;
    return (
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        {(
          isFetchingCart || isFetchingCourierCost ||
          isFetchingPayment || isUploadingToken
        ) && (
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
  storeNotifId: func,
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
  storeNotifId: oneSignalUserId => dispatch(SessionActions.storeNotifId(oneSignalUserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup);