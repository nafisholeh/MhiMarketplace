import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { withNoHeader } from 'Hoc';
import { NavHeader, InputText } from 'common-v3';
import { FONTS, METRICS, IMAGES } from 'themes-v3';
import { moderateScale } from 'Lib';

class KtpSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    SplashScreen.hide();
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
          <InputText mode="minimal" />
        </View>
        <View style={styles.bottomSection} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
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
      marginHorizontal: METRICS.HUGE,
      textAlign: 'center',
      alignSelf: 'center',
    },
  },
  topSection: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: METRICS.LARGE,
  },
});

export default withNoHeader(KtpSearch);
