import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import { withNoHeader } from 'Hoc';
import {
  NavHeader,
  InputText,
  InputWithClearButton,
  Button,
  TourModal,
  TourHighlight,
} from 'common-v3';
import { FONTS, METRICS, IMAGES } from 'themes-v3';
import { moderateScale } from 'Lib';
import KtpItems from './Components/KtpItems';
import MOCK_TEMP_KTP from './Mock/ktp';

class KtpSearch extends PureComponent {
  PAGE_TITLE = {
    PAGE_ONE: 'Pendaftaran',
    PAGE_TWO: 'Input nama KTP',
  };

  constructor(props) {
    super(props);
    this.state = {
      isInitPage: false,
      pageTitle: this.PAGE_TITLE.PAGE_ONE,
      searchTerm: '',
      isInGuideMode: true,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onProceed = () => {
    this.setState({ isInitPage: false, pageTitle: this.PAGE_TITLE.PAGE_TWO });
  };

  onKtpSelected = ({ _id }) => {
    const { navigation } = this.props;
    navigation.navigate('KtpConfirmation');
  };

  renderKtpItemsForGuide = () => {
    const guideAvailableKtp = {
      _id: 1,
      name: 'Antono Hermawan',
      nik: '3505141059710432',
      birth_date: '20-11-1980',
      is_validated: false,
    };
    const guideValidatedKtp = {
      _id: 2,
      name: 'Antono Sukito',
      nik: '3505141084895009',
      birth_date: '15-07-1970',
      is_validated: true,
    };
    return (
      <View>
        <TourHighlight
          isGuideBelowHighlight={true}
          GuideView={this.renderAvailableKtp}
          style={{
            paddingBottom: METRICS.BIGGER,
            marginHorizontal: METRICS.BIG,
            borderRadius: moderateScale(10),
          }}
        >
          <KtpItems key={0} {...guideAvailableKtp} />
        </TourHighlight>
        <KtpItems key={1} {...guideValidatedKtp} />
      </View>
    );
  };

  renderKtpItems = ({ item, index }) => {
    return <KtpItems {...item} onPress={this.onKtpSelected} />;
  };

  onChangeSearchTerm = (text, name) => {
    this.setState({ searchTerm: text });
  };

  renderAvailableKtp = () => (
    <View style={styles.inputGuideWrapper}>
      <Image source={IMAGES.GUIDE_ARROW_UP} style={styles.inputGuideArrow} />
      <Text style={styles.availableKtpGuideText}>Akun Tersedia</Text>
      <Text style={styles.availableKtpGuideSubText}>
        Pilih nama, NIK dan tanggal lahir yang sesuai dengan data di KTP anda
      </Text>
    </View>
  );

  renderInputGuide = () => {
    return (
      <View style={styles.inputGuideWrapper}>
        <Image source={IMAGES.GUIDE_ARROW_UP} style={styles.inputGuideArrow} />
        <Text style={styles.inputGuideText}>
          Sentuh dan ketik ulang jika ingin mencari KTP lagi
        </Text>
      </View>
    );
  };

  render() {
    const { isInitPage, pageTitle, searchTerm, isInGuideMode } = this.state;
    return (
      <TourModal style={styles.container}>
        <NavHeader title={pageTitle} info="1/7" />
        {isInitPage ? (
          <>
            <View style={styles.topSection}>
              <Text style={styles.headerPageOne}>
                Masukkan nama lengkap/NIK sesuai dengan KTP anda
              </Text>
              <Image
                source={IMAGES.AVATAR_SEARCH_KTP}
                resizeMode="contain"
                style={styles.avatar}
              />
              <InputText
                mode="minimal"
                onChangeText={this.onChangeSearchTerm}
                value={searchTerm}
              />
            </View>
            <View style={styles.bottomSection}>
              <Button text="Lanjut" onPress={this.onProceed} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.inputArea}>
              <Text style={styles.headerPageTwo}>
                Masukkan nama lengkap/NIK sesuai dengan KTP anda:
              </Text>
              <TourHighlight
                isGuideBelowHighlight={true}
                GuideView={this.renderInputGuide}
                style={styles.guideInput}
              >
                <InputWithClearButton
                  mode="minimal"
                  textAlign="left"
                  style={styles.inputTwo}
                  onChangeText={this.onChangeSearchTerm}
                  value={searchTerm}
                />
              </TourHighlight>
            </View>
            <View style={styles.listArea}>
              <Text style={styles.listTitle}>Pilih identitas KTP anda:</Text>
              <View style={styles.listParent}>
                {isInGuideMode ? (
                  this.renderKtpItemsForGuide()
                ) : (
                  <FlatList
                    keyExtractor={(item) => item._id.toString()}
                    data={MOCK_TEMP_KTP}
                    renderItem={this.renderKtpItems}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                  />
                )}
              </View>
            </View>
          </>
        )}
      </TourModal>
    );
  }
}

const styles = StyleSheet.create({
  availableKtpGuideSubText: {
    ...FONTS.SEMIBOLD_LARGE_WHITE,
    ...{
      textAlign: 'center',
      marginTop: METRICS.TINY,
    },
  },
  availableKtpGuideText: {
    ...FONTS.BOLD_EXTRALARGE_WHITE,
    ...{
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
  },
  avatar: {
    alignSelf: 'center',
    height: moderateScale(121),
    width: moderateScale(186),
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: { flex: 1 },
  guideInput: {
    marginHorizontal: METRICS.MEDIUM,
    paddingHorizontal: METRICS.BIG,
  },
  headerPageOne: {
    ...FONTS.REGULAR_LARGE_PRIMARY,
    ...{
      marginHorizontal: METRICS.HUGE,
      textAlign: 'center',
      alignSelf: 'center',
    },
  },
  headerPageTwo: {
    ...FONTS.REGULAR_SMALL_PRIMARY,
    ...{ marginHorizontal: METRICS.LARGE },
  },
  inputArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: METRICS.BIG,
  },
  inputGuideArrow: { height: moderateScale(55), width: moderateScale(35) },
  inputGuideText: {
    ...FONTS.SEMIBOLD_LARGE_WHITE,
    ...{ textAlign: 'center', marginTop: METRICS.MEDIUM },
  },
  inputGuideWrapper: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: moderateScale(30),
  },
  inputTwo: {
    ...FONTS.INPUT_VALUE,
    ...{
      flex: 1,
    },
  },
  list: {
    paddingBottom: METRICS.HUGE,
  },
  listArea: {
    flex: 1,
  },
  listParent: {
    flex: 1,
  },
  listTitle: {
    ...FONTS.REGULAR_SMALL_PRIMARY,
    ...{
      marginHorizontal: METRICS.LARGE,
    },
  },
  topSection: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: METRICS.LARGE,
  },
});

KtpSearch.propTypes = {
  navigation: any,
};

export default withNavigation(withNoHeader(KtpSearch));
