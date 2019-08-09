import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles } from '../../Themes/';

import { moderateScale } from 'Lib';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  title: {
    color: 'rgba(0,0,0,0.68)',
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    letterSpacing: -0.34,
    marginBottom: moderateScale(6),
  },
})
