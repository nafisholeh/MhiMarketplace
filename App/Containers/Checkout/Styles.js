import { StyleSheet } from "react-native";
import { METRICS, Colors, ApplicationStyles } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: METRICS.LARGE,
    borderBottomWidth: 0.4,
    borderBottomColor: Colors.brown_light
  },
  image: {
    width: 60,
    height: 75,
    marginRight: METRICS.LARGE
  },
  detail: {
    flex: 1,
    flexDirection: "column"
  }
});
