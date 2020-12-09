import React, { PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
import { string } from 'prop-types';

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

  render() {
    const { name, nik } = this.props;
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
        styleChildren={styles.contentWrapper}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.nik}>{nik}</Text>
        <Text style={styles.birthDate}>{birthDate || '-'}</Text>
      </ViewShadow>
    );
  }
}

const styles = StyleSheet.create({
  birthDate: {
    ...FONTS.REGULAR_SMALL_PRIMARY,
  },
  container: {
    marginBottom: METRICS.MEDIUM,
    paddingVertical: METRICS.BIG,
  },
  contentWrapper: {
    justifyContent: 'center',
    paddingHorizontal: METRICS.LARGE,
  },
  name: {
    ...FONTS.SEMIBOLD_SMALL_BLACK,
  },
  nik: {
    ...FONTS.REGULAR_SMALL_BLACK_TERTIERY,
  },
});

KtpItems.propTypes = {
  birth_date: string.isRequired,
  name: string.isRequired,
  nik: string.isRequired,
};

export default KtpItems;
