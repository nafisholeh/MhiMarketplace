import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { bool, object, func, string, number } from 'prop-types';

import { FONTS, METRICS, COLORS } from 'themes-v3';
import { ViewShadow } from 'Components';
import { screenWidth } from 'Lib';

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
    const { width } = this.props;
    return (
      <ViewShadow
        width={width}
        height={METRICS.HUGE}
        borderRadius={METRICS.RADIUS_NORMAL}
        shadowBorderRadiusAndroid={METRICS.RADIUS_NORMAL}
        shadowRadiusAndroid={4.5}
        shadowOpacityAndroid={0.05}
        posYAndroid={2.2}
        mainColor={COLORS.WHITE}
        shadowColor={COLORS.DROP_SHADOW}
        style={styles.shadowContainer}
      >
        {this.renderContent()}
      </ViewShadow>
    );
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
  normalContent: {
    ...FONTS.INPUT_VALUE,
    ...{ flex: 1, paddingLeft: METRICS.BIG },
  },
  normalDisabledContent: {
    ...FONTS.INPUT_VALUE_DISABLED,
    ...{ flex: 1, paddingLeft: METRICS.BIG },
  },
  shadowContainer: {
    marginBottom: METRICS.MEDIUM,
  },
  title: {
    ...FONTS.INPUT_TITLE,
    ...{
      color: COLORS.WHITE,
      marginBottom: METRICS.TINY,
    },
  },
});

InputText.propTypes = {
  error: object,
  isDisabled: bool,
  name: string,
  onChangeText: func,
  refs: string,
  title: string,
  width: number.isRequired,
};

InputText.defaultProps = {
  error: null,
  isDisabled: false,
  width: screenWidth,
};
