import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import { InputTextWithShadow, InputPasswordWithShadow } from 'common-v3';
import { withNoHeader } from 'Hoc';
import { IMAGES, METRICS, FONTS, COLORS } from 'themes-v3';
import { moderateScale } from 'Lib';

class Signin extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  onSignin = () => {};
  onSignup = () => {
    const { navigation } = this.props;
    navigation.navigate('KtpSearch');
  };

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
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={this.onSignin} style={styles.signin}>
              <Text style={styles.buttonText}>Masuk</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onSignup} style={styles.signup}>
              <Text style={styles.signupText}>Tidak punya akun?</Text>
              <Text style={styles.signupButton}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    height: moderateScale(120),
  },
  buttonText: {
    ...FONTS.BOLD_LARGE_BLACK_TERTIERY,
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
  signin: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: METRICS.LARGE,
    height: METRICS.EXTRA_HUGE,
    justifyContent: 'center',
    marginBottom: METRICS.LARGE,
    marginHorizontal: METRICS.LARGE,
  },
  signup: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupButton: {
    ...FONTS.BOLD_SMALL_GRAY,
  },
  signupText: {
    ...FONTS.REGULAR_SMALL_BLACK,
    marginRight: METRICS.TINY,
  },
  subheadingTitle: {
    ...FONTS.SEMIBOLD_LARGE_WHTIE,
  },
});

Signin.propTypes = {
  navigation: any,
};

export default withNavigation(withNoHeader(Signin));
