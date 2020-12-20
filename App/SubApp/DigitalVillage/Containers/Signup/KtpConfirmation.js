import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import { withNoHeader } from 'Hoc';
import {
  NavHeader,
  Ktp,
  ButtonYesNo,
  TourHighlight,
  TourModal,
} from 'common-v3';
import { FONTS, COLORS, METRICS, IMAGES } from 'themes-v3';
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

  renderFirstKtpGuide = () => (
    <View style={styles.firstKtpGuideWrapper}>
      <Image source={IMAGES.GUIDE_ARROW_UP} style={styles.firstKtpArrow} />
      <Text style={styles.firstKtpText}>
        Periksa kesesuaian data diri pada KTP anda
      </Text>
    </View>
  );

  render() {
    return (
      <TourModal totalStep={1} style={styles.container}>
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
          CustomContentWrapper={(props) => (
            <TourHighlight
              step={1}
              isGuideBelowHighlight={true}
              GuideView={this.renderFirstKtpGuide}
              style={{
                backgroundColor: COLORS.KTP,
                borderRadius: METRICS.LARGE,
                height: moderateScale(207),
                marginHorizontal: METRICS.LARGE,
              }}
            >
              {props.children}
            </TourHighlight>
          )}
        />
        <ButtonYesNo
          yesText="Verifikasi"
          onPressYes={this.onConfirmed}
          noText="Bukan saya"
          onPressNo={this.onCancelled}
        />
      </TourModal>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  firstKtpArrow: {
    height: moderateScale(55),
    marginBottom: METRICS.MEDIUM,
    width: moderateScale(35),
  },
  firstKtpGuideWrapper: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: moderateScale(68),
  },
  firstKtpText: { ...FONTS.SEMIBOLD_LARGE_WHITE, ...{ textAlign: 'center' } },
  title: {
    ...FONTS.REGULAR_LARGE_PRIMARY,
    ...{ position: 'absolute', top: moderateScale(110), alignSelf: 'center' },
  },
});

KtpConfirmation.propTypes = {
  navigation: any,
};

export default withNavigation(withNoHeader(KtpConfirmation));
