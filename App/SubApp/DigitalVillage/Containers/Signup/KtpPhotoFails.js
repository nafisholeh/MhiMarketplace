import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import { withNoHeader } from 'Hoc';
import { IMAGES, METRICS, FONTS } from 'themes-v3';
import { NavHeader, Button } from 'common-v3';
import { moderateScale } from 'Lib';

class KtpPhotoFails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onProceed = () => {
    const { navigation } = this.props;
    navigation.navigate('KtpTutorial');
  };

  render() {
    return (
      <View style={styles.container}>
        <NavHeader title="Hasil foto KTP" info="2/7" />
        <View style={styles.content}>
          <Text style={styles.title}>Silahkan coba lagi</Text>
          <Image
            source={IMAGES.PHOTO_FAILS}
            resizeMode="contain"
            style={styles.photo}
          />
          <Text style={styles.desc}>
            Pastikan foto tidak buram, pencahayaan cukup dan KTP memenuhi area
            foto
          </Text>
        </View>
        <View>
          <Button text="Coba lagi" onPress={this.onProceed} />
        </View>
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
    marginBottom: METRICS.EXTRA_HUGE,
    paddingHorizontal: moderateScale(60),
  },
  desc: {
    ...FONTS.REGULAR_MEDIUM_PRIMARY,
    ...{
      textAlign: 'center',
    },
  },
  photo: {
    height: moderateScale(121),
    width: moderateScale(184),
  },
  title: {
    ...FONTS.SEMIBOLD_LARGE_PRIMARY,
  },
});

KtpPhotoFails.propTypes = {
  navigation: any,
};

export default withNavigation(withNoHeader(KtpPhotoFails));
