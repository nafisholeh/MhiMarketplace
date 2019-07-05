import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { shape, string, func } from 'prop-types';
import { Mutation } from 'react-apollo';
import { DotIndicator } from 'react-native-indicators';
import { withNavigation } from 'react-navigation';

import Config from 'Config/AppConfig';
import { StatePage, HeaderTitle } from 'Components';
import { Colors, Metrics, Images } from 'Themes';
import { moderateScale } from 'Lib';
import SessionActions, { getUser, getUserId } from 'Redux/SessionRedux';
import CartActions from 'Redux/CartRedux';
import CheckoutActions from 'Redux/CheckoutRedux';
import { SIGNOUT } from 'GraphQL/User/Mutation';
import Menu from './Menu';

class Account extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }
  
  signout = mutate => {
    const { userId: user_id } = this.props;
    mutate({
      variables: { user_id }
    });
  };
  
  onSignoutComplete = async () => {
    const { reset: clearSession, resetCart, resetCheckout, navigation } = this.props;
    await clearSession();
    await resetCart();
    await resetCheckout();
    navigation.navigate('ConsumerNav');
  }
  
  signin = () => {
    const { navigation } = this.props;
    navigation.navigate('Signin');
  }
  
  render() {
    const { user, navigation } = this.props;
    const { email = '', name = '' } = user || {};
    if (!user) {
      return (
        <StatePage
          title="Untuk kenyamanan Anda"
          subtitle="Silahkan daftar/login terlebih dahulu"
          buttonTitle="Login Yuk"
          icon={Config.pageState.NO_ACCOUNT}
          onPress={this.signin}
        />
      );
    }
    return (
      <Mutation
        mutation={SIGNOUT}
        onCompleted={this.onSignoutComplete}
        ignoreResults={false}
        errorPolicy='all'>
        { (mutate, {loading, error, data}) => {
          return (
            <View>
              <HeaderTitle
                title={name}
                isEnableRightNav
                iconRightNav={Images.logout}
                onRightNavigate={() => this.signout(mutate)}
              />
              <View style={{ marginTop: moderateScale(20) }} />
              <Menu
                title="Riwayat Pesanan"
                icon={Images.sent}
                onPress={() => navigation.navigate('ConsumerCompleted')}
              />
              <Menu
                title="Daftar Pesanan yang sedang diproses"
                icon={Images.delivery}
                onPress={() => navigation.navigate('ConsumerOrder')}
              />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

Account.propTypes = {
  user: shape({
    email: string,
    name: string,
  }),
  reset: func,
  resetCart: func,
  resetCheckout: func,
  userId: string,
};

const mapStateToProps = createStructuredSelector({
  user: getUser(),
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(SessionActions.reset()),
  resetCart: () => dispatch(CartActions.resetCart()),
  resetCheckout: () => dispatch(CheckoutActions.resetCheckout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Account));
