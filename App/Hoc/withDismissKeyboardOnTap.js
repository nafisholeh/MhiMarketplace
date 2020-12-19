import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export default (Comp) => {
  return class DismissableKeyboard extends Component {
    render() {
      const { children, ...props } = this.props;
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Comp {...props}>{children}</Comp>
        </TouchableWithoutFeedback>
      );
    }
  };
};
