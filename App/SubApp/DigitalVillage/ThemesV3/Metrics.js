import { moderateScale } from 'Lib';

const metrics = {
  ONE: moderateScale(1.5),
  TINY: moderateScale(4),
  MEDIUM: moderateScale(8),
  BIG: moderateScale(12),
  BIGGER: moderateScale(16),
  LARGE: moderateScale(21),
  HUGE: moderateScale(40),
  EXTRA_HUGE: moderateScale(50),
  RADIUS_NORMAL: moderateScale(8),
  RADIUS_LARGE: moderateScale(20),
  ZOOM_MAX: 1.5,
  ZOOM_MIN: 0.5,
  ZOOM_STEP: 0.25,
  ZOOM_INITIAL: 1,
};

export default metrics;
