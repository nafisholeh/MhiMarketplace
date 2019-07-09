import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
var _ = require('lodash')

export default class Touchable extends Component {

  constructor(props) {
    super(props)
    _.throttle(
        this._onPressThrottledCb.bind(this),
        500, // no new clicks within 200ms time window
    )
  }

  _onPressThrottledCb() {
    if (this.props.onPress) {
      this.props.onPress() // this only runs once per 200 milliseconds
    }
  }

  render () {
    return (
      <TouchableOpacity
        onPress={this._onPressThrottledCb}
        {...this.props}>
          {this.props.children}
      </TouchableOpacity>
    )
  }
}

Touchable.propTypes = {
  onPress: PropTypes.func.isRequired,
}

Touchable.defaultProps = {
  disabled: false,
}
