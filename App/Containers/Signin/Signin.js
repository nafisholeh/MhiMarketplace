import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { TextField } from 'react-native-material-textfield';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { SIGNIN } from 'GraphQL/User/Mutation';
import { ADD_ONE_SIGNAL_TOKEN } from 'GraphQL/OneSignal/Mutation';
import SessionActions from 'Redux/SessionRedux';
import { getOneSignalToken } from 'Redux/OneSignalRedux';
import { isEmailError, getGraphQLError, InAppNotification } from 'Lib';
import styles from './Styles'
    
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
  };
  
  openSignup = () => {
    const { navigation } = this.props;
    navigation.navigate('Signup');
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
      this.onSignin();
    }
  }
  
  onSignin = async () => {
    const { email, password } = this.state;
    const { storeSession } = this.props;
    try {
      const { navigation, oneSignalToken } = this.props;
      const signinResult = await ApolloClientProvider.client.mutate({
        mutation: SIGNIN,
        variables: { email, password },
      });
      const { data: { signin } } = signinResult;
      const { _id: userId } = signin;
      
      const tokenResult = await ApolloClientProvider.client.mutate({
        mutation: ADD_ONE_SIGNAL_TOKEN,
        variables: { user_id: userId , token: oneSignalToken },
      });
      
      if (signin) {
        await storeSession(signin);
        navigation.push("Setup");
      }
    } catch (error) {
      const message = getGraphQLError(error);
      if (message.toLowerCase().indexOf("email") >= 0) {
        this.setState({ error_email: message });
      } else if (message.toLowerCase().indexOf("password") >= 0) {
        this.setState({ error_password: message });
      } else {
        InAppNotification.error();
      }
    }
  }
  
  render () {
    const { email, error_email, password, error_password } = this.state;
    const { navigation: { state: { params }} } = this.props;
    const { email: initialEmail = null } = params || {};
    return (
      <View style={styles.container}>

        <TextField
          label="Email"
          value={(!email && initialEmail) || email || ''}
          error={error_email || isEmailError(email)}
          onChangeText={(text) => this.setState({ email: text })}
          returnKeyType="next"
          onSubmitEditing={() => this._password.focus()}
        />
      
        <TextField
          ref={(ref) => this._password = ref}
          label="Password"
          value={password || ''}
          error={error_password}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          onSubmitEditing={this.onStartSignin}
          returnKeyType="go"
        />
      
        <TouchableOpacity
          onPress={this.onStartSignin}
          style={styles.button}>
          <Text style={styles.buttonTitle}>Signin</Text>
        </TouchableOpacity>
        
        <Text onPress={this.openSignup}>
          Daftar
        </Text>
        
      </View>
    )
  }
}

Signin.propTypes = {
  storeSession: func,
  oneSignalToken: string,
};

const mapStateToProps = createStructuredSelector({
  oneSignalToken: getOneSignalToken(),
});

const mapDispatchToProps = (dispatch) => ({
  storeSession: (user) => dispatch(SessionActions.storeSession(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);