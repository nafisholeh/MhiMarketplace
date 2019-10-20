import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { string, number, object, oneOfType, oneOf } from 'prop-types';

import { Images } from 'Themes';
import { moderateScale } from 'Lib';

const IMAGE_SIZE = {
  small: 30,
  medium: 50,
  big: 75,
};

class Avatar extends Component {
  render() {
    const { source = null, size = 'medium', style } = this.props;
    const imageSize = moderateScale(IMAGE_SIZE[size]);
    const borderRadius = moderateScale(IMAGE_SIZE[size] / 2);
    return (
      <Image
        {...this.props}
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius,
          ...style
        }}
        source={source || Images.empty_profile}
      />
    )
  };
}

Avatar.propTypes = {
  style: oneOfType([ string, number, object ]),
  source: oneOfType([ string, number, object ]),
  size: oneOf(['small','medium','big']),
};

Avatar.defaultProps = {
  size: 'medium',
};

export default Avatar;
