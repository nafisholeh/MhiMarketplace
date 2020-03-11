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
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: METRICS.SMALL,
    backgroundColor: Colors.fire,
    borderRadius: METRICS.TINY
  },
  boldLabel: {
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.snow,
    textAlign: "center",
    marginBottom: METRICS.TINY
  },
  label: {
    alignSelf: "center",
    color: Colors.snow,
    textAlign: "center"
  },
  listContent: {
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
