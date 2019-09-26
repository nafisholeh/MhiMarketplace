import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { DotIndicator } from 'react-native-indicators';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import FarmerSignupActions from 'Redux/FarmerSignupRedux';
import { SIGNUP } from 'GraphQL/User/Mutation';
import { isEmailError, getGraphQLError, moderateScale } from 'Lib';
import {
  InputText,
  ButtonPrimary,
  BackButton,
  KeyboardFriendlyView
} from 'Components';
import { Header, HillHeaderWrapper, SignupBoxWrapper } from 'CommonFarmer';
import { Images } from 'Themes';
    
class Farmer extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }

  state = {
    phone: null,
    error_phone: null,
    email: null,
    error_email: null,
    password: null,
    error_password: null,
    password_repeat: null,
    error_password_repeat: null,
    loading: false,
  };
  
  onStartSignup = async () => {
    const {
      phone,
      error_phone,
      email,
      error_email,
      password,
      error_password,
      password_repeat,
      error_password_repeat,
    } = this.state;
    await this.setState({ error_phone: null, error_password: null, error_password_repeat: null });
    let isValid = true;
    if (!phone) {
      await this.setState({ error_phone: 'Nomor HP harus diisi' });
      isValid = false;
    }
    if (!email || email === 0) {
      await this.setState({ error_email: 'Email harus diisi' });
      isValid = false;
    }
    if (password && password_repeat && password !== password_repeat) {
      await this.setState({ error_password_repeat: 'Password masih belum sama' });
    } 
    if (!password || password === 0) {
      await this.setState({ error_password: 'Password harus diisi' });
      isValid = false;
    }
    if (!password_repeat || password_repeat === 0) {
      await this.setState({ error_password_repeat: 'Password perlu diulang lagi' });
      isValid = false;
    }
    if (isValid) {
      this.onSignup();
    }
  }
  
  onSignup = () => {
    const { navigation, storeFarmerCreds } = this.props;
    const {
      phone,
      email,
      password
    } = this.state;
    console.tron.log('onSignup', this.state, this.props)
    storeFarmerCreds(phone, email, password);
    navigation.navigate('SignupFarmerSecond');
  }
  
  renderBottom = () => {
    const { loading } = this.state;
    return (
      <ButtonPrimary
        onPress={this.onSignup}
        disabled={loading}
        loading={loading}
        title="Selanjutnya"
      />
    );
  };
  
  render () {
    const {
      phone,
      error_phone,
      email,
      error_email,
      password,
      error_password,
      password_repeat,
      error_password_repeat,
      loading,
    } = this.state;
    const { navigation } = this.props;
    return (
      <HillHeaderWrapper
        title="Pendaftaran akun baru"
        ChildrenBottom={this.renderBottom}
      >
        <SignupBoxWrapper height={165}>
          <InputText
            refs={(ref) => this._phone = ref}
            title="Nomor HP"
            placeholder="HP yang aktif"
            value={phone || ''}
            error={error_phone}
            onChangeText={(text) => this.setState({ phone: text })}
            returnKeyType="next"
            keyboardType="numeric"
            onSubmitEditing={() => this._email.focus()}
          />
        
          <InputText
            refs={(ref) => this._email = ref}
            title="Email"
            placeholder="Email yang aktif"
            value={email || ''}
            error={error_email || isEmailError(email)}
            onChangeText={(text) => this.setState({ email: text })}
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => this._password.focus()}
          />
        </SignupBoxWrapper>
        
        <SignupBoxWrapper height={165}>
          <InputText
            refs={(ref) => this._password = ref}
            title="Password"
            placeholder="Password"
            value={password || ''}
            error={error_password}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
            onSubmitEditing={() => this._password_repeat.focus()}
            returnKeyType="next"
          />
        
          <InputText
            refs={(ref) => this._password_repeat = ref}
            title="Ulangi Password"
            placeholder="Ulangi Password"
            value={password_repeat || ''}
            error={error_password_repeat}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password_repeat: text })}
            onSubmitEditing={this.onStartSignup}
            returnKeyType="go"
            containerStyle={{
              marginHorizontal: moderateScale(40),
              marginBottom: moderateScale(25),
            }}
          />
        </SignupBoxWrapper>

      </HillHeaderWrapper>
    )
  }
}

Farmer.propTypes = {
  storeFarmerCreds: func,
};

const mapDispatchToProps = dispatch => ({
  storeFarmerCreds: (phone, email, password) =>
    dispatch(FarmerSignupActions.storeFarmerCreds(phone, email, password)),
});

export default connect(null, mapDispatchToProps)(withNavigation(Farmer));
