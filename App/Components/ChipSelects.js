import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { arrayOf, shape, string } from "prop-types";

import { METRICS, FONTS, Colors } from "Themes";

class ChipSelects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  onSelectionChange = (item, index) => {
    const { onSelectionChange, name } = this.props;
    this.setState({ selectedIndex: index });
    onSelectionChange(item, name);
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
          alignItems: "center",
        }}
      >
        {data.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === data.length - 1;
          const isSelected = selectedIndex === index;
          const { label } = item || {};
          return (
            <TouchableHighlight
              style={{
                flex: 1,
                height: METRICS.HEIGHT_SMALL,
                borderTopLeftRadius: isFirst ? METRICS.RADIUS_MEDIUM : 0,
                borderBottomLeftRadius: isFirst ? METRICS.RADIUS_MEDIUM : 0,
                borderTopRightRadius: isLast ? METRICS.RADIUS_MEDIUM : 0,
                borderBottomRightRadius: isLast ? METRICS.RADIUS_MEDIUM : 0,
                borderWidth: METRICS.BORDER_THIN,
                borderLeftWidth: isFirst ? METRICS.BORDER_THIN : 0,
                borderColor: isSelected
                  ? Colors.GREEN_BG_PRIMARY
                  : Colors.GRAY_BG_DISABLED,
                backgroundColor: isSelected
                  ? Colors.GREEN_BG_PRIMARY
                  : Colors.GRAY_BG_DISABLED,
                alignItems: "center",
                justifyContent: "center",
                // paddingVertical: METRICS.SMALL,
              }}
              onPress={() => this.onSelectionChange(item, index)}
              underlayColor={Colors.GREEN_BG_PRIMARY}
            >
              <Text
                style={{
                  ...FONTS.RADIO_BUTTON_TEXT,
                  color: isSelected
                    ? Colors.WHITE
                    : Colors.BLACK_TEXT_SECONDARY,
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
  data: arrayOf(shape({ label: string, value: string })),
};

export default ChipSelects;
