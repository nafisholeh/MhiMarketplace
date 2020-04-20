import { createBottomTabNavigator } from "react-navigation-tabs";

import SopStack from "../Stack/Sop";
import CommoditySocmedStack from "../Stack/CommoditySocmed";
import AccountStack from "../Stack/Account";

const TabNav = createBottomTabNavigator(
  {
    Komoditas: { screen: CommoditySocmedStack },
    SOP: { screen: SopStack },
    Account: { screen: AccountStack },
  },
  {
    initialRouteName: "Account",
    backBehavior: "initialRoute",
  }
);

// it actually styles it's parent navigator, i.e. PrimaryNav
TabNav.navigationOptions = ({ navigation }) => {
  return {
    gesturesEnabled: false,
  };
};

export default TabNav;
