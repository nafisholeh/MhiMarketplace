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
import MOCK_KTP from './Mock/ktp';

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
      isKtpFirstOkFound: false,
      isKtpFirstNoFound: false,
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

  renderKtpItemsForGuide = (items) => {
    if (Array.isArray(items) && items.length) {
      return items.map((item, index) => (
        <KtpItems key={index} {...item} onPress={this.onKtpSelected} />
      ));
    }
  };

  renderKtpItems = ({ item, index }) => {
    return <KtpItems {...item} onPress={this.onKtpSelected} />;
  };

  onChangeSearchTerm = (text, name) => {
    this.setState({ searchTerm: text });
  };

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
                  this.renderKtpItemsForGuide(MOCK_KTP)
                ) : (
                  <FlatList
                    keyExtractor={(item) => item._id.toString()}
                    data={MOCK_KTP}
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
