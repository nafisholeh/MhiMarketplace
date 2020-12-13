import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import { withNoHeader } from 'Hoc';
import { NavHeader, ButtonTwosWithIcon } from 'common-v3';
import { FONTS, METRICS, IMAGES } from 'themes-v3';
import { moderateScale } from 'Lib';

class KtpTutorial extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onOpenCamera = () => {
    const { navigation } = this.props;
    navigation.navigate('KtpPhotoExample');
  };

  render() {
    return (
      <View style={styles.container}>
        <NavHeader title="Input foto KTP" info="2/7" />
        <View style={styles.container}>
          <Text style={styles.title}>Masukkan foto KTP anda</Text>
          <Image source={IMAGES.KTP_PHOTO_TUTORIAL} style={styles.photo} />
          <Text style={styles.desc}>
            Posisikan kamera anda dalam keadaan lanskap/miring
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  desc: {
    ...FONTS.REGULAR_MEDIUM_PRIMARY,
    ...{
      alignSelf: 'center',
      marginHorizontal: moderateScale(74),
      marginTop: METRICS.EXTRA_HUGE,
      textAlign: 'center',
    },
  },
  photo: {
    alignSelf: 'center',
    height: moderateScale(121),
    marginTop: METRICS.EXTRA_HUGE,
    width: moderateScale(248),
  },
  title: {
    ...FONTS.REGULAR_LARGE_PRIMARY,
    ...{ alignSelf: 'center', marginTop: METRICS.HUGE },
  },
});

KtpTutorial.propTypes = {
  navigation: any,
};

export default withNavigation(withNoHeader(KtpTutorial));
