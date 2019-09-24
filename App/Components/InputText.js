import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { bool, object, number, string, oneOfType } from 'prop-types';
import { SkypeIndicator } from 'react-native-indicators';

import { Colors, Images, Servers, Strings, Fonts } from 'Themes';
import { moderateScale } from 'Lib';

export default class InputText extends Component {

  render() {
    const {
      refs,
      title,
      error,
      prefix,
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
    } = this.props;
    return (
      <View style={[ styles.container, styleContainer ]}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.input}>
          <View style={
            error ?
            [ styles.inputContentError, styleBorder, styleInput ] :
            [ styles.inputContent, styleBorder, styleInput ]
          }>
            { prefix &&
              <Text style={styles.prefix}>
                {prefix}
              </Text>
            }
            <TextInput
              ref={refs ? refs : (ref) => this._input = ref}
              underlineColorAndroid='transparent'
              inputColorPlaceholder={Colors.border}
              placeholderTextColor={Colors.disabled_light}
              style={styles.inputValue}
              {...this.props}
            />
            { suffix ? (
              <Text style={styles.prefix}>
                {suffix || ''}
              </Text>
            ) : null}
            { isLoading &&       // tampilkan UI loading ketika sedang fetching
              <SkypeIndicator
                color={Colors.veggie_light}
                count={5}
                size={20}
                style={styles.loading}
              />
            }
            { !isLoading &&      // tampilkan icon 'penghias' di pojok kanan inputan
              isShowIcon &&
              icon &&
              !errorFetching &&
              <Image
                source={icon}
                style={[ styles.image, iconStyle ]}
                resizeMode='contain'
              />
            }
            { !isLoading &&      // tampilkan tombol refetch, ktk gagal fetching
              icon &&
              errorFetching &&
              <TouchableOpacity onPress={onRefetch}>
                <Image
                  source={Images.refresh}
                  style={styles.image}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            }
          </View>
          { error &&
            <Text
              style={styles.inputError}>
              {error}
            </Text>
          }
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(24),
    marginHorizontal: moderateScale(40),
  },
  prefix: {
    color: Colors.text,
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    marginBottom: 2,
    marginRight: moderateScale(5),
  },
  title: {
    color: Colors.veggie_dark,
    fontFamily: 'CircularStd-Book',
    fontSize: 13,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.brown_light,
    backgroundColor: Colors.white,
    borderRadius: 3,
    paddingLeft: 0,
  },
  inputContentError: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.red2,
    backgroundColor: Colors.white,
    borderRadius: 3,
    paddingLeft: 0,
  },
  inputValue: {
    flex: 1,
    color: Colors.text,
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    paddingBottom: moderateScale(4),
    paddingTop: moderateScale(4),
    paddingLeft: 0,
  },
  inputError: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    color: Colors.red2,
    fontFamily: 'CircularStd-Book',
    fontSize: 12,
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(14),
    alignSelf: 'center',
    tintColor: Colors.veggie_light,
  },
  loading: {
    flex: 0,
  }
})

InputText.propTypes = {
  withBorder: bool,
  error: object,
  isLoading: bool,
  isShowIcon: bool,
  icon: oneOfType([ number, string ]),
}

InputText.defaultProps = {
  error: null,
  isLoading: false,
  isShowIcon: false,
  icon: Images.dropdown,
}
