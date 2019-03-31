import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-material-textfield';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { SIGNIN } from 'GraphQL/User/Mutation';
import { isEmailError, getGraphQLError } from 'Lib';
import styles from './Styles'
    
export default class Home extends Component {
  state = {
    email: null,
    error_email: null,
    password: null,
    error_password: null,
  };
  
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
  
  onSignin = () => {
    const { email, password } = this.state;
    ApolloClientProvider.client.mutate({
      mutation: SIGNIN,
      variables: { email, password },
    })
    .then(data => {
      console.tron.log('signin success', data);
    })
    .catch(error => {
      const message = getGraphQLError(error);
      if (message.toLowerCase().indexOf("email") >= 0) {
        this.setState({ error_email: message });
      } else if (message.toLowerCase().indexOf("password") >= 0) {
        this.setState({ error_password: message });
      }
    });
  }
  
  render () {
    const { email, error_email, password, error_password } = this.state;
    return (
      <View style={styles.container}>

        <TextField
          label="Email"
          value={email || ''}
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
        
      </View>
    )
  }
}
