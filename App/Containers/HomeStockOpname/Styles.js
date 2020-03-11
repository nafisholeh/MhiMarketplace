import { StyleSheet } from "react-native";
import { METRICS, ApplicationStyles } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: METRICS.SMALL
  },
  logo: {
    marginTop: METRICS.EXTRA_HUGE,
    height: METRICS.IMAGE_XL,
    width: METRICS.IMAGE_XL,
    resizeMode: "contain"
  },
  centered: {
    alignItems: "center"
  },
  section: {
    flex: 1,
    backgroundColor: "white",
    minHeight: 100
  },
  list__title: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 15
  }
});
