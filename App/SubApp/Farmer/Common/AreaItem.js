import React, { Component, Fragment } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

import { moderateScale, screenWidth } from 'Lib';
import { Fonts, Images, Colors } from 'Themes';
import { ProductHorizontalWrapper } from 'Components';

class AreaItem extends Component {
  render() {
    const {
      children,
      title,
      commodity,
      size,
      onDelete = () => {},
      onPress = () => {},
      style,
    } = this.props;
    return (
      <ProductHorizontalWrapper
        width={screenWidth - moderateScale(20)}
        height={moderateScale(100)}
        borderRadius={10}
        shadowRadiusAndroid={13}
        style={{
          marginBottom: moderateScale(5),
          marginBottom: moderateScale(10),
          marginHorizontal: moderateScale(10),
        }}
        styleChildren={{
          ...{
            flexDirection: 'row',
            alignItems: 'center',
          },
          ...style
        }}
        onPress={onPress}
      >
        {children
          ? children
          : (
            <Fragment>
              <MapView
                style={{
                  width: moderateScale(70),
                  height: moderateScale(70),
                  borderRadius: moderateScale(5),
                  marginRight: moderateScale(13),
                  marginLeft: moderateScale(15),
                }}
                liteMode
              />
              <View
                style={{
                  flex: 3,
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignSelf: 'stretch',
                  marginVertical: moderateScale(15),
                }}
              >
                <Text
                  style={{
                    ...Fonts.TITLE_NORMAL,
                  }}
                >
                  {title || '-'}
                </Text>
                <Text
                  style={{
                    ...Fonts.TITLE_BOLD,
                  }}
                >
                  {commodity || '-'}
                </Text>
                <Text
                  style={{
                    ...Fonts.TITLE_SMALL,
                  }}
                >
                  {size || '- ha'}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'stretch',
                  marginVertical: moderateScale(10),
                }}
                onPress={onDelete}
              >
                <Image
                  source={Images.delete_flat}
                  style={{
                    width: moderateScale(20),
                    height: moderateScale(30),
                    tintColor: Colors.disabled_light,
                  }}
                />
              </TouchableOpacity>
            </Fragment>
          )
        }
      </ProductHorizontalWrapper>
    );
  }
}

export default AreaItem;
