import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { DotIndicator } from 'react-native-indicators';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import SessionActions from 'Redux/SessionRedux';
import { SIGNUP } from 'GraphQL/User/Mutation';
import { isEmailError, getGraphQLError, moderateScale } from 'Lib';
import {
  InputTextAccount,
  ButtonPrimary,
  BackButton,
  KeyboardFriendlyView
} from 'Components';
import { Header } from './Common';
import { Images } from 'Themes';
import styles from './Styles';
    
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
    password: null,
    error_password: null,
    password_repeat: null,
    error_password_repeat: null,
    loading: false,
  };
  
  onStartSignup = async () => {
    const { phone, error_phone, password, error_password, password_repeat, error_password_repeat } = this.state;
    await this.setState({ error_phone: null, error_password: null, error_password_repeat: null });
    let isValid = true;
    if (!phone) {
      await this.setState({ error_phone: 'Nomor HP harus diisi' });
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
    const { navigation } = this.props;
    navigation.navigate('SignupFarmerSecond');
  }
  
  render () {
    const {
      phone,
      error_phone,
      password,
      error_password,
      password_repeat,
      error_password_repeat,
      loading,
    } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <KeyboardFriendlyView style={styles.container}>
          
          <Header title="Pendaftaran akun baru" />
        
          <InputTextAccount
            refs={(ref) => this._phone = ref}
            label="Nomor HP"
            value={phone || ''}
            error={error_phone}
            onChangeText={(text) => this.setState({ phone: text })}
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
            onSubmitEditing={() => this._password_repeat.focus()}
            returnKeyType="next"
          />
        
          <InputTextAccount
            refs={(ref) => this._password_repeat = ref}
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
          
        </KeyboardFriendlyView>
      
        <ButtonPrimary
          onPress={this.onSignup}
          disabled={loading}
          loading={loading}
          title="Selanjutnya"
        />
      </View>
    )
  }
}

Farmer.propTypes = {
  storeSignupEmail: func,
};

const mapDispatchToProps = dispatch => ({
  storeSignupEmail: email => dispatch(SessionActions.storeSignupEmail(email)),
});

export default connect(null, mapDispatchToProps)(withNavigation(Farmer));