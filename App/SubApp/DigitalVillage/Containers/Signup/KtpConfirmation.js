import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { withNoHeader } from 'Hoc';
import { NavHeader, Ktp } from 'common-v3';
import { FONTS } from 'themes-v3';

class KtpConfirmation extends PureComponent {
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
        <NavHeader title="Input nama KTP" info="1/7" />
        <Text style={styles.title}>Apa ini data diri anda?</Text>
        <Ktp
          nik="3505141059710432"
          address="Jalan aji mumpung"
          birthDate="BLITAR, 02-09-1980"
          bloodType="AB"
          gender="LAKI-LAKI"
          neighborhood="001"
          hamlet="002"
          name="ANTONO HERMAWAN"
          urbanVillage="SRAGI"
          subDistrict="TALUN"
          religion="ISLAM"
          marriageStatus="KAWIN"
          occupation="PETANI"
          citizenship="WNI"
          expiredDate="SEUMUR HIDUP"
          createdDate="05-06-2012"
          createdDistrict="Blitar"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    ...FONTS.REGULAR_LARGE_PRIMARY,
    ...{ position: 'absolute', top: 90, alignSelf: 'center' },
  },
});

export default withNoHeader(KtpConfirmation);
