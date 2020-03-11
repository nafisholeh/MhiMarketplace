import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const metrics = {
  TINY: 5,
  SMALL: 10,
  MEDIUM: 15,
  LARGE: 20,
  HUGE: 25,
  EXTRA_HUGE: 50,

  DEVICE_WIDTH: width < height ? width : height,
  DEVICE_HEIGHT: width < height ? height : width,

  NAV_BAR_HEIGHT: Platform.OS === "ios" ? 64 : 54,

  ICON_TINY: 15,
  ICON_SMALL: 20,
  ICON_MEDIUM: 30,
  ICON_LARGE: 45,
  ICON_XL: 50,

  IMAGE_SMALL: 20,
  IMAGE_MEDIUM: 40,
  IMAGE_LARGE: 60,
  IMAGE_XL: 200
};

export default metrics;
