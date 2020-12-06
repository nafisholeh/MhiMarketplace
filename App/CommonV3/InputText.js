import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { bool, object, func, string, oneOf } from 'prop-types';

import { FONTS, METRICS, COLORS } from 'themes-v3';

const NORMAL = 'normal';
const MINIMAL = 'minimal';
const MODE = {
  NORMAL,
  MINIMAL,
};

export default class InputText extends Component {
  renderContent = () => {
    const { refs, name, onChangeText, isDisabled } = this.props;
    const stylesContent = isDisabled
      ? styles.normalDisabledContent
      : styles.normalContent;
    return (
      <TextInput
        ref={refs ? refs : (ref) => (this._input = ref)}
        style={stylesContent}
        underlineColorAndroid="transparent"
        editable={!isDisabled}
        selectTextOnFocus={!isDisabled}
        {...this.props}
        onChangeText={(text) => onChangeText(text, name)}
      />
    );
  };

  renderBorderAndContent = () => {
    const { mode, error, isDisabled } = this.props;
    switch (mode) {
      case MODE.NORMAL:
      default:
        let containerStyles = error
          ? styles.normalErrorContainer
          : styles.normalContainer;
        containerStyles = isDisabled
          ? styles.normalDisabledContainer
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
  container: {
    marginBottom: METRICS.MEDIUM,
  },
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
  normalDisabledContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_BG_PRIMARY,
    borderColor: COLORS.GRAY_BG_PRIMARY,
    borderRadius: METRICS.RADIUS_NORMAL,
    borderWidth: METRICS.ONE,
    flexDirection: 'row',
    height: METRICS.HUGE,
    paddingLeft: 0,
  },
  normalDisabledContent: {
    ...FONTS.INPUT_VALUE_DISABLED,
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
  isDisabled: bool,
  mode: oneOf([NORMAL, MINIMAL]),
  name: string,
  onChangeText: func,
  refs: string,
  title: string,
};

InputText.defaultProps = {
  error: null,
  isDisabled: false,
};
