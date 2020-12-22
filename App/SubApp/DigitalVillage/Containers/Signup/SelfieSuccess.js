import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { any } from 'prop-types';

import { IMAGES, METRICS, FONTS } from 'themes-v3';
import { NavHeader, Button } from 'common-v3';
import { moderateScale } from 'Lib';

class SelfieSuccess extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onProceed = () => {
    const { navigation } = this.props;
    navigation.navigate('Signin');
  };

  onRetakePhoto = () => {
    const { navigation } = this.props;
    navigation.navigate('SelfieTutorial');
  };

  render() {
    return (
      <View style={styles.container}>
        <NavHeader title="Hasil foto selfie KTP" info="3/7" />
        <View style={styles.content}>
          <Text style={styles.title}>Sempurna!</Text>
          <Image
            source={IMAGES.PHOTO_FAILS}
            resizeMode="contain"
            style={styles.photo}
          />
          <View>
            <Text style={styles.desc}>Tidak puas dengan hasil foto?</Text>
            <TouchableOpacity
              onPress={this.onRetakePhoto}
              style={styles.buttonInTextWrapper}
            >
              <Text style={styles.descWrapper}>
                <Text style={styles.desc}>Sentuh untuk</Text>
                <Text style={styles.buttonInText}> foto ulang</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Button text="Lanjut" onPress={this.onProceed} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonInText: {
    ...FONTS.REGULAR_MEDIUM_BLACK_TERTIERY,
    ...{
      textAlign: 'center',
    },
  },
  buttonInTextWrapper: {
    paddingVertical: METRICS.TINY,
  },
  container: { flex: 1 },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: METRICS.EXTRA_HUGE,
    paddingHorizontal: moderateScale(60),
  },
  desc: {
    ...FONTS.REGULAR_MEDIUM_PRIMARY,
    ...{
      textAlign: 'center',
    },
  },
  descWrapper: { textAlign: 'center' },
  photo: {
    height: moderateScale(121),
    width: moderateScale(184),
  },
  title: {
    ...FONTS.SEMIBOLD_LARGE_PRIMARY,
  },
});

SelfieSuccess.propTypes = {
  navigation: any,
};

export default withNavigation(SelfieSuccess);
