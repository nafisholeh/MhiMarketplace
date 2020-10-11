import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { DotIndicator } from "react-native-indicators";

import { Colors, FONTS, METRICS } from "Themes";

const ButtonTertier = ({
  style,
  onPress,
  loading,
  disabled,
  title,
  width,
  fonts,
  isAccentButton,
}) => {
  let bgColor = isAccentButton ? Colors.WHITE : Colors.GREEN_BG_PRIMARY;
  bgColor = disabled ? Colors.GRAY_ICON : bgColor;
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      disabled={disabled}
      style={{
        ...{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: METRICS.HEIGHT_MEDIUM,
          width: width,
          backgroundColor: bgColor,
          borderRadius: METRICS.MEDIUM_V2,
        },
        ...style,
      }}
    >
      {loading && (
        <DotIndicator
          count={4}
          size={7}
          color="white"
          animationDuration={800}
        />
      )}
      {!loading && (
        <Text
          style={{
            ...FONTS.BUTTON_TITLE,
            ...{ color: isAccentButton ? Colors.BLACK_TEXT : Colors.WHITE },
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonTertier;
