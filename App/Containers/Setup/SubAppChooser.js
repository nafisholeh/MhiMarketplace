import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { moderateScale } from 'Lib';
import { Colors, Images } from 'Themes';
import AppConfig from 'Config/AppConfig';
import { Option, Header } from './Common';
import SessionActions from 'Redux/SessionRedux';

class SubAppChooser extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }

  render() {
    const { navigation, storeSubAppSession } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Pilih aplikasi..."
          isHideBackButton
        />
        
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Option
            onPress={() => {
              storeSubAppSession(AppConfig.userType.FARMER);
              navigation.navigate('FarmerNav');
            }}
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
            isInDevelopment
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
            isInDevelopment
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

const mapDispatchToProps = (dispatch) => ({
  storeSubAppSession: subAppSession => dispatch(SessionActions.storeSubAppSession(subAppSession)),
});

export default connect(null, mapDispatchToProps)(SubAppChooser);
