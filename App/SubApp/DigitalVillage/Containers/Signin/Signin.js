import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { InputTextWithShadow, InputPasswordWithShadow } from 'common-v3';
import { withNoHeader } from 'Hoc';
import { IMAGES, METRICS, FONTS } from 'themes-v3';
import { moderateScale } from 'Lib';

class Signin extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={IMAGES.BG_ORANGE} style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingTitle}>Selamat datang,</Text>
            <Text style={styles.subheadingTitle}>
              masuk ke akun untuk melanjutkan
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <InputTextWithShadow
              title="Email"
              containerPadding={METRICS.LARGE}
            />
            <InputPasswordWithShadow
              title="Password"
              containerPadding={METRICS.LARGE}
            />
          </View>
          <View style={styles.bottomContainer} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    height: moderateScale(120),
  },
  container: { flex: 1, justifyContent: 'space-between' },
  headingContainer: {
    marginHorizontal: METRICS.LARGE,
    paddingTop: METRICS.HUGE,
  },
  headingTitle: {
    ...FONTS.BOLD_HUGE_WHITE,
    ...{
      marginBottom: METRICS.TINY,
    },
  },
  inputContainer: {
    paddingTop: METRICS.LARGE,
  },
  subheadingTitle: {
    ...FONTS.SEMIBOLD_LARGE_WHTIE,
  },
});
export default connect(null, null)(withNoHeader(Signin));
