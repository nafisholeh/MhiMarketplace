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
  ButtonSecondary,
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
    nik: null,
    error_nik: null,
    name: null,
    error_name: null,
    birth_place: null,
    error_birth_place: null,
    birth_date: null,
    error_birth_date: null,
  };
  
  onStartSignup = async () => {
    this.onSignup();
  }
  
  onSignup = () => {
    
  }
  
  render () {
    const {
      nik,
      error_nik,
      name,
      error_name,
      birth_place,
      error_birth_place,
      birth_date,
      error_birth_date,
    } = this.state;
    const { navigation } = this.props;
    return (
      <KeyboardFriendlyView style={styles.container}>
        
        <Header title="Pendaftaran akun baru" />
      
        <InputTextAccount
          refs={(ref) => this._nik = ref}
          label="NIK"
          value={nik || ''}
          error={error_nik}
          onChangeText={(text) => this.setState({ nik: text })}
          onSubmitEditing={() => this._name.focus()}
          returnKeyType="next"
        />
        
        <InputTextAccount
          refs={(ref) => this._name = ref}
          label="Nama"
          value={name || ''}
          error={error_name}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ name: text })}
          onSubmitEditing={() => this._birth_place.focus()}
          returnKeyType="next"
        />
      
        <InputTextAccount
          refs={(ref) => this._name = ref}
          label="Tempat"
          value={name || ''}
          error={error_name}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ name: text })}
          onSubmitEditing={() => this._birth_place.focus()}
          returnKeyType="next"
        />
      
        <ButtonSecondary
          onPress={this.onStartSignup}
          disabled={loading}
          loading={loading}
          title="Selanjutnya"
        />
        
      </KeyboardFriendlyView>
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