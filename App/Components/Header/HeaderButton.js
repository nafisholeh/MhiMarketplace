import React, { Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { func, number, string, oneOfType, bool } from "prop-types";
import { SkypeIndicator } from "react-native-indicators";

import { METRICS, Colors } from "Themes";
import { moderateScale } from "Lib";

class HeaderButton extends Component {
  render() {
    const { onPress, icon, loading } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}
        {...this.props}
      >
        {!loading && <Image source={icon} style={styles.icon} />}
        {loading && (
          <SkypeIndicator
            color={Colors.veggie_dark}
            count={5}
            size={moderateScale(20)}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: METRICS.SMALL
  },
  icon: {
    width: moderateScale(30),
    height: moderateScale(30)
  }
});

HeaderButton.propTypes = {
  onPress: func.isRequired,
  icon: oneOfType([number, string]).isRequired,
  loading: bool
};

export default HeaderButton;
