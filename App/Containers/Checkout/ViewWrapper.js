import React, { Component } from 'react';

import { ViewShadow } from 'Components';
import { Colors } from 'Themes';
import { screenWidth } from 'Lib';

class ViewWrapper extends Component {
  render() {
    const { children, height, styleChildren } = this.props;
    return (
      <ViewShadow
        width={screenWidth - 35}
        height={height || 100}
        borderRadius={10}
        shadowBorderRadiusAndroid={10}
        shadowRadiusAndroid={18}
        shadowOpacityAndroid={0.09}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
        style={{ alignSelf: 'center' }}
        styleChildren={ styleChildren }
      >
        {children}
      </ViewShadow>
    );
  }
}

export default ViewWrapper;



  