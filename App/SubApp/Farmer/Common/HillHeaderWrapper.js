import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';

import { moderateScale } from 'Lib';
import { Images, Colors, Metrics } from 'Themes';

const CIRCLE_WIDTH = Metrics.deviceWidth * 2;
const CIRCLE_RADIUS = Metrics.deviceWidth;

class HillHeaderWrapper extends Component {
  render() {
    const { children, title, navigation, contentContainerStyle } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.veggie_light
        }}
      >
        <View 
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: moderateScale(55),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ 
              width: moderateScale(23), height: moderateScale(23),
              justifyContent: 'center', alignItems: 'center',
              marginLeft: moderateScale(30),
            }}>
            <Image
              source={Images.back}
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                tintColor: 'white'
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              position: 'absolute',
              left: '43%',
              fontFamily: 'CircularStd-Bold',
              fontSize: 16,
              color: Colors.white,
            }}
          >
            {title || 'Details'}
          </Text>
        </View>
        <View 
          style={{
            position: 'absolute',
            alignSelf: 'center',
            width: CIRCLE_WIDTH,
            height: Metrics.deviceHeight,
            marginTop: moderateScale(70),
            borderTopLeftRadius: CIRCLE_RADIUS,
            borderTopRightRadius: CIRCLE_RADIUS,
            backgroundColor: 'white',
          }}
        />
        <ScrollView
          contentContainerStyle={contentContainerStyle}
        >
          {children}
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(HillHeaderWrapper);
