import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { withNoHeader } from 'Hoc';
import { NavHeader } from 'common-v3';
import { FONTS, METRICS, IMAGES } from 'themes-v3';
import { moderateScale } from 'Lib';

class KtpTutorial extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <NavHeader title="Input foto KTP" info="2/7" />
        <Text style={styles.title}>Masukkan foto KTP anda</Text>
        <Image source={IMAGES.KTP_PHOTO_TUTORIAL} style={styles.photo} />
        <Text style={styles.desc}>
          Posisikan kamera anda dalam keadaan lanskap/miring
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default withNoHeader(KtpTutorial);
