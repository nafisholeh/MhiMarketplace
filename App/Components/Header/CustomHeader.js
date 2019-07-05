import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import { moderateScale } from 'Lib';
import { Images, Colors } from 'Themes';

class CustomHeader extends Component {
  render() {
    const { title, navigation } = this.props;
    return (
      <Fragment>
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
            width: 900, height: 900,
            marginTop: moderateScale(80),
            borderRadius: 450,
            backgroundColor: 'white',
          }}
        />
      </Fragment>
    );
  }
}

export default withNavigation(CustomHeader);
