import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { InputTextWithShadow } from 'common-v3';
import { withNoHeader } from 'Hoc';
import { IMAGES, METRICS } from 'themes-v3';
import { screenWidth } from 'Lib';

class Signin extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={IMAGES.BG_ORANGE} style={styles.container}>
          <InputTextWithShadow
            title="Email"
            containerPadding={METRICS.LARGE}
            error="wajib diisi"
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
export default connect(null, null)(withNoHeader(Signin));
