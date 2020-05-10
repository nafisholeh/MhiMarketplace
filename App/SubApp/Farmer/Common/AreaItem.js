import React, { Component, Fragment } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import isEqual from "lodash/isEqual";

import { MINI_MAP_STYLE, MINI_MAP_EDGE_PADDING } from "Config/AppConfig";
import {
  moderateScale,
  screenWidth,
  normalizeAreaSize,
  capitalizeFirstLetter,
} from "Lib";
import { FONTS, METRICS, Colors } from "Themes";
import { ProductHorizontalWrapper } from "Components";

class AreaItem extends Component {
  state = {
    sizeInUnit: "-",
    commodity: null,
  };

  componentDidMount() {
    this.convertSize();
    this.parseCommodity();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.size !== this.props.size) {
      this.convertSize();
    }
    if (!isEqual(prevProps.commodity, this.props.commodity)) {
      this.parseCommodity();
    }
  }

  convertSize = () => {
    const { size } = this.props;
    if (!size) return;
    this.setState({
      sizeInUnit: normalizeAreaSize(size, "m2", "ha") || "",
    });
  };

  parseCommodity = () => {
    const { commodity } = this.props;
    const { value } = commodity || {};
    this.setState({ commodity: value });
  };

  onMapReady = () => {
    const { polygon } = this.props;
    const options = {
      edgePadding: METRICS.MINI_MAP_EDGE_PADDING,
      animated: false,
    };
    if (Array.isArray(polygon) && polygon.length > 0) {
      this.map.fitToCoordinates(polygon, options);
    }
  };

  render() {
    const {
      children,
      polygon,
      onPress = () => {},
      style,
      styleChildren,
      shadowRadius,
    } = this.props;
    const { sizeInUnit, commodity } = this.state;
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
                {polygon ? (
                  <Polygon
                    coordinates={polygon}
                    strokeColor={Colors.MAP_AREA_BORDER}
                    fillColor={Colors.MAP_AREA}
                    strokeWidth={METRICS.AREA_STROKE_WIDTH}
                  />
                ) : null}
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
                {capitalizeFirstLetter(commodity) || "n/a"}
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
