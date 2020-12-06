import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

class Signin extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <View>
        <Text> index </Text>
      </View>
    );
  }
}

export default connect(null, null)(Signin);
