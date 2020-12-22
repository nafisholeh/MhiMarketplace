import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import { FONTS, METRICS, COLORS } from 'themes-v3';
import { string, func, number, any } from 'prop-types';
import { moderateScale } from 'Lib';

class ButtonWithIcon extends PureComponent {
  onPress = () => {
    const { onPress } = this.props;
    if (onPress) onPress();
  };

  renderButton = () => {
    const { text, width, icon } = this.props;
    const renderedButtonStyles = width
      ? { ...styles.button, ...{ width } }
      : styles.button;
    return (
      <TouchableOpacity onPress={this.onPress} style={renderedButtonStyles}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
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
    height: moderateScale(70),
    justifyContent: 'center',
    margin: METRICS.LARGE,
  },
  icon: {
    height: METRICS.LARGE,
    marginBottom: METRICS.TINY,
  },
  text: {
    ...FONTS.SEMIBOLD_SMALL_WHITE,
  },
});

ButtonWithIcon.propTypes = {
  onPress: func.isRequired,
  text: string.isRequired,
  icon: any.isRequired,
  width: number,
  TourHighlight: any,
};

export default ButtonWithIcon;
