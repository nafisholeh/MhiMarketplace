import React, { PureComponent, Fragment } from 'react';
import { View, Image, Text } from 'react-native';

import { ButtonPrimary } from 'Components';
import { Images, Colors } from 'Themes';
import { moderateScale } from 'Lib';
import AreaDrawInfoWrapper from './AreaDrawInfoWrapper';

class AreaDrawInfo extends PureComponent {
  render() {
    const {
      isVisible,
      autoZoomIn
    } = this.props;
    if (!isVisible) return (<View />);
    return (
      <AreaDrawInfoWrapper>
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: moderateScale(15),
          }}
        >
          <Image
            source={Images.warning}
            style={{
              width: moderateScale(35),
              height: moderateScale(35),
              marginBottom: moderateScale(4),
            }}
          />
          <Text
            style={{
              fontFamily: 'CircularStd-Book',
              fontSize: 14,
              color: 'rgba(0,0,0,0.68)',
              textAlign: 'center',
            }}
          >
            posisi kamera peta kurang dekat
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <ButtonPrimary 
            onPress={() => autoZoomIn()}
            title="Zoom-in Otomatis"
            style={{
              height: 45,
              width: '100%'
            }}
          />
        </View>
      </AreaDrawInfoWrapper>
    )
  }
}

export default AreaDrawInfo;
