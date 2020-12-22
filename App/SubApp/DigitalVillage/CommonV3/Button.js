import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { FONTS, METRICS, COLORS } from 'themes-v3';
import { any, string, func, number } from 'prop-types';

class Button extends PureComponent {
  onPress = () => {
    const { onPress } = this.props;
    if (onPress) onPress();
  };

  renderButton = () => {
    const { text, width } = this.props;
    const renderedButtonStyles = width
      ? { ...styles.button, ...{ width } }
      : styles.button;
    return (
      <TouchableOpacity onPress={this.onPress} style={renderedButtonStyles}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { TourHighlight } = this.props;
    if (TourHighlight) {
      return <TourHighlight>{this.renderButton()}</TourHighlight>;
    }
    return <>{this.renderButton()}</>;
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.BROWN_BG_PRIMARY,
    borderRadius: METRICS.LARGE,
    height: METRICS.EXTRA_HUGE,
    justifyContent: 'center',
    margin: METRICS.LARGE,
  },
  text: {
    ...FONTS.BOLD_LARGE_WHITE,
  },
});

Button.propTypes = {
  onPress: func.isRequired,
  text: string.isRequired,
  width: number,
  TourHighlight: any,
};

export default Button;
