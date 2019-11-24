import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { DotIndicator } from 'react-native-indicators';
import { StackActions, NavigationActions, SwitchActions } from 'react-navigation';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { SIGNIN, SIGNIN_FARMER } from 'GraphQL/User/Mutation';
import SessionActions, { getSignupEmail, getChosenSubApp } from 'Redux/SessionRedux';
import { getOneSignalToken } from 'Redux/OneSignalRedux';
import {
  isEmailError,
  getGraphQLError,
  InAppNotification,
  moderateScale,
  screenWidth,
  screenHeight,
} from 'Lib';
import { ButtonSecondary, InputTextAccount, KeyboardFriendlyView } from 'Components';
import Config from 'Config/AppConfig';
import styles from './Styles';
import { Colors, Images } from 'Themes';
    
class Signin extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }

  state = {
    email: null,
    error_email: null,
    password: null,
    error_password: null,
    loading: false,
  };
  
  componentDidMount() {
    this.useSignupEmail();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.signupEmail !== this.props.signupEmail) {
      this.useSignupEmail();
    }
  }
  
  useSignupEmail = () => {
    const { signupEmail, storeSignupEmail } = this.props;
    if (!signupEmail) return;
    
    this.setState({ email: signupEmail });
    storeSignupEmail(null);
  }
  
  openSignup = () => {
    const { navigation, chosenSubApp } = this.props;
    if (chosenSubApp === 'farmer') navigation.navigate('SignupFarmerFirst');
    else navigation.navigate('Signup');
  }
  
  onStartSignin = async () => {
    const { email, error_email, password, error_password } = this.state;
    await this.setState({ error_email: null, error_password: null });
    let isValid = true;
    if (!password || password === 0) {
      await this.setState({ error_password: 'Password harus diisi' });
      isValid = false;
    }
    if (!email || email === 0) {
      await this.setState({ error_email: 'Email harus diisi' });
      isValid = false;
    }
    if (isValid) {
      const { chosenSubApp } = this.props;
      if (chosenSubApp === 'farmer') this.onSigninFarmer();
      else this.onSignin();
    }
  }
  
  onSigninFarmer = async () => {
    const { email, password } = this.state;
    const emailLowerCase = email && email.toLowerCase();
    const { storeSession, storeSignupEmail, navigation } = this.props;
    storeSignupEmail(null);
    try {
      const { navigation, oneSignalToken: token } = this.props;
      this.setState({ loading: true });
      const signinResult = await ApolloClientProvider.client.mutate({
        mutation: SIGNIN_FARMER,
        variables: { email: emailLowerCase, password, token },
      });
      const { data: { signinFarmer } } = signinResult;
      if (signinFarmer) {
        await storeSession(signinFarmer);
        const screenName = "SopFarmer";
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Account' })]
        });
        const goToHome = NavigationActions.navigate({
          routeName: screenName
        });
        // navigation.dispatch(resetAction);
        navigation.dispatch(goToHome);
      }
    } catch (error) {
      this.onSigninError(error);
    }
  }
  
  onSignin = async () => {
    const { email, password } = this.state;
    const emailLowerCase = email && email.toLowerCase();
    const { storeSession, storeSignupEmail, navigation } = this.props;
    storeSignupEmail(null);
    try {
      const { navigation, oneSignalToken: token } = this.props;
      this.setState({ loading: true });
      const signinResult = await ApolloClientProvider.client.mutate({
        mutation: SIGNIN,
        variables: { email: emailLowerCase, password, token },
      });
      const { data: { signin } } = signinResult;
      const { _id: userId, user_type } = signin;
      
      if (signin) {
        await storeSession(signin);
        this.setState({ loading: false });
        let screenName = 'HomeConsumer';
        switch (user_type) {
          case Config.userType.KURIR:
            screenName = 'HomeCourier';
            break;
          case Config.userType.ADMIN:
            screenName = 'HomeAdmin';
            break;
          case Config.userType.STOK_OPNAME:
            screenName = 'HomeStockOpname';
            break;
          case Config.userType.KEUANGAN:
            screenName = 'HomeFinance';
            break;
          case Config.userType.RESELLER:
            screenName = 'HomeConsumer';
            break;
          default:
            screenName = 'HomeConsumer';
            break;
        }
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Account' })]
        });
        const goToHome = NavigationActions.navigate({
          routeName: screenName
        });
        navigation.dispatch(resetAction);
        navigation.dispatch(goToHome);
      }
    } catch (error) {
      this.onSigninError(error);
    }
  }
  
  onSigninError = error => {
    this.setState({ loading: false });
    const message = getGraphQLError(error);
    if (message.toLowerCase().indexOf("email") >= 0) {
      this.setState({ error_email: message });
    } else if (message.toLowerCase().indexOf("password") >= 0) {
      this.setState({ error_password: message });
    } else {
      InAppNotification.error();
    }
  };
  
  render () {
    const { email, error_email, password, error_password, loading } = this.state;
    return (
      <KeyboardFriendlyView style={{ flex: 1 }}>
        
        <Image
          source={Images.mhi}
          style={{
            height: moderateScale((screenHeight / 3)),
            width: moderateScale(screenWidth - 50),
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: moderateScale(30),
          }}
        />

          <InputTextAccount
            label="Email"
            value={email || ''}
            error={error_email || isEmailError(email)}
            onChangeText={(text) => this.setState({ email: text })}
            returnKeyType="next"
            onSubmitEditing={() => this._password.focus()}
          />
        
          <InputTextAccount
            refs={(ref) => this._password = ref}
            label="Password"
            value={password || ''}
            error={error_password}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
            onSubmitEditing={this.onStartSignin}
            returnKeyType="go"
            containerStyle={{
              marginHorizontal: moderateScale(40),
              marginBottom: moderateScale(25),
            }}
          />
        
          <ButtonSecondary
            onPress={this.onStartSignin}
            disabled={loading}
            loading={loading}
            title="Masuk"
            style={{ marginBottom: moderateScale(15) }}
          />
          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text
              onPress={this.openSignup}
              style={{
                fontFamily: 'CircularStd-Book',
                fontSize: 14,
                color: Colors.text,
                marginRight: moderateScale(3)
              }}
            >
              Belum punya akses, silahkan 
            </Text>
            <Text
              onPress={this.openSignup}
              style={{
                fontFamily: 'CircularStd-Bold',
                fontSize: 14,
                color: Colors.fruit_dark,
              }}
            >
              Daftar
            </Text>
          </View>
        
      </KeyboardFriendlyView>
    )
  }
}

Signin.propTypes = {
  storeSession: func,
  storeSignupEmail: func,
  oneSignalToken: string,
  signupEmail: string,
  chosenSubApp: string,
};

const mapStateToProps = createStructuredSelector({
  oneSignalToken: getOneSignalToken(),
  signupEmail: getSignupEmail(),
  chosenSubApp: getChosenSubApp(),
});

const mapDispatchToProps = (dispatch) => ({
  storeSession: user => dispatch(SessionActions.storeSession(user)),
  storeSignupEmail: email => dispatch(SessionActions.storeSignupEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);