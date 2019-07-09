import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { func, string, bool, number, oneOfType } from 'prop-types';

import { Colors } from 'Themes';

class BottomButton extends Component {
  render() {
    const {
      onPress,
      isDisabled,
      isLoading,
      title,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          if (onPress) onPress();
        }}
        disabled={isDisabled || isLoading}
        style={{
          height: 50,
          backgroundColor: !isDisabled ? Colors.green_light : Colors.brown_light,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
        {isLoading &&
          <DotIndicator
            count={4}
            size={7}
            color='white'
            animationDuration={800}
          />
        }
        {!isLoading &&
          <Text style={{color: 'white'}}>
            {title}
          </Text>
        }
      </TouchableOpacity>
    );
  }
}

BottomButton.propTypes = {
  onPress: func,
  isDisabled: bool,
  isLoading: bool,
  title: string,
}

export default BottomButton;
