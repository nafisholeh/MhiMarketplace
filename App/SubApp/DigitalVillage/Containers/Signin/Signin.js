import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';
import { compose } from 'redux';

import { InputTextWithShadow, InputPasswordWithShadow } from 'common-v3';
import { withNoHeader } from 'Hoc';
import { IMAGES, METRICS, FONTS, COLORS } from 'themes-v3';
import { moderateScale } from 'Lib';
import TourModal from './TourModal';
import TourHighlight from './TourHighlight';

class Signin extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  onSignin = () => {};

  onSignup = () => {
    const { navigation } = this.props;
    navigation.navigate('KtpSearch');
  };

  renderGuideView = (props) => (
    <View style={styles.guideWrapper}>
      <Text style={FONTS.BOLD_HUGE_WHITE}>Halo</Text>
      <Image
        source={IMAGES.SIGNIN_GUIDE}
        resizeMode="contain"
        style={{ width: moderateScale(253), height: moderateScale(236) }}
      />
      <Text style={FONTS.BOLD_HUGE_WHITE}>Pengguna baru?</Text>
      <Text style={FONTS.SEMIBOLD_MEDIUM_WHITE}>
        Klik daftar untuk membuat akun
      </Text>
      <Image
        source={IMAGES.GUIDE_ARROW}
        resizeMode="contain"
        style={{ width: moderateScale(108), height: moderateScale(69) }}
      />
    </View>
  );

  render() {
    return (
      <TourModal
        style={styles.container}
        isContentBelowHighlight={false}
        GuideView={this.renderGuideView}
      >
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
            <TourHighlight style={styles.highlight}>
              <TouchableOpacity onPress={this.onSignup} style={styles.signup}>
                <Text style={styles.signupText}>Tidak punya akun?</Text>
                <Text style={styles.signupButton}>Daftar</Text>
              </TouchableOpacity>
            </TourHighlight>
          </View>
        </ImageBackground>
      </TourModal>
    );
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    height: moderateScale(110),
  },
  buttonText: {
    ...FONTS.BOLD_LARGE_BLACK_TERTIERY,
  },
  container: { flex: 1, justifyContent: 'space-between' },
  guideWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },
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
  highlight: {
    alignSelf: 'center',
    paddingHorizontal: METRICS.BIGGER,
    paddingVertical: METRICS.BIG,
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
    marginBottom: METRICS.MEDIUM,
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

export default compose(withNavigation, withNoHeader)(Signin);
