import { StyleSheet } from "react-native";

import { METRICS, ApplicationStyles } from "../../Themes/";
import { moderateScale } from "Lib";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  scrollView: {
    // paddingHorizontal: METRICS.SMALL,
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
    // minWidth: 100,
  },
  product__item_content: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  product__item_detail: {
    flex: 1,
    paddingHorizontal: METRICS.SMALL,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  product__item_cart: {
    alignSelf: "flex-end"
  },
  itemImage: {
    width: 20,
    height: 20
  }
});
