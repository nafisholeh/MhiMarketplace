import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { withNoHeader } from 'Hoc';
import { NavHeader } from 'common-v3';
import { FONTS, IMAGES, METRICS } from 'themes-v3';
import { moderateScale } from 'Lib';
import HeaderGradient from './Components/HeaderGradient';

class KtpPhotoExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <HeaderGradient />
        <NavHeader title="Contoh foto KTP" info="2/7" mode="invert" />
        <Text style={styles.title}>Contoh yang benar</Text>
        <Image
          source={IMAGES.KTP_EXAMPLE_1}
          resizeMode="contain"
          style={styles.photoPreview}
        />
        <Text style={styles.carouselTitle}>
          Geser untuk melihat contoh lainnya
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselTitle: {
    ...FONTS.REGULAR_SMALL_PRIMARY,
    ...{ alignSelf: 'center', marginBottom: METRICS.MEDIUM },
  },
  photoPreview: {
    alignSelf: 'center',
    height: moderateScale(212),
    marginBottom: METRICS.EXTRA_HUGE,
    width: moderateScale(300),
  },
  title: {
    ...FONTS.SEMIBOLD_LARGE_WHTIE,
    ...{ alignSelf: 'center', marginBottom: METRICS.BIGGER },
  },
});

export default withNoHeader(KtpPhotoExample);
