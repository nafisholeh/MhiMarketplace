import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { IMAGES, METRICS, FONTS } from 'themes-v3';
import { func, string, oneOf } from 'prop-types';
import { moderateScale } from 'Lib';

class NavHeader extends PureComponent {
  onGoBack = () => {
    const { onGoBack } = this.props;
    if (onGoBack) onGoBack();
  };

  render() {
    const { title, info, mode } = this.props;
    const renderedTitleStyle =
      mode === 'invert' ? styles.titleInverted : styles.title;
    const renderedRightTextStyle =
      mode === 'invert' ? styles.rightTextInverted : styles.rightText;
    return (
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={this.onGoBack} style={styles.button}>
            <Image source={IMAGES.BACK} style={styles.back} />
          </TouchableOpacity>
          {title ? <Text style={renderedTitleStyle}>{title}</Text> : null}
        </View>
        {info ? (
          <View style={styles.rightSection}>
            <Text style={renderedRightTextStyle}>{info}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    height: moderateScale(26),
    width: moderateScale(26),
  },
  button: { paddingRight: METRICS.MEDIUM },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: METRICS.LARGE,
  },
  leftSection: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightSection: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightText: {
    ...FONTS.REGULAR_EXTRALARGE_BLACK_TERTIERY,
  },
  rightTextInverted: {
    ...FONTS.REGULAR_EXTRALARGE_WHITE,
  },
  title: {
    ...FONTS.SEMIBOLD_EXTRALARGE_BLACK,
  },
  titleInverted: {
    ...FONTS.SEMIBOLD_EXTRALARGE_WHITE,
  },
});

NavHeader.propTypes = {
  onGoBack: func.isRequired,
  mode: oneOf(['normal', 'invert']),
  info: string,
  title: string,
};

NavHeader.defaultProps = {
  mode: 'normal',
};

export default NavHeader;
