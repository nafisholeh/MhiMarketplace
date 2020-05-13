import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import isEqual from "lodash/isEqual";

import { moderateScale, normalizeAreaSize, capitalizeFirstLetter } from "Lib";
import { FONTS, METRICS, Colors } from "Themes";

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

  render() {
    const { snapshot, onPress = () => {}, style } = this.props;
    const { sizeInUnit, commodity } = this.state;
    return (
      <TouchableOpacity
        style={{
          ...{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: METRICS.SMALL,
            height: METRICS.AREA_ITEM_HEIGHT,
            borderColor: Colors.BORDER,
            borderWidth: METRICS.BORDER_THIN,
          },
          ...style,
        }}
        onPress={onPress}
      >
        <View
          style={{
            width: METRICS.MINI_MAP_WIDTH,
            height: METRICS.MINI_MAP_HEIGHT,
            borderRadius: METRICS.AREA_ITEM_RADIUS,
            marginLeft: METRICS.MEDIUM,
            overflow: "hidden",
            elevation: 4,
          }}
        >
          <Image
            source={{ uri: snapshot }}
            style={{
              width: METRICS.MINI_MAP_WIDTH,
              height: METRICS.MINI_MAP_HEIGHT,
              resizeMode: "cover",
            }}
          />
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
              FONTS.HEADER_SMALL,
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
      </TouchableOpacity>
    );
  }
}

export default AreaItem;
