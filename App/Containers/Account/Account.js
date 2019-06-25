import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { shape, string, func } from 'prop-types';
import { Mutation } from 'react-apollo';
import { DotIndicator } from 'react-native-indicators';

import Config from 'Config/AppConfig';
import { StatePage } from 'Components';
import { Colors, Metrics } from 'Themes';
import SessionActions, { getUser, getUserId } from 'Redux/SessionRedux';
import CartActions from 'Redux/CartRedux';
import CheckoutActions from 'Redux/CheckoutRedux';
import { SIGNOUT } from 'GraphQL/User/Mutation';

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
    const { user } = this.props;
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
      )
    }
    return (
      <View style={{ flex: 1, padding: Metrics.baseMargin }}>
        <Text>{email}</Text>
        <Text>{name}</Text>
        <Mutation
          mutation={SIGNOUT}
          onCompleted={this.onSignoutComplete}
          ignoreResults={false}
          errorPolicy='all'>
          { (mutate, {loading, error, data}) => {
            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  maxHeight: 50,
                  justifyContent: 'center',
                  backgroundColor: Colors.green_light
                }}
                onPress={() => this.signout(mutate)}
              >
                {loading && (
                  <DotIndicator
                    count={4}
                    size={7}
                    color='white'
                    animationDuration={800}
                  /> 
                )}
                {!loading && (
                  <Text style={{ alignSelf: 'center', color: 'white' }}>Keluar</Text>
                )}
              </TouchableOpacity>
            );
          }}
        </Mutation>
      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);
