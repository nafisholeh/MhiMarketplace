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
  ProductVerticalWrapper,
  InputTextAccount,
  ButtonPrimary,
  BackButton,
  KeyboardFriendlyView
} from 'Components';
import { Header, AreaDrawItem, AreaDrawListHeader } from './Common';
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
      <View style={{ flex: 1 }}>
        <KeyboardFriendlyView style={styles.container}>
          
          <Header title="Pendaftaran akun baru" />
          
          <AreaDrawListHeader title="Sawah" />
          <AreaDrawItem inputLabel="Luas dimiliki:"/>
          <AreaDrawItem inputLabel="Luas disewa:"/>
          
          <AreaDrawListHeader title="Tegal" />
          <AreaDrawItem inputLabel="Luas dimiliki:"/>
          <AreaDrawItem inputLabel="Luas disewa:"/>
          
        </KeyboardFriendlyView>
        
        <ButtonPrimary
          onPress={this.onStartSignup}
          title="Selesai"
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