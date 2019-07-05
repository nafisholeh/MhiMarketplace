import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';

import { Colors } from 'Themes';
import { moderateScale } from 'Lib';

class InputTextAccount extends Component {
  render() {
    return (
      <TextField
        tintColor={Colors.veggie_dark}
        errorColor={Colors.red2}
        containerStyle={{
          marginHorizontal: moderateScale(40),
        }}
        labelTextStyle={{
          fontFamily: 'CircularStd-Book',
          fontSize: 14,
          color: Colors.text
        }}
        {...this.props}
      />
    );
  }
}

export default InputTextAccount;
