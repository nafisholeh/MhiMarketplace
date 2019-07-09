import React, { Component } from 'react'
import { Platform, StyleSheet, ScrollView, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import { Colors, Images, Metrics, Constants } from 'Themes'
import { Touchable } from './TouchableOpacity'
import { moderateScale } from 'Lib'
import { BarIndicator } from 'react-native-indicators'
var _ = require('lodash')

export default class LoadingPage extends Component {

  render() {
    return (
      <ScrollView
        style={styles(this.props).container}
        contentContainerStyle={styles(this.props).content}>
        <BarIndicator
          color={Colors.green_accent}
          count={5}
          size={50}
          style={styles(this.props).loading}
        />
        <Text
          style={styles(this.props).title}>
          {this.props.title}
        </Text>
        <Text
          style={styles(this.props).subtitle}>
          {this.props.subtitle}
        </Text>
      </ScrollView>
    )
  }

}

const styles = (props) => StyleSheet.create({
  container: {
    backgroundColor: props.backgroundColor,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(52),
  },
  loading: {
    flex: 0,
    marginBottom: moderateScale(42),
  },
  title: {
    marginBottom: moderateScale(13),
    color: Colors.brown_light,
    fontFamily: 'CircularStd-Book',
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '500' : null,
    letterSpacing: -0.43,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: moderateScale(42),
    color: Colors.brown_light,
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '300' : null,
    letterSpacing: -0.34,
    textAlign: 'center',
  },
})

LoadingPage.propTypes = {

}

LoadingPage.defaultProps = {
  backgroundColor: Colors.bg_halal
}
