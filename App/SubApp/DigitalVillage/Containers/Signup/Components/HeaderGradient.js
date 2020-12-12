import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { moderateScale, screenWidth } from 'Lib';
import { COLORS, METRICS } from 'themes-v3';

class HeaderGradient extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[COLORS.BROWN_GRADIENT_START, COLORS.BROWN_GRADIENT_END]}
        style={styles.container}
      >
        <View style={{ height: moderateScale(350) }} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: METRICS.RADIUS_LARGE,
    borderBottomRightRadius: METRICS.RADIUS_LARGE,
    height: moderateScale(350),
    position: 'absolute',
    top: 0,
    width: screenWidth,
  },
});

export default HeaderGradient;
