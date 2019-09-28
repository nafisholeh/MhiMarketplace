import React, { Component } from 'react';
import { ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import * as Progress from 'react-native-progress';
import { DotIndicator } from 'react-native-indicators';
import { withNavigation } from 'react-navigation';

import { Images, Colors, Fonts } from 'Themes';
import { moderateScale, screenWidth, screenHeight } from 'Lib';

class FinalConfirm extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }
  
  openFarmerSubApp = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          position: 'relative',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            position: 'absolute',
            top: '10%',
            marginHorizontal: moderateScale(30),
            textAlign: 'center',
            lineHeight: 30,
            ...Fonts.TITLE_HEADER__BOLD,
            color: Colors.veggie_dark,
          }}
        >
          Tekan logo untuk bergabung dengan keluarga besar MHI...
        </Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: '25%',
            width: moderateScale(screenWidth * 0.8),
            height: moderateScale(screenHeight * 0.5),
            borderRadius: moderateScale(screenWidth * 0.4),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={this.openFarmerSubApp}
        >
          <Image
            source={Images.mhi}
            style={{
              width: moderateScale(screenWidth * 0.7),
              height: moderateScale(screenHeight * 0.4),
            }}
          />
          <Progress.Circle
            size={moderateScale(screenWidth * 0.8)}
            thickness={7}
            showsText={false}
            progress={0.6}
            strokeCap='square'
            color={Colors.veggie_dark}
            textStyle={Fonts.TITLE_HEADER__NORMAL}
            style={{
              position: 'absolute',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
        <DotIndicator
          count={4}
          size={7}
          color={Colors.veggie_dark}
          animationDuration={800}
          style={{
            position: 'absolute',
            bottom: '8%',
          }}
        />
      </ScrollView>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(FinalConfirm));
