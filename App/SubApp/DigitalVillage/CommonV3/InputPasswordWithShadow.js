import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { bool, object, func, string, number } from 'prop-types';

import { FONTS, METRICS, COLORS } from 'themes-v3';
import { ViewShadow } from 'Components';
import { screenWidth } from 'Lib';

export default class InputPasswordWithShadow extends Component {
  renderContent = () => {
    const { refs, name, onChangeText, isDisabled } = this.props;
    const stylesContent = isDisabled ? styles.disabledContent : styles.content;
    return (
      <TextInput
        ref={refs ? refs : (ref) => (this._input = ref)}
        style={stylesContent}
        underlineColorAndroid="transparent"
        editable={!isDisabled}
        selectTextOnFocus={!isDisabled}
        {...this.props}
        onChangeText={(text) => onChangeText(text, name)}
        secureTextEntry={true}
      />
    );
  };

  renderBorderAndContent = () => {
    const { containerPadding } = this.props;
    return (
      <ViewShadow
        width={screenWidth - containerPadding * 2}
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
    const { title, error, containerPadding } = this.props;
    const titleStyle = {
      ...styles.title,
      ...{ marginLeft: containerPadding },
    };
    const errorStyle = {
      ...styles.error,
      ...{ marginRight: containerPadding },
    };
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {title ? <Text style={titleStyle}>{title}</Text> : <View />}
          {error ? <Text style={errorStyle}>{error}</Text> : <View />}
        </View>
        {this.renderBorderAndContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: METRICS.MEDIUM,
  },
  content: {
    ...FONTS.BOLD_MEDIUM_BLACK,
    ...{ paddingLeft: METRICS.BIG, letterSpacing: 4 },
  },
  disabledContent: {
    ...FONTS.SEMIBOLD_MEDIUM_BLACK,
    ...{ flex: 1, paddingLeft: METRICS.BIG },
  },
  error: {
    ...FONTS.ITALIC_SMALL_ERROR,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shadowContainer: {
    padding: 0,
  },
  title: {
    ...FONTS.BOLD_SMALL_WHITE,
    ...{
      marginBottom: METRICS.TINY,
    },
  },
});

InputPasswordWithShadow.propTypes = {
  containerPadding: number.isRequired,
  error: object,
  isDisabled: bool,
  name: string,
  onChangeText: func,
  refs: string,
  title: string.isRequired,
};

InputPasswordWithShadow.defaultProps = {
  error: null,
  isDisabled: false,
};
