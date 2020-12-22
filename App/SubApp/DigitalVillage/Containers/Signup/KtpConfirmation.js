import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import {
  NavHeader,
  Ktp,
  ButtonYesNo,
  TourHighlight,
  TourModal,
} from 'common-v3';
import { FONTS, COLORS, METRICS, IMAGES } from 'themes-v3';
import { moderateScale, screenWidth } from 'Lib';

const TWO_BUTTON_WIDTH = screenWidth / 2;

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
    <View style={styles.ktpGuideWrapper}>
      <Image source={IMAGES.GUIDE_ARROW_UP} style={styles.ktpGuideArrow} />
      <Text style={styles.guideText}>
        Periksa kesesuaian data diri pada KTP anda
      </Text>
    </View>
  );

  renderSecondKtpGuide = () => (
    <View style={styles.ktpGuideWrapper}>
      <Image
        source={IMAGES.HAND_GESTURE}
        resizeMode="contain"
        style={styles.secondKtpArrow}
      />
      <Text style={styles.guideText}>Perbesar KTP jika belum bisa terbaca</Text>
    </View>
  );

  renderButtonYesGuide = () => (
    <View style={styles.buttonGuideWrapper}>
      <Text style={styles.guideText}>
        Sentuh “Verifikasi” apabila data diri anda sudah benar
      </Text>
      <Image
        source={IMAGES.GUIDE_ARROW_DOWN}
        resizeMode="contain"
        style={styles.buttonYesGuideArrow}
      />
    </View>
  );

  renderButtonNoGuide = () => (
    <View style={styles.buttonGuideWrapper}>
      <Text style={styles.guideText}>
        Sentuh “Bukan saya” apabila data diri yang ditampilkan bukan data diri
        anda
      </Text>
      <Image
        source={IMAGES.GUIDE_ARROW_DOWN}
        resizeMode="contain"
        style={styles.buttonNoGuideArrow}
      />
    </View>
  );

  render() {
    return (
      <TourModal totalStep={4} style={styles.container}>
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
              style={styles.firstKtpGuideWrapper}
            >
              <TourHighlight
                step={2}
                isGuideBelowHighlight={true}
                GuideView={this.renderSecondKtpGuide}
                style={styles.secondKtpGuideWrapper}
              >
                {props.children}
              </TourHighlight>
            </TourHighlight>
          )}
        />
        <ButtonYesNo
          yesText="Verifikasi"
          onPressYes={this.onConfirmed}
          TourHighlightYes={(props) => (
            <TourHighlight
              step={3}
              isGuideBelowHighlight={false}
              GuideView={this.renderButtonYesGuide}
            >
              {props.children}
            </TourHighlight>
          )}
          noText="Bukan saya"
          onPressNo={this.onCancelled}
          TourHighlightNo={(props) => (
            <TourHighlight
              step={4}
              isGuideBelowHighlight={false}
              GuideView={this.renderButtonNoGuide}
            >
              {props.children}
            </TourHighlight>
          )}
        />
      </TourModal>
    );
  }
}

const styles = StyleSheet.create({
  buttonGuideWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonNoGuideArrow: {
    alignSelf: 'flex-start',
    height: moderateScale(54),
    marginBottom: METRICS.MEDIUM,
    marginLeft: TWO_BUTTON_WIDTH - moderateScale(35),
    marginTop: METRICS.MEDIUM,
    transform: [{ scaleX: -1 }],
    width: moderateScale(35),
  },
  buttonYesGuideArrow: {
    alignSelf: 'flex-end',
    height: moderateScale(54),
    marginBottom: METRICS.MEDIUM,
    marginRight: TWO_BUTTON_WIDTH - moderateScale(35),
    marginTop: METRICS.MEDIUM,
    width: moderateScale(35),
  },
  container: { flex: 1 },
  firstKtpGuideWrapper: {
    backgroundColor: COLORS.KTP,
    borderRadius: METRICS.LARGE,
    height: moderateScale(207),
    marginHorizontal: METRICS.LARGE,
  },
  guideText: {
    ...FONTS.SEMIBOLD_LARGE_WHITE,
    ...{ textAlign: 'center', marginHorizontal: METRICS.EXTRA_HUGE },
  },
  ktpGuideArrow: {
    height: moderateScale(55),
    marginBottom: METRICS.MEDIUM,
    width: moderateScale(35),
  },
  ktpGuideWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  secondKtpArrow: {
    height: moderateScale(80),
    marginBottom: METRICS.MEDIUM,
    width: moderateScale(200),
  },
  secondKtpGuideWrapper: {
    height: moderateScale(207),
  },
  title: {
    ...FONTS.REGULAR_LARGE_PRIMARY,
    ...{ position: 'absolute', top: moderateScale(110), alignSelf: 'center' },
  },
});

KtpConfirmation.propTypes = {
  navigation: any,
};

export default withNavigation(KtpConfirmation);
