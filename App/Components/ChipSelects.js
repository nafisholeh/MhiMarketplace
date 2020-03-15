import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { arrayOf, shape, string } from "prop-types";

import { METRICS, FONTS, Colors } from "Themes";

class ChipSelects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  onSelectionChange = (value, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { data } = this.props;
    const { selectedIndex } = this.state;
    if (!Array.isArray(data)) return null;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        {data.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === data.length - 1;
          const isSelected = selectedIndex === index;
          const { label, value, showManualInput } = item || {};
          return (
            <TouchableHighlight
              style={{
                flex: 1,
                borderTopLeftRadius: isFirst ? METRICS.RADIUS_MEDIUM : 0,
                borderBottomLeftRadius: isFirst ? METRICS.RADIUS_MEDIUM : 0,
                borderTopRightRadius: isLast ? METRICS.RADIUS_MEDIUM : 0,
                borderBottomRightRadius: isLast ? METRICS.RADIUS_MEDIUM : 0,
                borderWidth: METRICS.BORDER_MEDIUM,
                borderLeftWidth: isFirst ? METRICS.BORDER_MEDIUM : 0,
                borderColor: isSelected ? Colors.green_light : Colors.border,
                backgroundColor: isSelected ? Colors.green_light : Colors.white,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: METRICS.SMALL
              }}
              onPress={() => this.onSelectionChange(value, index)}
              underlayColor={Colors.green_light}
            >
              <Text
                style={{
                  ...FONTS.BODY_SMALL,
                  color: isSelected ? Colors.white : Colors.green_light
                }}
              >
                {label}
              </Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  }
}

ChipSelects.propTypes = {
  data: arrayOf(shape({ label: string, value: string }))
};

export default ChipSelects;
