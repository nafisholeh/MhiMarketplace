import Colors from "./Colors";

import { moderateScale } from "../Lib/Responsive";

export default {
  PAGE_TITLE: {
    fontFamily: "CircularStd-Bold",
    fontSize: 20,
    color: "rgba(0,0,0,0.8)",
    letterSpacing: 0.3,
    marginLeft: moderateScale(15),
    marginTop: moderateScale(15),
    marginBottom: moderateScale(12)
  },
  HEADER_BOLD: {
    fontFamily: "CircularStd-Bold",
    fontSize: 20,
    color: Colors.black,
    letterSpacing: 0.3
  },
  HEADER_NORMAL: {
    fontFamily: "CircularStd-Book",
    fontSize: 18,
    color: "rgba(0,0,0,0.68)",
    letterSpacing: 0.3
  },
  HEADER_SMALL: {
    fontFamily: "CircularStd-Book",
    fontSize: 16,
    color: "rgba(0,0,0,0.3)",
    letterSpacing: 0.3
  },
  BODY_BOLD: {
    fontFamily: "CircularStd-Bold",
    fontSize: 16,
    color: Colors.black,
    letterSpacing: 0.3
  },
  BODY_NORMAL: {
    fontFamily: "CircularStd-Book",
    fontSize: 14,
    color: "rgba(0,0,0,0.68)",
    letterSpacing: 0.3
  },
  BODY_SMALL: {
    fontFamily: "CircularStd-Book",
    fontSize: 12,
    color: "rgba(0,0,0,0.3)",
    letterSpacing: 0.3
  },
  INSTRUCTION: {
    fontFamily: "CircularStd-Book",
    fontSize: 18,
    color: Colors.disabled_light,
    textAlign: "center",
    lineHeight: 30,
    letterSpacing: 1.5
  }
};
