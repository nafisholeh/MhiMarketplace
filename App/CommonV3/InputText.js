import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { object, func, string, oneOf } from 'prop-types';

import { FONTS, METRICS, COLORS } from 'themes-v3';

const NORMAL = 'normal';
const INVERSE = 'inverse';
const MINIMAL = 'minimal';
const MODE = {
  NORMAL,
  INVERSE,
  MINIMAL,
};

export default class InputText extends Component {
  renderContent = () => {
    const { refs, name, onChangeText } = this.props;
    return (
      <TextInput
        ref={refs ? refs : (ref) => (this._input = ref)}
        style={styles.normalContent}
        underlineColorAndroid="transparent"
        {...this.props}
        onChangeText={(text) => onChangeText(text, name)}
      />
    );
  };

  renderBorderAndContent = () => {
    const { mode, error } = this.props;
    switch (mode) {
      case MODE.NORMAL:
      default:
        const containerStyles = error
          ? styles.normalErrorContainer
          : styles.normalContainer;
        return <View style={containerStyles}>{this.renderContent()}</View>;
    }
  };

  render() {
    const { title, error } = this.props;
    return (
      <View style={styles.container}>
        {title ? <Text style={styles.title}>{title}</Text> : <View />}
        {this.renderBorderAndContent()}
        {error ? <Text style={styles.errorContainer}>{error}</Text> : <View />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    ...FONTS.INPUT_ERROR,
    bottom: -15,
    left: 0,
    position: 'absolute',
  },
  normalContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BROWN_BG_PRIMARY,
    borderRadius: METRICS.RADIUS_NORMAL,
    borderWidth: METRICS.ONE,
    flexDirection: 'row',
    height: METRICS.HUGE,
    paddingLeft: 0,
  },
  normalContent: {
    ...FONTS.INPUT_VALUE,
    ...{ flex: 1, paddingLeft: METRICS.LARGE },
  },
  normalErrorContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.ERROR,
    borderRadius: METRICS.RADIUS_NORMAL,
    borderWidth: METRICS.ONE,
    flexDirection: 'row',
    height: METRICS.HUGE,
    paddingLeft: 0,
  },
  title: {
    ...FONTS.INPUT_TITLE,
    ...{
      marginBottom: METRICS.TINY,
    },
  },
});

InputText.propTypes = {
  error: object,
  mode: oneOf([NORMAL, INVERSE, MINIMAL]),
  name: string,
  onChangeText: func,
  refs: string,
  title: string,
};

InputText.defaultProps = {
  error: null,
};
