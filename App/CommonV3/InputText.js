import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import {
  bool,
  object,
  func,
  number,
  string,
  oneOfType,
  oneOf,
  array,
} from 'prop-types';
import TextInputMask from 'react-native-text-input-mask';

import { Colors, Images, METRICS, FONTS } from 'Themes';

export default class InputText extends Component {
  render() {
    const {
      refs,
      name,
      title,
      error,
      styleBorder,
      styleInput,
      onChangeText,
      onChangeTextMask,
      isAllBorderShown,
      mask,
      multiline,
      disabled,
    } = this.props;
    return (
      <View style={{ ...styles.container }}>
        {title ? (
          <Text
            style={{
              ...FONTS.INPUT_TITLE,
              ...{ marginBottom: isAllBorderShown ? METRICS.MEDIUM_V2 : 0 },
            }}
          >
            {title}
          </Text>
        ) : (
          <View />
        )}
        <View
          style={[
            error
              ? [
                  isAllBorderShown
                    ? styles.inputContentErrorAllBorder
                    : styles.inputContentError,
                  multiline ? styles.multiline : null,
                  styleBorder,
                ]
              : [
                  isAllBorderShown
                    ? styles.inputContentAllBorder
                    : styles.inputContent,
                  multiline ? styles.multiline : null,
                  styleBorder,
                ],
            disabled ? { backgroundColor: Colors.GRAY_ICON } : {},
          ]}
        >
          {!mask ? (
            <TextInput
              inputColorPlaceholder={Colors.BORDER}
              placeholderTextColor={Colors.GRAY_ICON}
              ref={refs ? refs : (ref) => (this._input = ref)}
              style={
                isAllBorderShown
                  ? [styles.inputValueAllBorder, styleInput]
                  : [styles.inputValue, styleInput]
              }
              underlineColorAndroid="transparent"
              {...this.props}
              onChangeText={(text) => onChangeText(text, name)}
              textAlignVertical={multiline ? 'top' : 'center'}
            />
          ) : (
            <TextInputMask
              inputColorPlaceholder={Colors.BORDER}
              placeholderTextColor={Colors.GRAY_ICON}
              ref={refs ? refs : (ref) => (this._input = ref)}
              style={
                isAllBorderShown
                  ? styles.inputValueAllBorder
                  : styles.inputValue
              }
              underlineColorAndroid="transparent"
              {...this.props}
              mask={mask}
              onChangeText={(formatted, extracted) =>
                onChangeTextMask(formatted, extracted, name)
              }
            />
          )}
        </View>
        {error && <Text style={styles.inputError}>{error}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: METRICS.HUGE,
  },
  inputContent: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderBottomColor: Colors.GRAY_ICON,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    height: METRICS.HEIGHT_SMALL,
    paddingLeft: 0,
  },
  inputContentAllBorder: {
    alignItems: 'center',
    backgroundColor: Colors.GREEN_BG_DISABLED,
    borderRadius: METRICS.MEDIUM_V2,
    flexDirection: 'row',
    height: METRICS.HEIGHT_SMALL,
    paddingLeft: 0,
  },
  inputContentError: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderBottomColor: Colors.RED_PRIMARY,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    paddingLeft: 0,
  },
  inputContentErrorAllBorder: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderColor: Colors.RED_PRIMARY,
    borderRadius: 5,
    borderWidth: 0.5,
    flexDirection: 'row',
    paddingLeft: 0,
  },
  inputError: {
    ...FONTS.INPUT_ERROR,
    bottom: -15,
    left: 0,
    position: 'absolute',
  },
  inputValue: {
    ...FONTS.INPUT_VALUE,
    flex: 1,
    paddingLeft: 0,
  },
  inputValueAllBorder: {
    ...FONTS.INPUT_VALUE,
    flex: 1,
    paddingLeft: METRICS.LARGE_V2,
  },
  multiline: {
    alignItems: 'stretch',
    flex: 1,
    paddingVertical: METRICS.SMALL,
  },
});

InputText.propTypes = {
  error: object,
  icon: oneOfType([number, string]),
  isLoading: bool,
  isShowIcon: bool,
  name: string,
  onChangeText: func,
  onChangeTextMask: func,
  prefix: string,
  prefixIcon: oneOfType([number, string]),
  prefixStyle: oneOfType([object, array]),
  prefixTheme: oneOf(['block', 'blank']),
  refs: string,
  title: string,
};

InputText.defaultProps = {
  error: null,
  isLoading: false,
  isShowIcon: false,
  icon: Images.dropdown,
  prefixTheme: 'blank',
};
