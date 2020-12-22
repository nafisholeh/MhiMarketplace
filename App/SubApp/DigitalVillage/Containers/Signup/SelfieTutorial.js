import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import { NavHeader, Button, TourHighlight, TourModal } from 'common-v3';
import { FONTS, METRICS, IMAGES } from 'themes-v3';
import { moderateScale } from 'Lib';

class SelfieTutorial extends PureComponent {
  componentDidMount() {
    SplashScreen.hide();
  }

  onProceed = () => {
    const { navigation } = this.props;
    navigation.navigate('SelfiePrepare');
  };

  renderSelfiePoseGuide = () => {
    return (
      <View style={styles.selfiePoseGuideWrapper}>
        <Image
          source={IMAGES.SELFIE_PHOTO_GUIDE}
          style={styles.selfieGuideExamplePhoto}
        />
        <Image
          source={IMAGES.GUIDE_ARROW_UP}
          style={styles.selfiePoseGuideArrow}
          resizeMode="contain"
        />
        <Text style={styles.selfiePoseGuideText}>
          Ambil foto selfie KTP sesuai contoh pose pada ilustrasi
        </Text>
      </View>
    );
  };

  render() {
    return (
      <TourModal style={styles.container}>
        <NavHeader title="Contoh selfie KTP" info="3/7" />
        <View style={styles.content}>
          <Text style={styles.title}>Pose di depan kamera</Text>
          <TourHighlight
            step={1}
            isNoHighlight={true}
            GuideView={this.renderSelfiePoseGuide}
            style={styles.selfiePoseHighlight}
          />
          <Image
            source={IMAGES.SELFIE_PHOTO_TUTORIAL}
            style={styles.selfieExamplePhoto}
          />
          <Text style={styles.desc}>
            Posisikan HP dalam keadaan lanskap/miring ketika ambil foto
          </Text>
        </View>
        <View>
          <Button text="Lanjut" onPress={this.onProceed} />
        </View>
      </TourModal>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: METRICS.LARGE,
    paddingHorizontal: moderateScale(60),
  },
  desc: {
    ...FONTS.REGULAR_MEDIUM_PRIMARY,
    ...{
      textAlign: 'center',
    },
  },
  selfieExamplePhoto: {
    height: moderateScale(121),
    width: moderateScale(248),
  },
  selfieGuideExamplePhoto: {
    height: moderateScale(202),
    width: moderateScale(205),
  },
  selfiePoseGuideArrow: {
    height: moderateScale(55),
    marginRight: METRICS.HUGE,
    transform: [{ scaleX: -1 }],
    width: moderateScale(35),
  },
  selfiePoseGuideText: {
    ...FONTS.SEMIBOLD_LARGE_WHITE,
    ...{ textAlign: 'center' },
  },
  selfiePoseGuideWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: METRICS.EXTRA_HUGE,
  },
  selfiePoseHighlight: { height: 0, width: 0 },
  title: {
    ...FONTS.REGULAR_LARGE_PRIMARY,
    ...{ textAlign: 'center' },
  },
});

SelfieTutorial.propTypes = {
  navigation: any,
};

export default withNavigation(SelfieTutorial);
