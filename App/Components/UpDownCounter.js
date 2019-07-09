import React, { Component } from 'react';
import { View, TouchableOpacity, Image, TextInput, Text, StyleSheet } from 'react-native';
import { number, func, string } from 'prop-types';
import { debounce } from 'throttle-debounce';

import AppConfig from 'Config/AppConfig';
import { Images } from 'Themes';
import { moderateScale, InAppNotification } from 'Lib';
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
      const counter = parseFloat(prevState.counter);
      return { counter: counter > minAllowed ? counter - 1 : 0}
    }, () => {
      this.callbackCounterChange();
    });
  };
  
  increaseCounter = () => {
    this.setState((prevState) => {
      const counter = parseFloat(prevState.counter);
      return { counter: counter + 1 }
    }, () => {
      this.callbackCounterChange();
    });
  };
  
  overwriteCounter = number => {
    if (isNaN(number)) {
      InAppNotification.errorLocal(
        'Salah tipe data',
        'Mohon isi total barang yg dibeli dgn benar'
      );
    } else {
      this.setState({
        counter: parseFloat(number)
      });
    }
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
        <TouchableOpacity onPress={this.descreaseCounter}>
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
          style={[ 
            styles.input,
            {
              width: moderateScale(50),
              marginHorizontal: moderateScale(5),
            }
          ]}
        />
        <TouchableOpacity onPress={this.increaseCounter}>
          <CartAddButton />
        </TouchableOpacity>
        <Text
          style={[
            styles.input,
            { marginLeft: moderateScale(10) }
          ]}
        >
          {unit}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  input: {
    padding: 0,
    textAlign: 'center',
    fontFamily: 'CircularStd-Bold',
    fontSize: 16,
    // backgroundColor: 'red'
  }
});

UpDownCounter.propTypes = {
  initCounter: number,
  onCounterChanged: func,
  unit: string,
};

export default UpDownCounter;