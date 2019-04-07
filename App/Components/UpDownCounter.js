import React, { Component } from 'react';
import { View, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { number, func } from 'prop-types';

import { Images } from 'Themes';

const minAllowed = 0;

class UpDownCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: minAllowed,
    };
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
    const { onCounterChanged } = this.props;
    const { counter } = this.state;
    onCounterChanged(counter);
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
    }, () => {
      this.callbackCounterChange();
    });
  }
  
  onFinishedOverwrite = (e) => {
    const number = e.nativeEvent.text;
  }
  
  render() {
    const { counter } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.descreaseCounter}
          style={styles.buttonLeftContainer}>
          <Image
            source={Images.minus}
            resizeMode='contain'
            style={styles.button}
          />
        </TouchableOpacity>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          onChangeText={this.overwriteCounter}
          onEndEditing={this.onFinishedOverwrite}
          value={counter.toString()}
          selectTextOnFocus
          keyboardType='numeric'
          style={styles.input}
        />
        <TouchableOpacity
          onPress={this.increaseCounter}
          style={styles.buttonRightContainer}>
          <Image
            source={Images.plus}
            resizeMode='contain'
            style={styles.button}
          />
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
  }
});

UpDownCounter.propTypes = {
  initCounter: number,
  onCounterChanged: func,
};

export default UpDownCounter;