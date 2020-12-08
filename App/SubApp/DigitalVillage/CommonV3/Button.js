import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { FONTS, METRICS, COLORS } from 'themes-v3';
import { string, func } from 'prop-types';

class Button extends PureComponent {
  onPress = () => {
    const { onPress } = this.props;
    if (onPress) onPress();
  };

  render() {
    const { text } = this.props;
    return (
      <TouchableOpacity onPress={this.onPress} style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.BROWN_BG_PRIMARY,
    borderRadius: METRICS.LARGE,
    height: METRICS.EXTRA_HUGE,
    justifyContent: 'center',
    marginBottom: METRICS.LARGE,
    marginHorizontal: METRICS.LARGE,
  },
  text: {
    ...FONTS.BOLD_LARGE_WHITE,
  },
});

Button.propTypes = {
  onPress: func.isRequired,
  text: string.isRequired,
};

export default Button;
