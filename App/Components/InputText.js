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

import { Colors, Images, METRICS } from "Themes";
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
      isAllBorderShown,
      mask,
      multiline,
    } = this.props;
    const isPrefixBlockTheme = prefixTheme === "block";
    return (
      <View style={{ ...styles.container, ...styleContainer }}>
        {title ? (
          <Text
            style={{
              ...styles.title,
              ...{ marginBottom: moderateScale(isAllBorderShown ? 5 : 0) },
            }}
          >
            {title}
          </Text>
        ) : (
          <View></View>
        )}
        <View
          style={
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
                ]
          }
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
              placeholderTextColor={Colors.disabled_light}
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
              placeholderTextColor={Colors.disabled_light}
              style={
                isAllBorderShown
                  ? styles.inputValueAllBorder
                  : styles.inputValue
              }
              {...this.props}
              onChangeText={(formatted, extracted) =>
                onChangeText(formatted, name)
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
    color: Colors.TEXT_SECONDARY,
    fontFamily: "CircularStd-Book",
    fontSize: 14,
    marginLeft: METRICS.SMALL,
  },
  prefixInBlock: {
    color: Colors.white,
    fontFamily: "CircularStd-Book",
    fontSize: 14,
  },
  title: {
    color: Colors.veggie_dark,
    fontFamily: "CircularStd-Book",
    fontSize: 13,
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.brown_light,
    backgroundColor: Colors.white,
    paddingLeft: 0,
  },
  inputContentAllBorder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.brown_light,
    borderRadius: 5,
    backgroundColor: Colors.white,
    paddingLeft: 0,
  },
  inputContentError: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.red2,
    backgroundColor: Colors.white,
    paddingLeft: 0,
  },
  inputContentErrorAllBorder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.red2,
    borderRadius: 5,
    backgroundColor: Colors.white,
    paddingLeft: 0,
  },
  inputValue: {
    flex: 1,
    color: Colors.text,
    fontFamily: "CircularStd-Book",
    fontSize: 14,
    paddingBottom: moderateScale(4),
    paddingTop: moderateScale(4),
    paddingLeft: 0,
  },
  inputValueAllBorder: {
    flex: 1,
    color: Colors.text,
    fontFamily: "CircularStd-Book",
    fontSize: 14,
    paddingBottom: moderateScale(4),
    paddingTop: moderateScale(4),
    paddingHorizontal: METRICS.SMALL,
  },
  inputError: {
    position: "absolute",
    bottom: -15,
    left: 0,
    color: Colors.red2,
    fontFamily: "CircularStd-Book",
    fontSize: 12,
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(14),
    alignSelf: "center",
    tintColor: Colors.veggie_light,
    marginRight: METRICS.TINY,
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
};

InputText.defaultProps = {
  error: null,
  isLoading: false,
  isShowIcon: false,
  icon: Images.dropdown,
  prefixTheme: "blank",
};
