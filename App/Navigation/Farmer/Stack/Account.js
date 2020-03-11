import { createStackNavigator } from "react-navigation";

import { Images } from "Themes";
import { tabNavOptions } from "Navigation/Tabs/Options";
import styles from "Navigation/Styles/NavigationStyles";

import Signin from "Containers/Signin/Signin";
import AreaCommodity from "SubApp/Farmer/Containers/AreaCommodity";
import AreaType from "SubApp/Farmer/Containers/AreaType";
import AreaDraw from "SubApp/Farmer/Containers/AreaDraw";
import AreaList from "SubApp/Farmer/Containers/AreaList";
import SignupFarmerFirst from "SubApp/Farmer/Containers/Signup/First";
import SignupFarmerSecond from "SubApp/Farmer/Containers/Signup/Second";
import FarmerFinalConfirm from "SubApp/Farmer/Containers/Signup/FinalConfirm";
import NotificationHistory from "SubApp/Farmer/Containers/Socmed/NotificationHistory";
import FarmerProfile from "SubApp/Farmer/Containers/Account/Profile";
import BioList from "SubApp/Farmer/Containers/BioEdit/BioList";

const AccountNav = createStackNavigator(
  {
    Signin: { screen: Signin },
    SignupFarmerFirst: { screen: SignupFarmerFirst },
    SignupFarmerSecond: { screen: SignupFarmerSecond },
    FarmerFinalConfirm: { screen: FarmerFinalConfirm },
    AreaDraw: { screen: AreaDraw },
    AreaList: { screen: AreaList },
    AreaType: { screen: AreaType },
    AreaCommodity: { screen: AreaCommodity },
    NotificationHistory: { screen: NotificationHistory },
    FarmerProfile: { screen: FarmerProfile },
    BioList: { screen: BioList }
  },
  {
    initialRouteName: "SignupFarmerFirst",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

AccountNav.navigationOptions = data => tabNavOptions(data, Images.user);

export default AccountNav;
