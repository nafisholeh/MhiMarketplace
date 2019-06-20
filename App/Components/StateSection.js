import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Images, Metrics, Constants } from 'Themes';
import { moderateScale } from 'Lib';
var _ = require('lodash');

export default class StateSection extends Component {

  _onPress = () => {
    const { onPress } = this.props;
    if(onPress) onPress();
  }

  render() {
    const { style, types, title, buttonTitle } = this.props;
    return (
      <View style={[ styles.container, style]}>
        <Image
          source={
            types === 'empty' ?
              Images.cart_empty :
              Images.server_error
          }
          resizeMode='contain'
          style={styles.image}
        />
        <Text
          style={styles.title}>
          {title}
        </Text>
        { buttonTitle &&
          <TouchableOpacity
            onPress={this._onPress}
            style={styles.button}>
            <Text
              numberOfLines={1}
              style={styles.buttonTitle}>
              {buttonTitle}
            </Text>
          </TouchableOpacity>
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(30),
  },
  image: {
    marginBottom: moderateScale(10),
    height: moderateScale(30),
	  width: moderateScale(30),
  },
  title: {
    marginBottom: moderateScale(13),
    color: Colors.text_secondary,
    fontFamily: 'CircularStd-Book',
    fontSize: 10,
    fontWeight: Platform.OS === 'ios' ? '300' : null,
    letterSpacing: -0.43,
    textAlign: 'center',
  },
  button: {
  	height: moderateScale(30),
  	width: moderateScale(90),
  	borderRadius: 3,
  	backgroundColor: Colors.text_primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: Colors.white,
    fontFamily: 'CircularStd-Book',
    fontSize: 10,
    fontWeight: Platform.OS === 'ios' ? '300' : null,
    letterSpacing: -0.34,
    textAlign: 'center',
  },
})

StateSection.propTypes = {

}

StateSection.defaultProps = {

}
