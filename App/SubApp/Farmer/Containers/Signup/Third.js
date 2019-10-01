import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { DotIndicator } from 'react-native-indicators';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import SessionActions from 'Redux/SessionRedux';
import ListActions from 'Redux/ListRedux';
import { SIGNUP } from 'GraphQL/User/Mutation';
import { isEmailError, getGraphQLError, moderateScale } from 'Lib';
import {
  ProductVerticalWrapper,
  InputTextAccount,
  ButtonPrimary,
  BackButton,
  KeyboardFriendlyView
} from 'Components';
import { Header, AreaDrawItem, AreaDrawListHeader } from 'CommonFarmer';
import { Images } from 'Themes';
    
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
  
  onOpenDrawer = title => {
    const { navigation, selectListItem } = this.props;
    selectListItem(title);
    navigation.navigate('AreaDraw');
  };
  
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
        <KeyboardFriendlyView style={{ flex: 1, marginHorizontal: moderateScale(10) }}>
          
          <Header title="Pendaftaran akun baru" />
          
          <AreaDrawListHeader title="Sawah" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <AreaDrawItem
              title="Dimiliki"
              onPress={() => this.onOpenDrawer('Lahan sawah dimiliki')}
              isFilled
            />
            <AreaDrawItem
              title="Disewa"
              onPress={() => this.onOpenDrawer('Lahan sawah disewa')}
            />
          </View>
          
          <AreaDrawListHeader title="Tegal" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: moderateScale(40),
            }}
          >
            <AreaDrawItem
              title="Dimiliki"
              onPress={() => this.onOpenDrawer('Lahan tegal dimiliki')}
              isFilled
            />
            <AreaDrawItem
              title="Disewa"
              onPress={() => this.onOpenDrawer('Lahan tegal disewa')}
            />
          </View>

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
  selectListItem: func,
};

const mapDispatchToProps = dispatch => ({
  storeSignupEmail: email => dispatch(SessionActions.storeSignupEmail(email)),
  selectListItem: selectedId => dispatch(ListActions.selectListItem(selectedId)),
});

export default connect(null, mapDispatchToProps)(withNavigation(Farmer));