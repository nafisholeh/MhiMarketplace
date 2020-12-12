import { moderateScale } from 'Lib';

const metrics = {
  ONE: moderateScale(1.5),
  TINY: moderateScale(4),
  MEDIUM: moderateScale(8),
  BIG: moderateScale(12),
  LARGE: moderateScale(21),
  HUGE: moderateScale(40),
  EXTRA_HUGE: moderateScale(50),
  RADIUS_NORMAL: moderateScale(8),
  RADIUS_LARGE: moderateScale(20),
};

export default metrics;
