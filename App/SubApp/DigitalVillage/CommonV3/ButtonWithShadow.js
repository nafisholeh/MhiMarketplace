import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { FONTS, METRICS, COLORS } from 'themes-v3';
import { string, func, number } from 'prop-types';
import { ViewShadow } from 'Components';
import { screenWidth } from 'Lib';

class ButtonWithShadow extends PureComponent {
  onPress = () => {
    const { onPress } = this.props;
    if (onPress) onPress();
  };

  render() {
    const { text, width, containerPadding } = this.props;
    const renderedWidth = width || screenWidth - containerPadding * 2;
    return (
      <ViewShadow
        width={renderedWidth}
        height={METRICS.EXTRA_HUGE}
        borderRadius={METRICS.RADIUS_LARGE}
        shadowBorderRadiusAndroid={METRICS.RADIUS_LARGE}
        shadowRadiusAndroid={4.9}
        shadowOpacityAndroid={0.05}
        posYAndroid={2.2}
        mainColor={COLORS.WHITE}
        shadowColor={COLORS.DROP_SHADOW}
        style={styles.shadowContainer}
        styleChildren={styles.shadowContentWrapper}
      >
        <TouchableOpacity onPress={this.onPress} style={styles.button}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </ViewShadow>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowContainer: { margin: METRICS.LARGE },
  shadowContentWrapper: { justifyContent: 'center' },
  text: {
    ...FONTS.REGULAR_LARGE_BLACK_TERTIERY,
  },
});

ButtonWithShadow.propTypes = {
  onPress: func.isRequired,
  text: string.isRequired,
  width: number,
  containerPadding: number,
};

ButtonWithShadow.defaultProps = {
  containerPadding: 0,
};

export default ButtonWithShadow;
