import { StyleSheet } from "react-native";
import { METRICS, ApplicationStyles } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: METRICS.LARGE
  },
  image: {
    width: 60,
    height: 75,
    marginRight: METRICS.LARGE
  },
  detail: {
    flex: 1,
    flexDirection: "column"
  },
  detailTitle: {},
  detailPrice: {
    marginBottom: METRICS.SMALL
  }
});
