import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import { withNoHeader } from 'Hoc';
import { NavHeader, InputText, InputWithClearButton, Button } from 'common-v3';
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
      isInitPage: true,
      pageTitle: this.PAGE_TITLE.PAGE_ONE,
      searchTerm: '',
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

  renderKtpItems = ({ item, index }) => {
    return <KtpItems {...item} onPress={this.onKtpSelected} />;
  };

  onChangeSearchTerm = (text, name) => {
    this.setState({ searchTerm: text });
  };

  render() {
    const { isInitPage, pageTitle, searchTerm } = this.state;
    return (
      <View style={styles.container}>
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
              <InputWithClearButton
                mode="minimal"
                textAlign="left"
                style={styles.inputTwo}
                onChangeText={this.onChangeSearchTerm}
                value={searchTerm}
              />
            </View>
            <View style={styles.listArea}>
              <Text style={styles.listTitle}>Pilih identitas KTP anda:</Text>
              <View style={styles.listParent}>
                <FlatList
                  keyExtractor={(item) => item._id.toString()}
                  data={MOCK_KTP}
                  renderItem={this.renderKtpItems}
                  contentContainerStyle={styles.list}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </>
        )}
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
    justifyContent: 'flex-end',
  },
  container: { flex: 1 },
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
  },
  inputArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: METRICS.BIG,
    marginHorizontal: METRICS.LARGE,
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
