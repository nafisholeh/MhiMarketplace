import { Dimensions, Platform, PixelRatio } from "react-native";

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

  AREA_INFO_HEIGHT: moderateScale(140),
  AREA_DETAIL_HEIGHT: moderateScale(295),
  AREA_DETAIL_EXPAND_HEIGHT: moderateScale(360),
  AREA_STROKE_WIDTH: 4,
  AREA_ITEM_RADIUS: 8,
  AREA_ITEM_SHADOW_RADIUS: 8,

  MINI_MAP_WIDTH: moderateScale(100),
  MINI_MAP_HEIGHT: moderateScale(110),
  MINI_MAP_EDGE_PADDING: {
    top: 0, //Platform.OS === "ios" ? 200 : PixelRatio.get() * 200 - 50,
    right: 0,
    bottom: Platform.OS === "ios" ? 10 : PixelRatio.get() * 10 - 50,
    left: 0,
  },

  PICKER_BOTTOM_HEIGHT: moderateScale(250),
  INPUT_VERTICAL_SPACING: moderateScale(13),

  BUTTON_TERTIER_RADIUS: moderateScale(7),

  AUTO_SUGGEST_INFO: moderateScale(150),
};

export default metrics;
