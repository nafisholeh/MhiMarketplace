import { StyleSheet } from "react-native";
import { METRICS, Colors, ApplicationStyles } from "Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingLeft: METRICS.SMALL,
    paddingRight: METRICS.SMALL
  },
  button: {
    height: 50,
    marginTop: METRICS.LARGE,
    backgroundColor: Colors.green_light,
    paddingVertical: METRICS.SMALL,
    paddingHorizontal: METRICS.SMALL,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTitle: {
    color: Colors.white
  }
});
