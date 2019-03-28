import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-material-textfield';

import { isEmailError } from 'Lib';
import styles from './Styles'
    
export default class Home extends Component {
  state = {
    email: null,
    error_email: null,
    password: null,
    error_password: null,
  };
  
  onStartSignin = () => {
    console.tron.log('loggedin')
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
          <Text>Signin</Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}
