import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-material-textfield';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { SIGNUP } from 'GraphQL/User/Mutation';
import { isEmailError, getGraphQLError } from 'Lib';
import styles from './Styles'
    
export default class Signup extends Component {
  
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
    ApolloClientProvider.client.mutate({
      mutation: SIGNUP,
      variables: { email, password, name },
    })
    .then(data => {
      console.tron.log('signup success', data);
      const { data: response } = data;
      const { signup: { email } } = response;
      const { navigation } = this.props;
      navigation.navigate("Signin", { email });
    })
    .catch(error => {
      const message = getGraphQLError(error);
      if (message.toLowerCase().indexOf("email") >= 0) {
        this.setState({ error_email: message });
      }
    });
  }
  
  render () {
    const { name, error_name, email, error_email, password, error_password, password_repeat, error_password_repeat } = this.state;
    return (
      <View style={styles.container}>
      
        <TextField
          label="Name"
          value={name || ''}
          error={error_name}
          onChangeText={(text) => this.setState({ name: text })}
          returnKeyType="next"
          onSubmitEditing={() => this._email.focus()}
        />

        <TextField
          ref={(ref) => this._email = ref}
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
          onSubmitEditing={() => this._password_repeat.focus()}
          returnKeyType="next"
        />
      
        <TextField
          ref={(ref) => this._password_repeat = ref}
          label="Ulangi Password"
          value={password_repeat || ''}
          error={error_password_repeat}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password_repeat: text })}
          onSubmitEditing={this.onStartSignup}
          returnKeyType="go"
        />
      
        <TouchableOpacity
          onPress={this.onStartSignup}
          style={styles.button}>
          <Text style={styles.buttonTitle}>Daftar</Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}
