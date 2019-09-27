import React, { Component } from 'react';
import { View } from 'react-native';

import { ButtonPrimary } from 'Components';
import { moderateScale } from 'Lib';
import { Metrics, Colors } from 'Themes';

class SignupBottomButton extends Component {
  render() {
    const {
      isShowSkip = true,
      onPressSkip,
      isShowNext = true,
      onPressNext,
      nextTitle
    } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          width: Metrics.deviceWidth,
          height: moderateScale(50),
        }}
      >
        {isShowSkip
          ? (
            <ButtonPrimary
              onPress={() => onPressSkip()}
              title="Lewati"
              colors={[ Colors.white, Colors.white ]}
              style={{
                width: isShowNext ? Metrics.deviceWidth / 2 : Metrics.deviceWidth,
                height: moderateScale(50),
                borderTopColor: Colors.disabled_light,
                borderTopWidth: 0.5,
              }}
              styleTitle={{
                fontFamily: 'CircularStd-Book',
                color: Colors.disabled_dark,
              }}
            />
          ) 
          : null
        }
        {isShowNext
          ? (
            <ButtonPrimary
              onPress={() => onPressNext()}
              title={nextTitle || "Lanjut"}
              style={{
                width: isShowSkip ? Metrics.deviceWidth / 2 : Metrics.deviceWidth,
                height: moderateScale(50),
                borderTopColor: Colors.veggie_dark,
                borderTopWidth: 0.5,
              }}
            />
          )
          : null
        }
      </View>
    );
  }
}

export default SignupBottomButton;
