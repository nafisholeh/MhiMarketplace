import React, { Component } from 'react';
import { View } from 'react-native';
import { string } from 'prop-types';

import { moderateScale } from 'Lib';
import { Colors } from 'Themes';

class NewsFeedDivider extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: Colors.socmed_bg,
          height: moderateScale(7),
        }}
      />
    )
  };
}

export default NewsFeedDivider;
