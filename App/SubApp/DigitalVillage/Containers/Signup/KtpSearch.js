import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { withNoHeader } from 'Hoc';
import { NavHeader } from 'common-v3';
import { FONTS, METRICS, IMAGES } from 'themes-v3';
import { moderateScale } from 'Lib';

class KtpSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <NavHeader title="Pendaftaran" info="1/7" />
        <View style={styles.topSection}>
          <Text style={styles.header}>
            Masukkan nama lengkap/NIK sesuai dengan KTP anda
          </Text>
          <Image
            source={IMAGES.AVATAR_SEARCH_KTP}
            resizeMode="contain"
            style={styles.avatar}
          />
          <Text style={styles.header} />
        </View>
        <View style={styles.bottomSection} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    height: moderateScale(121),
    width: moderateScale(186),
  },
  bottomSection: {
    flex: 1,
  },
  container: { flex: 1 },
  header: {
    ...FONTS.REGULAR_LARGE_PRIMARY,
    ...{
      marginHorizontal: moderateScale(62),
      textAlign: 'center',
    },
  },
  topSection: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default withNoHeader(KtpSearch);
