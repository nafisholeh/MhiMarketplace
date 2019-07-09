import React, { Component } from 'react';
import {
  View, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types'
import { Colors, Images, Servers, Strings } from 'Themes'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var _ = require('lodash')

export default class KeyboardFriendlyView extends Component {
  render() {
    return (
      <KeyboardAwareScrollView
        ref={(ref) => this._scroll = ref}
        style={styles(this.props).container}
        showsVerticalScrollIndicator={false}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraHeight={150}
        keyboardDismissMode="interactive"
        enableOnAndroid={true}
        {...this.props}>
        { this.props.children }
      </KeyboardAwareScrollView>
    )
  }
}

const styles = (props) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: props.backgroundColor,
  },
})

