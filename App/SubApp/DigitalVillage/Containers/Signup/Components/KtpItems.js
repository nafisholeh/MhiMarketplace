import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { string, func, number } from 'prop-types';

import { ViewShadow } from 'Components';
import { screenWidth, moderateScale, stringToDateWithFormat } from 'Lib';
import { COLORS, METRICS, FONTS } from 'themes-v3';

class KtpItems extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { birthDate: null };
  }

  componentDidMount = () => {
    this.parseBirthDate();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.birth_date !== this.props.birth_date) {
      this.parseBirthDate();
    }
  };

  parseBirthDate = () => {
    const { birth_date } = this.props;
    if (!birth_date) return;
    const date = stringToDateWithFormat(
      birth_date,
      'DD-MM-YYYY',
      'DD MMMM YYYY'
    );
    this.setState({ birthDate: date });
  };

  onPress = () => {
    const { onPress, _id } = this.props;
    if (onPress) onPress(_id);
  };

  render() {
    const { name, nik, is_validated } = this.props;
    const { birthDate } = this.state;
    return (
      <ViewShadow
        width={screenWidth - METRICS.EXTRA_HUGE}
        height={moderateScale(83)}
        borderRadius={METRICS.RADIUS_NORMAL}
        shadowBorderRadiusAndroid={METRICS.RADIUS_NORMAL}
        shadowRadiusAndroid={5}
        shadowOpacityAndroid={0.05}
        posYAndroid={2.2}
        mainColor={COLORS.WHITE}
        shadowColor={COLORS.DROP_SHADOW}
        style={styles.container}
      >
        <TouchableOpacity onPress={this.onPress} style={styles.contentWrapper}>
          <Text
            style={
              is_validated
                ? FONTS.SEMIBOLD_SMALL_PRIMARY
                : FONTS.SEMIBOLD_SMALL_BLACK
            }
          >
            {name}
          </Text>
          <Text
            style={
              is_validated
                ? FONTS.REGULAR_SMALL_PRIMARY
                : FONTS.REGULAR_SMALL_BLACK_TERTIERY
            }
          >
            {nik}
          </Text>
          <Text style={FONTS.REGULAR_SMALL_PRIMARY}>{birthDate || '-'}</Text>
        </TouchableOpacity>
      </ViewShadow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: METRICS.MEDIUM,
    paddingVertical: METRICS.BIG,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: METRICS.LARGE,
  },
});

KtpItems.propTypes = {
  birth_date: string.isRequired,
  name: string.isRequired,
  nik: string.isRequired,
  onPress: func.isRequired,
  _id: number.isRequired,
};

export default KtpItems;
