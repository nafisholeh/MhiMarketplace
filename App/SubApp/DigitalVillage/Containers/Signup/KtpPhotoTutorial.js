import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import {
  NavHeader,
  ButtonTwosWithIcon,
  Button,
  TourHighlight,
  TourModal,
} from 'common-v3';
import { FONTS, METRICS, IMAGES } from 'themes-v3';
import { moderateScale } from 'Lib';

class KtpPhotoTutorial extends PureComponent {
  KTP_PHOTO_EXAMPLES = [
    IMAGES.KTP_EXAMPLE_1,
    IMAGES.KTP_EXAMPLE_2,
    IMAGES.KTP_EXAMPLE_3,
  ];

  constructor(props) {
    super(props);
    const randomInit = Math.floor(Math.random() * Math.floor(3));
    this.state = { isFirstPage: true, photoExampleIndex: randomInit };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onOpenCamera = () => {
    const { navigation } = this.props;
    navigation.navigate('KtpPhotoSuccess');
  };

  onNextSection = () => {
    this.setState({ isFirstPage: false });
  };

  onViewOtherExample = () => {
    this.setState((prevState) => {
      return { photoExampleIndex: (prevState.photoExampleIndex + 1) % 3 };
    });
  };

  renderKtpPoseGuide = () => {
    return (
      <View style={styles.ktpPoseGuideWrapper}>
        <Image
          source={IMAGES.GUIDE_ARROW_UP}
          style={styles.ktpPoseGuideArrow}
          resizeMode="contain"
        />
        <Text style={styles.ktpPoseGuideText}>
          Ambil foto KTP dengan kamera HP sesuai ilustrasi
        </Text>
      </View>
    );
  };

  render() {
    const { isFirstPage, photoExampleIndex } = this.state;
    return (
      <TourModal style={styles.container}>
        <NavHeader title="Contoh foto KTP" info="2/7" />
        {isFirstPage ? (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>Letakkan KTP di depan kamera HP</Text>
              <TourHighlight
                step={1}
                isGuideBelowHighlight={true}
                GuideView={this.renderKtpPoseGuide}
                style={styles.ktpPoseHighlight}
                borderRadius={METRICS.LARGE}
              >
                <Image
                  source={IMAGES.KTP_PHOTO_TUTORIAL}
                  style={styles.smartphoneExamplePhoto}
                />
              </TourHighlight>
              <Text style={styles.desc}>
                Posisikan HP dalam keadaan lanskap/miring ketika ambil foto
              </Text>
            </View>
            <View>
              <Button text="Lanjut" onPress={this.onNextSection} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>Contoh yang tepat</Text>
              <TouchableOpacity onPress={this.onViewOtherExample}>
                <Image
                  source={this.KTP_PHOTO_EXAMPLES[photoExampleIndex || 0]}
                  style={styles.resultExamplePhoto}
                />
              </TouchableOpacity>

              <Text style={styles.desc}>
                Sentuh foto KTP di atas untuk melihat contoh lainnya
              </Text>
            </View>
            <View>
              <ButtonTwosWithIcon
                leftText="Kamera"
                rightText="Galeri"
                leftIcon={IMAGES.CAMERA_THUMBNAIL}
                rightIcon={IMAGES.GALLERY_THUMBNAIL}
                onPressLeft={this.onOpenCamera}
              />
            </View>
          </>
        )}
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
  ktpPoseGuideArrow: { height: moderateScale(55), width: moderateScale(35) },
  ktpPoseGuideText: {
    ...FONTS.SEMIBOLD_LARGE_WHITE,
    ...{ textAlign: 'center' },
  },
  ktpPoseGuideWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: METRICS.EXTRA_HUGE,
  },
  ktpPoseHighlight: {
    padding: METRICS.TINY,
  },
  resultExamplePhoto: {
    height: moderateScale(176),
    width: moderateScale(250),
  },
  smartphoneExamplePhoto: {
    height: moderateScale(121),
    width: moderateScale(248),
  },
  title: {
    ...FONTS.REGULAR_LARGE_PRIMARY,
    ...{ textAlign: 'center' },
  },
});

KtpPhotoTutorial.propTypes = {
  navigation: any,
};

export default withNavigation(KtpPhotoTutorial);
