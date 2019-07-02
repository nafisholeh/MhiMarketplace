import React, { Component } from 'react';
import { View, TouchableOpacity, Image, TextInput, Text, StyleSheet } from 'react-native';
import { number, func, string } from 'prop-types';
import { debounce } from 'throttle-debounce';

import AppConfig from 'Config/AppConfig';
import { Images } from 'Themes';
import { CartAddButton, CartSubtractButton } from 'Components';

const minAllowed = 0;

class UpDownCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: minAllowed,
    };
    this.debounceCounterChanges = 
      debounce(
        AppConfig.debounceInterval, 
        counter => this.props.onCounterChanged(parseInt(counter, 10))
      );
  }
  
  componentDidMount() {
    this.setupInitCounter();
  }
  
  setupInitCounter = () => {
    const { initCounter } = this.props;
    if (!initCounter) return;
    this.setState({ counter: initCounter });
  }
  
  callbackCounterChange = () => {  
    const { counter } = this.state;
    this.debounceCounterChanges(counter);
  }
  
  descreaseCounter = () => {
    this.setState((prevState) => {
      return { counter: prevState.counter > minAllowed ? prevState.counter - 1 : 0}
    }, () => {
      this.callbackCounterChange();
    });
  };
  
  increaseCounter = () => {
    this.setState((prevState) => {
      return { counter: prevState.counter + 1 }
    }, () => {
      this.callbackCounterChange();
    });
  };
  
  overwriteCounter = number => {
    this.setState({
      counter: number
    });
  }
  
  onBlurOverwriteCounter = () => {
    this.callbackCounterChange();
  }
  
  onFinishedOverwrite = (e) => {
    const number = e.nativeEvent.text;
  }
  
  render() {
    const { counter } = this.state;
    const { unit } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.descreaseCounter}
          style={styles.buttonLeftContainer}>
          <CartSubtractButton />
        </TouchableOpacity>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          onChangeText={this.overwriteCounter}
          onBlur={this.onBlurOverwriteCounter}
          onEndEditing={this.onFinishedOverwrite}
          value={counter.toString()}
          selectTextOnFocus
          keyboardType='numeric'
          style={styles.input}
        />
      <Text style={styles.input}>
          {unit}
        </Text>
        <TouchableOpacity
          onPress={this.increaseCounter}
          style={styles.buttonRightContainer}>
          <CartAddButton />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLeftContainer: {
    marginRight: 8,
  },
  buttonRightContainer: {
    marginLeft: 8,
  },
  button: {
    width: 20,
    height: 20,
  },
  input: {
    padding: 0,
    textAlign: 'center',
    fontFamily: 'CircularStd-Bold',
    fontSize: 16,
  }
});

UpDownCounter.propTypes = {
  initCounter: number,
  onCounterChanged: func,
  unit: string,
};

export default UpDownCounter;