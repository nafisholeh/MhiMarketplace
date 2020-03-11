import React, { Component } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { string, number, oneOfType } from "prop-types";

import { Images, METRICS } from "Themes";

class ToolbarButton extends Component {
  render() {
    const { navigation, onPress, icon, style } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Image source={icon} style={styles.image} />
      </TouchableOpacity>
    );
  }
}

ToolbarButton.propTypes = {
  icon: oneOfType([string, number])
};

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25
  }
});

export default ToolbarButton;
