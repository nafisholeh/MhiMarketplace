import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { moderateScale } from 'Lib';
import { Colors, Images } from 'Themes';
import { Option, Header } from './Common';

class Signup extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header title="Saya ingin mendaftar sebagai..." />
        
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Option
            onPress={() => navigation.navigate('SignupFarmer')}
            color={Colors.veggie_light}
            title="Petani"
            icon={Images.farmer}
            styleWrapper={{
              marginHorizontal: moderateScale(20),
              marginVertical: moderateScale(15),
            }}
          />
          <Option
            onPress={() => navigation.navigate('SignupScholar')}
            color={Colors.horti_light}
            title="Akademisi"
            icon={Images.scholar}
            styleWrapper={{
              marginHorizontal: moderateScale(20),
              marginBottom: moderateScale(15),
            }}
          />
          <Option
            onPress={() => navigation.navigate('SignupCustomer')}
            color={Colors.fruit_light}
            title="Pelanggan"
            icon={Images.customer}
            styleWrapper={{
              marginHorizontal: moderateScale(20),
              marginBottom: moderateScale(15),
            }}
          />
        </View>
      </View>
    );
  }
}

export default connect(null, null)(Signup);
