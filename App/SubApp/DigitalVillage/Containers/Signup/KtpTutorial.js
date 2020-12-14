import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import { withNoHeader } from 'Hoc';
import { NavHeader, ButtonTwosWithIcon, Button } from 'common-v3';
import { FONTS, METRICS, IMAGES } from 'themes-v3';
import { moderateScale } from 'Lib';

class KtpTutorial extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isFirstPage: true };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onOpenCamera = () => {
    const { navigation } = this.props;
    navigation.navigate('KtpPhotoExample');
  };

  onNextSection = () => {
    this.setState({ isFirstPage: false });
  };

  render() {
    const { isFirstPage } = this.state;
    return (
      <View style={styles.container}>
        <NavHeader title="Contoh foto KTP" info="2/7" />
        {isFirstPage ? (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>Contoh posisi kamera</Text>
              <Image
                source={IMAGES.KTP_PHOTO_TUTORIAL}
                style={styles.smartphoneExamplePhoto}
              />
              <Text style={styles.desc}>
                Posisikan kamera anda dalam keadaan lanskap/miring
              </Text>
            </View>
            <View>
              <Button text="Lanjut" onPress={this.onNextSection} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>Contoh hasil foto KTP</Text>
              <Image
                source={IMAGES.KTP_EXAMPLE_1}
                style={styles.resultExamplePhoto}
              />
              <Text style={styles.desc}>
                Tekan foto KTP di atas untuk melihat contoh foto KTP lainnya
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
      </View>
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
  },
});

KtpTutorial.propTypes = {
  navigation: any,
};

export default withNavigation(withNoHeader(KtpTutorial));
