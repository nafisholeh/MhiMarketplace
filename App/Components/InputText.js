import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  bool,
  object,
  func,
  number,
  string,
  oneOfType,
  oneOf,
  array,
} from "prop-types";
import { SkypeIndicator } from "react-native-indicators";
import TextInputMask from "react-native-text-input-mask";

import { Colors, Images, METRICS, FONTS } from "Themes";
import { moderateScale } from "Lib";

export default class InputText extends Component {
  render() {
    const {
      refs,
      name,
      title,
      error,
      prefix,
      prefixStyle,
      prefixTheme,
      prefixIcon,
      prefixIconStyle,
      suffix,
      isLoading,
      isShowIcon,
      icon,
      errorFetching,
      onRefetch,
      styleContainer,
      styleBorder,
      styleInput,
      iconStyle,
      onChangeText,
      onChangeTextMask,
      isAllBorderShown,
      mask,
      multiline,
      disabled,
    } = this.props;
    const isPrefixBlockTheme = prefixTheme === "block";
    return (
      <View style={{ ...styles.container, ...styleContainer }}>
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
          <View></View>
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
          {prefixIcon ? (
            <Image
              source={prefixIcon}
              style={{
                ...{
                  width: moderateScale(20),
                  height: moderateScale(20),
                  marginRight: moderateScale(10),
                  marginLeft: isAllBorderShown ? moderateScale(10) : 0,
                },
                ...prefixIconStyle,
              }}
            />
          ) : null}
          {prefix && isPrefixBlockTheme && (
            <View
              style={{
                ...{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  marginLeft: METRICS.TINY,
                  marginTop: METRICS.TINY,
                  marginBottom: METRICS.TINY,
                  borderRadius: METRICS.RADIUS_MEDIUM,
                  paddingHorizontal: METRICS.TINY,
                  backgroundColor: Colors.green_light,
                },
                ...prefixStyle,
              }}
            >
              <Text style={styles.prefixInBlock}>{prefix}</Text>
            </View>
          )}
          {prefix && !isPrefixBlockTheme && (
            <Text style={styles.prefix}>{prefix}</Text>
          )}

          {!mask ? (
            <TextInput
              ref={refs ? refs : (ref) => (this._input = ref)}
              underlineColorAndroid="transparent"
              inputColorPlaceholder={Colors.BORDER}
              placeholderTextColor={Colors.GRAY_ICON}
              style={
                isAllBorderShown
                  ? [styles.inputValueAllBorder, styleInput]
                  : [styles.inputValue, styleInput]
              }
              {...this.props}
              textAlignVertical={multiline ? "top" : "center"}
              onChangeText={(text) => onChangeText(text, name)}
            />
          ) : (
            <TextInputMask
              ref={refs ? refs : (ref) => (this._input = ref)}
              underlineColorAndroid="transparent"
              inputColorPlaceholder={Colors.BORDER}
              placeholderTextColor={Colors.GRAY_ICON}
              style={
                isAllBorderShown
                  ? styles.inputValueAllBorder
                  : styles.inputValue
              }
              {...this.props}
              onChangeText={(formatted, extracted) =>
                onChangeTextMask(formatted, extracted, name)
              }
              mask={mask}
            />
          )}
          {suffix ? <Text style={styles.prefix}>{suffix || ""}</Text> : null}
          {isLoading && ( // tampilkan UI loading ketika sedang fetching
            <SkypeIndicator
              color={Colors.veggie_light}
              count={5}
              size={20}
              style={styles.loading}
            />
          )}
          {!isLoading && // tampilkan icon 'penghias' di pojok kanan inputan
            isShowIcon &&
            icon &&
            !errorFetching && (
              <Image
                source={icon}
                style={[styles.image, iconStyle]}
                resizeMode="contain"
              />
            )}
          {!isLoading && // tampilkan tombol refetch, ktk gagal fetching
            icon &&
            errorFetching && (
              <TouchableOpacity onPress={onRefetch}>
                <Image
                  source={Images.refresh}
                  style={styles.image}
                  resizeMode="contain"
                />
              </TouchableOpacity>
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
  multiline: {
    flex: 1,
    alignItems: "stretch",
    paddingVertical: METRICS.SMALL,
  },
  prefix: {
    ...FONTS.INPUT_VALUE,
    marginLeft: METRICS.SMALL,
  },
  prefixInBlock: {
    ...FONTS.INPUT_VALUE,
  },
  inputContent: {
    height: METRICS.HEIGHT_SMALL,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.GRAY_ICON,
    backgroundColor: Colors.WHITE,
    paddingLeft: 0,
  },
  inputContentAllBorder: {
    height: METRICS.HEIGHT_SMALL,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: METRICS.MEDIUM_V2,
    backgroundColor: Colors.GREEN_BG_DISABLED,
    paddingLeft: 0,
  },
  inputContentError: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.RED_PRIMARY,
    backgroundColor: Colors.WHITE,
    paddingLeft: 0,
  },
  inputContentErrorAllBorder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.RED_PRIMARY,
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    paddingLeft: 0,
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
  inputError: {
    ...FONTS.INPUT_ERROR,
    position: "absolute",
    bottom: -15,
    left: 0,
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(14),
    alignSelf: "center",
    tintColor: Colors.GREEN_BG_PRIMARY,
    marginRight: METRICS.MEDIUM_V2,
  },
  loading: {
    flex: 0,
  },
});

InputText.propTypes = {
  error: object,
  isLoading: bool,
  isShowIcon: bool,
  icon: oneOfType([number, string]),
  prefix: string,
  prefixStyle: oneOfType([object, array]),
  prefixTheme: oneOf(["block", "blank"]),
  prefixIcon: oneOfType([number, string]),
  name: string,
  onChangeText: func,
  onChangeTextMask: func,
};

InputText.defaultProps = {
  error: null,
  isLoading: false,
  isShowIcon: false,
  icon: Images.dropdown,
  prefixTheme: "blank",
};
