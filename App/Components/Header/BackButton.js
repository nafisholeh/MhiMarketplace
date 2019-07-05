import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Images } from 'Themes';
import { moderateScale } from 'Lib';

class BackButton extends Component {
  render() {
    const { navigation, color } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={Images.back}
          style={{
            width: moderateScale(20),
            height: moderateScale(20),
            tintColor: color || 'rgba(0,0,0,0.68)',
            marginRight: moderateScale(15),
          }}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(BackButton);
