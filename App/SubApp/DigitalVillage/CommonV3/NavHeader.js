import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { IMAGES, METRICS, FONTS } from 'themes-v3';
import { func, string } from 'prop-types';
import { moderateScale } from 'Lib';

class NavHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onGoBack = () => {
    const { onGoBack } = this.props;
    if (onGoBack) onGoBack();
  };

  render() {
    const { title, info } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={this.onGoBack} style={styles.button}>
            <Image source={IMAGES.BACK} style={styles.back} />
          </TouchableOpacity>
          {title ? <Text style={styles.title}>{title}</Text> : null}
        </View>
        {info ? (
          <View style={styles.rightSection}>
            <Text style={styles.rightText}>{info}</Text>
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
  title: {
    ...FONTS.SEMIBOLD_EXTRALARGE_BLACK,
  },
});

NavHeader.propTypes = {
  info: string,
  onGoBack: func.isRequired,
  title: string,
};

export default NavHeader;
