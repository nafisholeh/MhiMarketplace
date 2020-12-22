import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import { NavHeader, ButtonTwosWithIcon, TourModal } from 'common-v3';
import { FONTS, METRICS, IMAGES } from 'themes-v3';
import { moderateScale } from 'Lib';

class KtpPhotoPrepare extends PureComponent {
  KTP_PHOTO_EXAMPLES = [
    IMAGES.KTP_EXAMPLE_1,
    IMAGES.KTP_EXAMPLE_2,
    IMAGES.KTP_EXAMPLE_3,
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
    navigation.navigate('KtpPhotoSuccess');
  };

  onViewOtherExample = () => {
    this.setState((prevState) => {
      return { photoExampleIndex: (prevState.photoExampleIndex + 1) % 3 };
    });
  };

  render() {
    const { photoExampleIndex } = this.state;
    return (
      <TourModal style={styles.container}>
        <NavHeader title="Contoh foto KTP" info="2/7" />
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
  resultExamplePhoto: {
    height: moderateScale(176),
    width: moderateScale(250),
  },
  title: {
    ...FONTS.REGULAR_LARGE_PRIMARY,
    ...{ textAlign: 'center' },
  },
});

KtpPhotoPrepare.propTypes = {
  navigation: any,
};

export default withNavigation(KtpPhotoPrepare);
