import React, { Component } from 'react'
import { Platform, StyleSheet, View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import { Colors } from 'Themes'
import { Touchable } from './TouchableOpacity'
import { moderateScale } from 'Lib'
import { BarIndicator } from 'react-native-indicators'
var _ = require('lodash')

export default class LoadingSection extends Component {

  render() {
    return (
      <View style={[ styles.container, this.props.style]}>
        <BarIndicator
          color={Colors.green_accent}
          count={5}
          size={20}
          style={styles.loading}
        />
        <Text
          style={styles.title}>
          {this.props.title}
        </Text>
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
  loading: {
    flex: 0,
    marginBottom: moderateScale(10),
  },
  title: {
    color: Colors.brown_light,
    fontFamily: 'CircularStd-Book',
    fontSize: 10,
    fontWeight: Platform.OS === 'ios' ? '300' : null,
    letterSpacing: -0.43,
    textAlign: 'center',
  },
})

LoadingSection.propTypes = {

}

LoadingSection.defaultProps = {

}
