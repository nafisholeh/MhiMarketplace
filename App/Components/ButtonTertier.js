import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { DotIndicator } from "react-native-indicators";

import { screenWidth } from "Lib";
import { Colors, FONTS, METRICS } from "Themes";

const ButtonTertier = ({
  style,
  onPress,
  loading,
  disabled,
  title,
  colors,
  width,
  fonts,
}) => (
  <TouchableOpacity
    onPress={() => onPress()}
    disabled={disabled}
    style={{
      ...{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: width,
        backgroundColor: colors || Colors.white,
        borderRadius: METRICS.BUTTON_TERTIER_RADIUS,
        borderWidth: 2.5,
        borderColor: Colors.BUTTON_TERTIER,
        paddingVertical: METRICS.SMALL,
      },
      ...style,
    }}
  >
    {loading && (
      <DotIndicator count={4} size={7} color="white" animationDuration={800} />
    )}
    {!loading && <Text style={fonts || FONTS.BODY_BOLD}>{title}</Text>}
  </TouchableOpacity>
);

export default ButtonTertier;