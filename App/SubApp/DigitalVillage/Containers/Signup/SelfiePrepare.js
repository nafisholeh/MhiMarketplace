import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import {
  NavHeader,
  ButtonTwosWithIcon,
  TourHighlight,
  TourModal,
} from 'common-v3';
import { FONTS, METRICS, IMAGES } from 'themes-v3';
import { moderateScale, screenWidth } from 'Lib';

const TWO_BUTTON_WIDTH = screenWidth / 2;

class SelfieTutorial extends PureComponent {
  SELFIE_PHOTO_EXAMPLES = [
    IMAGES.SELFIE_EXAMPLE_1,
    IMAGES.SELFIE_EXAMPLE_2,
    IMAGES.SELFIE_EXAMPLE_3,
  ];

  constructor(props) {
    super(props);
    const randomInit = Math.floor(Math.random() * Math.floor(3));
    this.state = { photoExampleIndex: randomInit };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onOpenCamera = () => {
    const { navigation } = this.props;
    navigation.navigate('SelfieFails');
  };

  onViewOtherExample = () => {
    this.setState((prevState) => {
      return { photoExampleIndex: (prevState.photoExampleIndex + 1) % 3 };
    });
  };

  renderKtpExampleGuide = () => {
    return (
      <View style={styles.ktpExampleGuideWrapper}>
        <Image
          source={IMAGES.GUIDE_ARROW_UP}
          style={styles.ktpExampleGuideArrow}
          resizeMode="contain"
        />
        <Text style={styles.ktpExampleGuideText}>
          Sentuh foto selfie KTP untuk melihat contoh foto lain
        </Text>
      </View>
    );
  };

  renderCameraButtonGuide = () => (
    <View style={styles.buttonGuideWrapper}>
      <Text style={styles.guideText}>
        Sentuh “Kamera” untuk mengambil foto dari kamera HP anda
      </Text>
      <Image
        source={IMAGES.GUIDE_ARROW_DOWN}
        resizeMode="contain"
        style={styles.buttonLeftGuideArrow}
      />
    </View>
  );

  renderGalleryButtonGuide = () => (
    <View style={styles.buttonGuideWrapper}>
      <Text style={styles.guideText}>
        Sentuh “Galeri” untuk mengambil foto dari galeri foto HP anda
      </Text>
      <Image
        source={IMAGES.GUIDE_ARROW_DOWN}
        resizeMode="contain"
        style={styles.buttonRightGuideArrow}
      />
    </View>
  );

  render() {
    const { photoExampleIndex } = this.state;
    return (
      <TourModal totalStep={3} style={styles.container}>
        <NavHeader title="Contoh selfie KTP" info="3/7" />
        <View style={styles.content}>
          <Text style={styles.title}>Contoh yang tepat</Text>
          <TourHighlight
            step={1}
            isGuideBelowHighlight={true}
            GuideView={this.renderKtpExampleGuide}
            style={styles.ktpExampleHighlight}
            borderRadius={METRICS.LARGE}
          >
            <TouchableOpacity onPress={this.onViewOtherExample}>
              <Image
                source={this.SELFIE_PHOTO_EXAMPLES[photoExampleIndex || 0]}
                style={styles.resultExamplePhoto}
              />
            </TouchableOpacity>
          </TourHighlight>

          <Text style={styles.desc}>
            Pastikan wajah dan KTP terlihat memenuhi area tangkapan kamera
          </Text>
        </View>
        <View>
          <ButtonTwosWithIcon
            leftText="Kamera"
            rightText="Galeri"
            leftIcon={IMAGES.CAMERA_THUMBNAIL}
            rightIcon={IMAGES.GALLERY_THUMBNAIL}
            onPressLeft={this.onOpenCamera}
            TourHighlightLeft={(props) => (
              <TourHighlight
                step={2}
                isGuideBelowHighlight={false}
                GuideView={this.renderCameraButtonGuide}
              >
                {props.children}
              </TourHighlight>
            )}
            TourHighlightRight={(props) => (
              <TourHighlight
                step={3}
                isGuideBelowHighlight={false}
                GuideView={this.renderGalleryButtonGuide}
              >
                {props.children}
              </TourHighlight>
            )}
          />
        </View>
      </TourModal>
    );
  }
}

const styles = StyleSheet.create({
  buttonGuideWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonLeftGuideArrow: {
    alignSelf: 'flex-start',
    height: moderateScale(54),
    marginBottom: METRICS.MEDIUM,
    marginLeft: TWO_BUTTON_WIDTH - moderateScale(35),
    marginTop: METRICS.MEDIUM,
    transform: [{ scaleX: -1 }],
    width: moderateScale(35),
  },
  buttonRightGuideArrow: {
    alignSelf: 'flex-end',
    height: moderateScale(54),
    marginBottom: METRICS.MEDIUM,
    marginRight: TWO_BUTTON_WIDTH - moderateScale(35),
    marginTop: METRICS.MEDIUM,
    width: moderateScale(35),
  },
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
  guideText: {
    ...FONTS.SEMIBOLD_LARGE_WHITE,
    ...{ textAlign: 'center', marginHorizontal: METRICS.EXTRA_HUGE },
  },
  ktpExampleGuideArrow: { height: moderateScale(55), width: moderateScale(35) },
  ktpExampleGuideText: {
    ...FONTS.SEMIBOLD_LARGE_WHITE,
    ...{ textAlign: 'center' },
  },
  ktpExampleGuideWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: METRICS.EXTRA_HUGE,
  },
  ktpExampleHighlight: { padding: METRICS.MEDIUM },
  resultExamplePhoto: {
    height: moderateScale(176),
    width: moderateScale(250),
  },
  title: {
    ...FONTS.REGULAR_LARGE_PRIMARY,
    ...{ textAlign: 'center' },
  },
});

SelfieTutorial.propTypes = {
  navigation: any,
};

export default withNavigation(SelfieTutorial);
