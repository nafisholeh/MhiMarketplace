import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import { withNoHeader } from 'Hoc';
import { NavHeader, Ktp, ButtonYesNo } from 'common-v3';
import { FONTS } from 'themes-v3';
import { moderateScale } from 'Lib';

class KtpConfirmation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onConfirmed = () => {
    const { navigation } = this.props;
    navigation.navigate('KtpTutorial');
  };

  onCancelled = () => {
    const { navigation } = this.props;
    navigation.pop();
  };

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
        <ButtonYesNo
          yesText="Verifikasi"
          onPressYes={this.onConfirmed}
          noText="Bukan saya"
          onPressNo={this.onCancelled}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    ...FONTS.REGULAR_LARGE_PRIMARY,
    ...{ position: 'absolute', top: moderateScale(110), alignSelf: 'center' },
  },
});

KtpConfirmation.propTypes = {
  navigation: any,
};

export default withNavigation(withNoHeader(KtpConfirmation));
