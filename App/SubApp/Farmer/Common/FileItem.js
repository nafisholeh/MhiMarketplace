import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { string } from "prop-types";
import LinearGradient from "react-native-linear-gradient";

import { ProductHorizontalWrapper, ImageRadius } from "Components";
import { moderateScale, screenWidth } from "Lib";
import { Colors, FONTS } from "Themes";

const BORDER_RADIUS = 8;

class FileItem extends Component {
  onPress = () => {
    const { onPress, onPressParam } = this.props;
    if (onPress) {
      onPress(onPressParam);
    }
  };

  render() {
    const { title, desc, thumbnail, bigThumbnail, onPress } = this.props;
    const width = screenWidth / 2 - moderateScale(30);
    return (
      <ProductHorizontalWrapper
        styleChildren={{
          alignItems: "center",
          position: "relative"
        }}
        style={{
          alignSelf: "center"
        }}
        width={width}
        height={moderateScale(150)}
        borderRadius={BORDER_RADIUS}
        onPress={this.onPress}
      >
        {bigThumbnail ? (
          <ImageRadius
            source={{ uri: thumbnail }}
            width={width}
            height={moderateScale(150)}
            resizeMode="cover"
            resizeMethod="resize"
            borderTopLeftRadius={BORDER_RADIUS}
            borderTopRightRadius={BORDER_RADIUS}
            borderBottomLeftRadius={BORDER_RADIUS}
            borderBottomRightRadius={BORDER_RADIUS}
          />
        ) : (
          <ImageRadius
            source={{ uri: thumbnail }}
            style={{
              width: moderateScale(40),
              height: moderateScale(40),
              marginTop: moderateScale(40),
              alignSelf: "center"
            }}
          />
        )}
        <LinearGradient
          colors={
            bigThumbnail
              ? ["#ffffff00", Colors.icon]
              : ["#ffffff00", "#ffffff00"]
          }
          start={{ x: 0.5, y: 0.58 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: moderateScale(150),
            flexDirection: "column",
            justifyContent: "flex-end",
            borderBottomLeftRadius: BORDER_RADIUS,
            borderBottomRightRadius: BORDER_RADIUS
          }}
        >
          <Text
            style={Object.assign(
              {},
              bigThumbnail
                ? {
                    textAlign: "left",
                    flexWrap: "wrap",
                    marginHorizontal: moderateScale(10),
                    marginBottom: moderateScale(8),
                    ...FONTS.HEADER_SMALL,
                    color: Colors.white
                  }
                : {
                    textAlign: "center",
                    flexWrap: "wrap",
                    marginHorizontal: moderateScale(10),
                    marginBottom: moderateScale(13),
                    ...FONTS.HEADER_SMALL
                  }
            )}
            numberOfLines={2}
          >
            {title}
          </Text>
        </LinearGradient>
      </ProductHorizontalWrapper>
    );
  }
}

export default FileItem;
