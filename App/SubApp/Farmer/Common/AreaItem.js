import React, { Component, Fragment } from "react";
import { Text, View, StyleSheet, PixelRatio } from "react-native";
import MapView, { Polygon, MAP_TYPES } from "react-native-maps";
import ViewOverflow from "react-native-view-overflow";

import { MINI_MAP_STYLE, MINI_MAP_EDGE_PADDING } from "Config/AppConfig";
import { moderateScale, screenWidth, normalizeAreaSize } from "Lib";
import { FONTS, METRICS, Colors } from "Themes";
import { ProductHorizontalWrapper } from "Components";

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
      edgePadding: METRICS.MINI_MAP_EDGE_PADDING,
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
      styleChildren,
      shadowRadius,
    } = this.props;
    const { sizeInUnit } = this.state;
    return (
      <ProductHorizontalWrapper
        width={screenWidth - METRICS.EXTRA_HUGE}
        height={METRICS.MINI_MAP_HEIGHT}
        borderRadius={METRICS.AREA_ITEM_RADIUS}
        shadowRadiusAndroid={METRICS.AREA_ITEM_SHADOW_RADIUS || shadowRadius}
        style={{
          ...{
            marginTop: METRICS.TINY,
            marginBottom: METRICS.TINY,
            marginHorizontal: METRICS.SMALL,
          },
          ...style,
        }}
        styleChildren={{
          ...{
            flexDirection: "row",
            alignItems: "center",
          },
          ...styleChildren,
        }}
        onPress={onPress}
      >
        {children ? (
          children
        ) : (
          <Fragment>
            <View
              style={{
                width: METRICS.MINI_MAP_WIDTH,
                height: METRICS.MINI_MAP_HEIGHT,
                borderTopLeftRadius: METRICS.AREA_ITEM_RADIUS,
                borderBottomLeftRadius: METRICS.AREA_ITEM_RADIUS,
                overflow: "hidden",
              }}
            >
              <MapView
                ref={(map) => {
                  this.map = map;
                }}
                onMapReady={() => setTimeout(() => this.onMapReady())}
                style={StyleSheet.absoluteFillObject}
                mapType="terrain"
                customMapStyle={MINI_MAP_STYLE}
                liteMode
              >
                <Polygon
                  coordinates={polygon}
                  strokeColor={Colors.MAP_AREA_BORDER}
                  fillColor={Colors.MAP_AREA}
                  strokeWidth={METRICS.AREA_STROKE_WIDTH}
                />
              </MapView>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
                backgroundColor: "white",
                marginVertical: moderateScale(10),
                paddingLeft: moderateScale(20),
                paddingVertical: moderateScale(15),
              }}
            >
              <Text
                style={[
                  FONTS.BODY_BOLD,
                  !commodity ? { color: Colors.disabled_light } : {},
                  { marginBottom: METRICS.TINY },
                ]}
              >
                {commodity || "n/a"}
              </Text>
              <Text
                style={{
                  ...FONTS.BODY_NORMAL,
                }}
              >
                {sizeInUnit || "n/a"}
              </Text>
            </View>
          </Fragment>
        )}
      </ProductHorizontalWrapper>
    );
  }
}

export default AreaItem;
