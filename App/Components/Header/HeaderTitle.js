import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { string, bool } from 'prop-types';

import { moderateScale } from 'Lib';
import { Colors } from 'Themes';
import BackButton from './BackButton';

class HeaderTitle extends Component {
  render() {
    const { title, isEnableBack } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: moderateScale(15),
          paddingVertical: moderateScale(15),
          backgroundColor: Colors.white,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
        }}
      >
        {isEnableBack && <BackButton />}
        <Text
          style={{
            fontFamily: 'CircularStd-Bold',
            fontSize: 16,
            color: 'rgba(0,0,0,0.8)',
          }}
        >
          {title}
        </Text>
      </View>
    );
  }
}

HeaderTitle.propTypes = {
  title: string,
  isEnableBack: bool,
};

export default HeaderTitle;
