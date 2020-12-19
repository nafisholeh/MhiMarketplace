import React, { Component } from 'react';
import { LayoutAnimation, Keyboard, Platform } from 'react-native';
import { any, bool } from 'prop-types';

export default (Comp) => {
  return class KeyboardAware extends Component {
    state = { keyboardOn: false };
    keyboardWillShowSub;
    keyboardWillHideSub;
    componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
        (event) => {
          this.setState({ keyboardOn: true });
        }
      );
      this.keyboardWillHideSub = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
        (event) => {
          this.setState({ keyboardOn: false });
        }
      );
    }
    componentWillUpdate() {
      !this.props.noAnimation && LayoutAnimation.easeInEaseOut();
    }
    componentWillUnmount() {
      this.keyboardWillShowSub && this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub && this.keyboardWillHideSub.remove();
    }
    render() {
      const {
        styleDuringKeyboardShow,
        style,
        children,
        hideOnKeyboard,
        ...props
      } = this.props;
      if (this.state.keyboardOn && hideOnKeyboard) return null;
      return (
        <Comp
          style={[style, this.state.keyboardOn && styleDuringKeyboardShow]}
          {...props}
        >
          {children}
        </Comp>
      );
    }
    propTypes = {
      hideOnKeyboard: bool,
      noAnimation: bool,
      styleDuringKeyboardShow: any,
      style: any,
      children: any,
    };
    defaultProps = {
      hideOnKeyboard: true,
    };
  };
};
