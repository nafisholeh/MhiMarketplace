import React, { Component, Fragment } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { bool, string, func } from 'prop-types';
import { BarIndicator } from 'react-native-indicators';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';

import { screenWidth, moderateScale } from 'Lib';
import { Colors, Images } from 'Themes';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { FETCH_ADDRESS } from 'GraphQL/Address/Query';
import { FETCH_COURIER_COST } from 'GraphQL/CourierCost/Query';
import { FETCH_PAYMENT_OPTION } from 'GraphQL/PaymentOption/Query';
import { ADD_ONE_SIGNAL_TOKEN } from 'GraphQL/User/Mutation';
import { FETCH_PRODUCT_CATEGORY, FETCH_PRODUCT_PACKAGING } from 'GraphQL/Product/Query';
import { getUserId } from 'Redux/SessionRedux';
import OneSignalActions, { getOneSignalToken } from 'Redux/OneSignalRedux';
import CartActions, { isFetchingCart, isFetchingCartSuccess } from 'Redux/CartRedux';
import {
  isKurir,
  isStokOpname,
  isKeuangan,
  isAdmin,
  isLoggedin,
  isFarmer,
} from 'Redux/SessionRedux';

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
      isFetchingProductCategory: false,
      isProductCategoryFinish: false,
      isFetchingProductPackaging: false,
      isProductPackagingFinish: false,
    };
  }
  
  componentDidMount() {
    SplashScreen.hide();
    this.preUploadToken();
    this.checkIfDone();
    this.prefecthCart();
    this.prefecthCourierCost();
    this.prefecthPaymentOption();
    this.prefecthProductCategory();
    this.prefecthProductPackaging();
  }
  
  componentDidUpdate(prevProps) {
    if(!prevProps.isFetchingCartSuccess && this.props.isFetchingCartSuccess) {
      this.checkIfDone();
    }
  }
  
  checkIfDone = () => {
    const { navigation, isFetchingCartSuccess, isKurir, isStokOpname, isKeuangan, isAdmin, isLoggedin } = this.props;
    const {
      isCourierCostFinish,
      isPaymentFinish,
      isTokenFinish,
      isProductCategoryFinish,
      isProductPackagingFinish
    } = this.state;
    if (
      isCourierCostFinish && isFetchingCartSuccess && 
      isPaymentFinish && isTokenFinish && isProductCategoryFinish &&
      isProductPackagingFinish
    ) {
      if (!isLoggedin) navigation.navigate('SubAppChooser');
      else {
        if (isKurir) navigation.navigate('CourierNav');
        else if (isStokOpname) navigation.navigate('StockOpnameNav');
        else if (isKeuangan) navigation.navigate('FinanceNav');
        else if (isAdmin) navigation.navigate('AdminNav');
        else if (isFarmer) navigation.navigate('FarmerNav');
        else navigation.navigate('ConsumerNav');
      }
    }
  };
  
  preUploadToken = () => {
    const { userId, oneSignalToken } = this.props;
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
      variables: { user_id: userId, token: oneSignalToken },
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
    if (!user_id) {
      onSuccessFetchingCart();
      this.checkIfDone();
      return;
    }
    onStartFetchingCart();
    return new Promise((resolve, reject) => {
      try {
        ApolloClientProvider.client.query({
          query: FETCH_CART,
          variables: { user_id }
        })
        .then(data => {
          onSuccessFetchingCart();
          this.checkIfDone();
          resolve(true);
        }).catch(err => {
          onErrorFetchingCart(err);
          this.checkIfDone();
          reject(err);
        })
      } catch(err) {
        onErrorFetchingCart(err);
        this.checkIfDone();
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
  
  prefecthProductCategory = async () => {
    this.setState({
      isFetchingProductCategory: true,
      isProductCategoryFinish: false,
    });
    ApolloClientProvider.client.query({
      query: FETCH_PRODUCT_CATEGORY
    })
    .finally(() => {
      this.setState({
        isFetchingProductCategory: false,
        isProductCategoryFinish: true,
      });
      this.checkIfDone();
    })
  };
  
  prefecthProductPackaging = async () => {
    this.setState({
      isFetchingProductPackaging: true,
      isProductPackagingFinish: false,
    });
    ApolloClientProvider.client.query({
      query: FETCH_PRODUCT_PACKAGING
    })
    .finally(() => {
      this.setState({
        isFetchingProductPackaging: false,
        isProductPackagingFinish: true,
      });
      this.checkIfDone();
    })
  };
  
  render() {
    const { isFetchingCart } = this.props;
    const {
      isFetchingCourierCost,
      isFetchingPayment,
      isFetchingProductCategory,
      isFetchingProductPackaging,
      isUploadingToken
    } = this.state;
    return (
      <View
        style={{
          flex:1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image
          source={Images.bebas_peskim}
          style={{
            width: screenWidth * 0.35,
            height: screenWidth * 0.35,
          }}
        />
        {(
          isFetchingCart || isFetchingCourierCost ||
          isFetchingPayment || isUploadingToken || isFetchingProductCategory ||
          isFetchingProductPackaging
        ) && (
          <View
            style={{
              flexDirection: 'column',
              position: 'absolute',
              bottom: '10%',
            }}
          >
            <BarIndicator
              color={Colors.green_dark}
              count={5}
              size={15}
              style={{ marginBottom: moderateScale(5) }}
            />
            <Text
              style={{
                fontFamily: 'CircularStd-Bold',
                fontSize: 14,
                color: 'rgba(0,0,0,0.4)',
              }}
              >
              menyiapkan aplikasi
            </Text>
          </View>
        )}
      </View>
    )
  }
}

Setup.propTypes = {
  userId: string,
  oneSignalToken: string,
  isFetchingCart: bool,
  isFetchingCartSuccess: bool,
  onStartFetchingCart: func,
  onSuccessFetchingCart: func,
  onErrorFetchingCart: func,
  isKurir: bool,
  isStokOpname: bool,
  isKeuangan: bool,
  isAdmin: bool,
  isLoggedin: bool,
  isFarmer: bool,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  oneSignalToken: getOneSignalToken(),
  isFetchingCart: isFetchingCart(),
  isFetchingCartSuccess: isFetchingCartSuccess(),
  isKurir: isKurir(),
  isStokOpname: isStokOpname(),
  isKeuangan: isKeuangan(),
  isAdmin: isAdmin(),
  isLoggedin: isLoggedin(),
  isFarmer: isFarmer(),
});

const mapDispatchToProps = dispatch => ({
  onStartFetchingCart: () => dispatch(CartActions.onStartFetchingCart()),
  onSuccessFetchingCart: () => dispatch(CartActions.onSuccessFetchingCart()),
  onErrorFetchingCart: error => dispatch(CartActions.onErrorFetchingCart(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup);