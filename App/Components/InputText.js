import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
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
      isLoading,
      isShowIcon,
      icon,
      errorFetching,
      onRefetch,
      styleContainer,
      styleBorder,
      iconStyle,
    } = this.props;
    return (
      <View style={[ styles.container, styleContainer ]}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.input}>
          <View style={
            error ?
            [ styles.inputContentError, styleBorder ] :
            [ styles.inputContent, styleBorder ]
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
              placeholderTextColor={Colors.border}
              style={styles.inputValue}
              {...this.props}
            />
            { isLoading &&       // tampilkan UI loading ketika sedang fetching
              <SkypeIndicator
                color={Colors.text_secondary}
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
    marginBottom: moderateScale(15),
  },
  prefix: {
    color: 'rgba(0,0,0,0.68)',
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '300' : null,
    letterSpacing: -0.34,
    marginBottom: 2,
    marginRight: moderateScale(5),
  },
  title: {
    color: 'rgba(0,0,0,0.68)',
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '300' : null,
    letterSpacing: -0.34,
    marginBottom: moderateScale(6),
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.brown_light,
    backgroundColor: Colors.white,
    borderRadius: 3,
    paddingVertical: Platform.OS === 'ios' ? moderateScale(14) : 0,
    paddingLeft: moderateScale(17),
    paddingRight: moderateScale(14),
  },
  inputContentError: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.red2,
    backgroundColor: Colors.white,
    borderRadius: 3,
    paddingVertical: Platform.OS === 'ios' ? moderateScale(14) : 0,
    paddingHorizontal: moderateScale(20),
  },
  inputValue: {
    flex: 1,
    color: Colors.text,
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '300' : null,
    letterSpacing: -0.34,
  },
  inputError: {
    color: Colors.red2,
    fontFamily: 'CircularStd-Book',
    fontSize: 10,
    fontWeight: Platform.OS === 'ios' ? '300' : null,
    letterSpacing: -0.34,
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(14),
    alignSelf: 'center',
    tintColor: Colors.google,
    transform: [{rotate: '90 deg'}],
  },
  loading: {
    flex: 0,
  }
})

InputText.propTypes = {

}

InputText.defaultProps = {
  error: null,
  isLoading: false,
  isShowIcon: true,
}
