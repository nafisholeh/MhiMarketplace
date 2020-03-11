import { StyleSheet } from "react-native";
import {
  ApplicationStyles,
  METRICS,
  Colors
} from "../../../../../DevScreens/DevTheme/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: METRICS.NAV_BAR_HEIGHT,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: METRICS.TINY,
    justifyContent: "center"
  },
  boldLabel: {
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.snow,
    textAlign: "center",
    marginBottom: METRICS.TINY
  },
  label: {
    textAlign: "center",
    color: Colors.snow
  },
  listContent: {
    marginTop: METRICS.SMALL
  }
});
