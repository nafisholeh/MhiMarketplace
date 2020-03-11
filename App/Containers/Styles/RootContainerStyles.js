import { StyleSheet } from "react-native";
import { FONTS, METRICS, Colors } from "../../Themes/";

export default StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.background
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: METRICS.SMALL
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: "center"
  }
});
