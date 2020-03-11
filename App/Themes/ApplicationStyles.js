import FONTS from "./Fonts";
import METRICS from "./Metrics";
import Colors from "./Colors";

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: METRICS.SMALL,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: METRICS.HUGE,
      padding: METRICS.SMALL
    },
    sectionText: {
      paddingVertical: METRICS.LARGE,
      color: Colors.snow,
      marginVertical: METRICS.TINY,
      textAlign: "center"
    },
    subtitle: {
      color: Colors.snow,
      padding: METRICS.TINY,
      marginBottom: METRICS.TINY,
      marginHorizontal: METRICS.TINY
    },
    titleText: {
      fontSize: 14,
      color: Colors.text
    }
  },
  darkLabelContainer: {
    padding: METRICS.TINY,
    paddingBottom: METRICS.LARGE,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: METRICS.SMALL
  },
  darkLabel: {
    color: Colors.snow
  },
  groupContainer: {
    margin: METRICS.TINY,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  sectionTitle: {
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: METRICS.TINY,
    marginTop: METRICS.TINY,
    marginHorizontal: METRICS.SMALL,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: "center",
    textAlign: "center"
  }
};

export default ApplicationStyles;
