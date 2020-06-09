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
  IMAGE_COMPRESS_QUALITY: 80,

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
  AREA_ITEM_HEIGHT: moderateScale(100),
  AREA_ITEM_RADIUS: 8,
  AREA_ITEM_SHADOW_RADIUS: 8,

  MINI_MAP_WIDTH: moderateScale(70),
  MINI_MAP_HEIGHT: moderateScale(70),
  MINI_MAP_EDGE_PADDING: {
    top: 0,
    right: 0,
    bottom: Platform.OS === "ios" ? 10 : PixelRatio.get() * 10 - 50,
    left: 0,
  },
  MAP_EDGE_PADDING: {
    top: Platform.OS === "ios" ? 50 : PixelRatio.get() * 50 - 50,
    right: Platform.OS === "ios" ? 50 : PixelRatio.get() * 50 - 50,
    bottom: Platform.OS === "ios" ? 50 : PixelRatio.get() * 50 - 50,
    left: Platform.OS === "ios" ? 50 : PixelRatio.get() * 50 - 50,
  },

  PICKER_BOTTOM_HEIGHT: moderateScale(250),
  INPUT_VERTICAL_SPACING: moderateScale(13),

  BUTTON_TERTIER_RADIUS: moderateScale(7),

  AUTO_SUGGEST_INFO: moderateScale(150),

  FIT_TO_COORDINATES_WAIT_TIME: 1000, // 1 seconds

  GPS_TIMEOUT: 15000,
  GPS_MAXIMUM_AGE: 10000,
  GPS_INTERVAL: 5000,
  GPS_FASTEST_INTERVAL: 2000,
  GPS_HIGH_ACCURACY: true,
  MAP_LATITUDE_DELTA: 0.0922,
  MAP_LONGITUDE_DELTA: 0.0922 * (width / height),

  GPS_ERROR_CODES: {
    PERMISSION_DENIED: 1,
    POSITION_UNAVAILABLE: 2,
    TIMEOUT: 3,
    PLAY_SERVICE_NOT_AVAILABLE: 4,
    SETTINGS_NOT_SATISFIED: 5,
    INTERNAL_ERROR: -1,
  },
};

export default metrics;
