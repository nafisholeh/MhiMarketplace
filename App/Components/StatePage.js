import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { string, func, number, oneOfType } from 'prop-types';

import { Colors, Images } from 'Themes';
import { moderateScale } from 'Lib';
import AppConfig from 'Config/AppConfig';
var _ = require('lodash');

class StatePage extends Component {
  _onPress = () => {
    const { onPress } = this.props;
    if(this.props.hasOwnProperty('onPress')) {
      onPress()
    }
  }

  render() {
    const {
      title,
      subtitle,
      buttonTitle,
      icon = AppConfig.pageState.ERROR
    } = this.props;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <Image
          source={Images[icon]}
          resizeMode='contain'
          style={styles.image}
        />
        <Text
          style={styles.title}>
          {title}
        </Text>
        <Text
          style={styles.subtitle}>
          {subtitle}
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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: moderateScale(42),
    height: moderateScale(188),
	  width: moderateScale(161),
  },
  title: {
    marginBottom: moderateScale(13),
    color: Colors.text_primary,
    fontFamily: 'CircularStd-Book',
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '500' : null,
    letterSpacing: -0.43,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: moderateScale(42),
    color: Colors.text_secondary,
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '300' : null,
    letterSpacing: -0.34,
    textAlign: 'center',
  },
  button: {
  	height: moderateScale(40),
  	width: moderateScale(115),
  	borderRadius: 3,
  	backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: Colors.white,
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '300' : null,
    letterSpacing: -0.34,
    textAlign: 'center',
  },
});

StatePage.propTypes = {
  title: string,
  subtitle: string,
  buttonTitle: string, 
  icon: oneOfType([number, string]),
  onPress: func,
}

export default StatePage;