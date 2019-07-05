import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { DotIndicator } from 'react-native-indicators';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import SessionActions from 'Redux/SessionRedux';
import { SIGNUP } from 'GraphQL/User/Mutation';
import { isEmailError, getGraphQLError, moderateScale } from 'Lib';
import { InputTextAccount, ButtonSecondary } from 'Components';
import styles from './Styles';
    
class Signup extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }

  state = {
    name: null,
    error_name: null,
    email: null,
    error_email: null,
    password: null,
    error_password: null,
    password_repeat: null,
    error_password_repeat: null,
    loading: false,
  };
  
  onStartSignup = async () => {
    const { name, error_name, email, error_email, password, error_password, password_repeat, error_password_repeat } = this.state;
    await this.setState({ error_name: null, error_email: null, error_password: null, error_password_repeat: null });
    let isValid = true;
    if (!name || name === 0) {
      await this.setState({ error_name: 'Nama harus diisi' });
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
    const { name, email, password } = this.state;
    this.setState({ loading: true });
    ApolloClientProvider.client.mutate({
      mutation: SIGNUP,
      variables: { email, password, name },
    })
    .then(data => {
      const { data: response } = data;
      const { signup: { email } } = response;
      const { navigation, storeSignupEmail } = this.props;
      this.setState({ loading: false });
      storeSignupEmail(email);
      navigation.navigate("Signin");
    })
    .catch(error => {
      this.setState({ loading: false });
      const message = getGraphQLError(error);
      if (message.toLowerCase().indexOf("email") >= 0) {
        this.setState({ error_email: message });
      }
    });
  }
  
  render () {
    const {
      name,
      error_name,
      email,
      error_email,
      password,
      error_password,
      password_repeat,
      error_password_repeat,
      loading,
    } = this.state;
    return (
      <View style={styles.container}>
        
        <Text
          style={{
            fontFamily: 'CircularStd-Bold',
            fontSize: 20,
            color: 'rgba(0,0,0,0.68)',
            marginTop: moderateScale(25),
            marginLeft: moderateScale(15),
            marginBottom: moderateScale(20),
          }}
        >
          Pendaftaran akun baru
        </Text>
      
        <InputTextAccount
          label="Name"
          value={name || ''}
          error={error_name}
          onChangeText={(text) => this.setState({ name: text })}
          returnKeyType="next"
          onSubmitEditing={() => this._email.focus()}
        />

        <InputTextAccount
          ref={(ref) => this._email = ref}
          label="Email"
          value={email || ''}
          error={error_email || isEmailError(email)}
          onChangeText={(text) => this.setState({ email: text })}
          returnKeyType="next"
          onSubmitEditing={() => this._password.focus()}
        />
        
        <InputTextAccount
          ref={(ref) => this._password = ref}
          label="Password"
          value={password || ''}
          error={error_password}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          onSubmitEditing={() => this._password_repeat.focus()}
          returnKeyType="next"
        />
      
        <InputTextAccount
          ref={(ref) => this._password_repeat = ref}
          label="Ulangi Password"
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
      
        <ButtonSecondary
          onPress={this.onStartSignup}
          disabled={loading}
          loading={loading}
          title="Daftar"
        />
        
      </View>
    )
  }
}

Signup.propTypes = {
  storeSignupEmail: func,
};

const mapDispatchToProps = dispatch => ({
  storeSignupEmail: email => dispatch(SessionActions.storeSignupEmail(email)),
});

export default connect(null, mapDispatchToProps)(Signup);