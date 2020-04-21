import { Dimensions, Platform } from "react-native";

import { moderateScale } from "../Lib/Responsive";

const { width, height } = Dimensions.get("window");

const metrics = {
  TINY: moderateScale(5),
  SMALL: moderateScale(10),
  MEDIUM: moderateScale(15),
  LARGE: moderateScale(20),
  HUGE: moderateScale(25),
  EXTRA_HUGE: moderateScale(50),

  DEVICE_WIDTH: width < height ? width : height,
  DEVICE_HEIGHT: width < height ? height : width,

  NAV_BAR_HEIGHT: Platform.OS === "ios" ? moderateScale(64) : moderateScale(54),

  ICON_TINY: moderateScale(15),
  ICON_SMALL: moderateScale(20),
  ICON_MEDIUM: moderateScale(30),
  ICON_LARGE: moderateScale(45),
  ICON_XL: moderateScale(50),

  IMAGE_SMALL: moderateScale(20),
  IMAGE_MEDIUM: moderateScale(40),
  IMAGE_LARGE: moderateScale(60),
  IMAGE_XL: moderateScale(200),

  RADIUS_SMALL: moderateScale(3),
  RADIUS_MEDIUM: moderateScale(5),
  RADIUS_LARGE: moderateScale(10),

  BORDER_THIN: 0.5,
  BORDER_MEDIUM: 1,
  BORDER_BOLD: 2,

  MODAL_BOTTOM_HEIGHT: moderateScale(140),
  AREA_DETAIL_HEIGHT: moderateScale(160),
  AREA_DETAIL_EXPAND_HEIGHT: moderateScale(295),

  INPUT_VERTICAL_SPACING: moderateScale(10),
};

export default metrics;
