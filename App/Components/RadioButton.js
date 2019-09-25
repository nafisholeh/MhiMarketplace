import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { View } from 'react-native-animatable'
import { number, string, bool, func, object} from 'prop-types'

import { Colors } from 'Themes';
import { moderateScale } from 'Lib';

const DEFAULT_SIZE_MULTIPLIER = 0.7
const DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER = 0.2

export default class RadioButton extends Component {

  constructor(props) {
    super(props)
  }

  render () {
    const {
      size,
      innerColor,
      outerColor,
      isSelected,
      onPress,
      style,
      styleContainer,
      title,
      styleTitle,
    } = this.props
    const outerStyle = {
      borderColor: outerColor,
      width: size + size * DEFAULT_SIZE_MULTIPLIER,
      height: size + size * DEFAULT_SIZE_MULTIPLIER,
      borderRadius: (size + size * DEFAULT_SIZE_MULTIPLIER) / 2,
      borderWidth: size * DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER,
    }
    const innerStyle = {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: innerColor,
    }
    return (
      <TouchableOpacity
        style={{
          ...{
            flexDirection: 'row',
            alignItems: 'center',
          },
          ...style
        }}
        onPress={onPress}
      >
        <View style={[styles.radio, outerStyle, styleContainer]}>
          {isSelected ? <View style={innerStyle} {...this.props} /> : null}
        </View>
        <Text
          style={[
            {
              color: Colors.text,
              fontFamily: 'CircularStd-Book',
              fontSize: 14,
            },
            styleTitle
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: moderateScale(7),
  }
})

RadioButton.propTypes = {
  size: number,
  innerColor: string,
  outerColor: string,
  isSelected: bool,
  onPress: func,
  styleContainer: object,
  title: string,
  styleTitle: object,
}

RadioButton.defaultProps = {
  size: 16,
  innerColor: Colors.red,
  outerColor: Colors.red,
  isSelected: false,
  onPress: () => null
}
