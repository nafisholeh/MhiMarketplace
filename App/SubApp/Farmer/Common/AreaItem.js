import React, { Component, Fragment } from "react";
import { Text, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";

import AppConfig from "Config/AppConfig";
import { moderateScale, screenWidth, normalizeAreaSize } from "Lib";
import { FONTS, Colors } from "Themes";
import { ProductHorizontalWrapper } from "Components";

const EDGE_PADDING = {
  top: 1000,
  right: 0,
  bottom: 1000,
  left: screenWidth - moderateScale(20),
};

class AreaItem extends Component {
  state = {
    sizeInUnit: "-",
  };

  componentDidMount() {
    this.convertSize();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.size !== this.props.size) {
      this.convertSize();
    }
  }

  convertSize = () => {
    const { size } = this.props;
    if (!size) return;
    this.setState({
      sizeInUnit: normalizeAreaSize(size, "m2", "ha") || "",
    });
  };

  onMapReady = () => {
    const { polygon } = this.props;
    const options = {
      edgePadding: EDGE_PADDING,
      animated: false,
    };
    if (Array.isArray(polygon)) {
      this.map.fitToCoordinates(polygon, options);
    }
  };

  render() {
    const {
      children,
      title,
      commodity,
      polygon,
      onPress = () => {},
      style,
    } = this.props;
    const { sizeInUnit } = this.state;
    return (
      <ProductHorizontalWrapper
        width={screenWidth - moderateScale(70)}
        height={moderateScale(110)}
        borderRadius={8}
        shadowRadiusAndroid={8}
        style={{
          marginTop: moderateScale(10),
          marginBottom: moderateScale(10),
          marginHorizontal: moderateScale(10),
        }}
        styleChildren={{
          ...{
            flexDirection: "row",
            alignItems: "center",
          },
          ...style,
        }}
        onPress={onPress}
      >
        {children ? (
          children
        ) : (
          <Fragment>
            <MapView
              ref={(map) => {
                this.map = map;
              }}
              onMapReady={() => setTimeout(() => this.onMapReady())}
              style={{
                marginLeft: screenWidth * 0.25,
                width: screenWidth - moderateScale(screenWidth * 0.35),
                height: moderateScale(85),
              }}
              customMapStyle={AppConfig.mapStyle}
              liteMode
            >
              <Polygon
                coordinates={polygon}
                strokeColor={Colors.polygon_fill_dark}
                strokeWidth={5}
              />
            </MapView>
            <View
              style={{
                height: moderateScale(85),
                width: screenWidth / 2 + moderateScale(20),
                position: "absolute",
                left: 0,
                flexDirection: "column",
                justifyContent: "space-around",
                backgroundColor: "white",
                marginVertical: moderateScale(10),
                paddingLeft: moderateScale(20),
                paddingVertical: moderateScale(15),
              }}
            >
              <Text
                style={{
                  ...FONTS.BODY_SMALL,
                }}
              >
                {title || "-"}
              </Text>
              <Text
                style={{
                  ...FONTS.BODY_BOLD,
                }}
              >
                {commodity || "-"}
              </Text>
              <Text
                style={{
                  ...FONTS.BODY_NORMAL,
                }}
              >
                {sizeInUnit || "-"}
              </Text>
            </View>
          </Fragment>
        )}
      </ProductHorizontalWrapper>
    );
  }
}

export default AreaItem;
