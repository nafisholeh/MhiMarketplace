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
    const { refs, mode, name, onChangeText, isDisabled } = this.props;
    const stylesContent = isDisabled
      ? styles.normalDisabledContent
      : styles.normalContent;
    const textAlign = mode === MODE.MINIMAL ? 'center' : 'left';
    return (
      <TextInput
        ref={refs ? refs : (ref) => (this._input = ref)}
        style={stylesContent}
        underlineColorAndroid="transparent"
        editable={!isDisabled}
        selectTextOnFocus={!isDisabled}
        textAlign={textAlign}
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
        let normalStyles = error
          ? styles.normalErrorContainer
          : styles.normalContainer;
        normalStyles = isDisabled
          ? styles.normalDisabledContainer
          : styles.normalContainer;
        return <View style={normalStyles}>{this.renderContent()}</View>;
      case MODE.MINIMAL:
        const minimalStyles = error
          ? styles.minimalErrorContainer
          : styles.minimalContainer;
        return <View style={minimalStyles}>{this.renderContent()}</View>;
    }
  };

  render() {
    const { title, error, mode } = this.props;
    return (
      <View style={styles.container}>
        {title && mode === MODE.NORMAL ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <View />
        )}
        {this.renderBorderAndContent()}
        {error ? <Text style={styles.errorView}>{error}</Text> : <View />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: METRICS.MEDIUM,
  },
  errorView: {
    ...FONTS.INPUT_ERROR,
    ...{ bottom: -15, left: 0, position: 'absolute' },
  },
  minimalContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderBottomColor: COLORS.BROWN_BG_PRIMARY,
    borderBottomWidth: METRICS.ONE,
    flexDirection: 'row',
    height: METRICS.HUGE,
  },
  minimalErrorContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderBottomColor: COLORS.ERROR,
    borderBottomWidth: METRICS.ONE,
    flexDirection: 'row',
    height: METRICS.HUGE,
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
    ...{
      flex: 1,
      paddingHorizontal: METRICS.LARGE,
    },
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
    ...{ flex: 1, paddingHorizontal: METRICS.LARGE },
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
