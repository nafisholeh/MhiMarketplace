import { createStackNavigator } from "react-navigation";

import { Images } from "Themes";
import { tabNavOptions } from "Navigation/Tabs/Options";
import styles from "Navigation/Styles/NavigationStyles";

import Signin from "Containers/Signin/Signin";
import AreaCommodity from "SubApp/Farmer/Containers/Area/AreaCommodity";
import AreaType from "SubApp/Farmer/Containers/Area/AreaType";
import AreaDraw from "SubApp/Farmer/Containers/Area/AreaDraw";
import AreaList from "SubApp/Farmer/Containers/Area/AreaList";
import SignupFarmerFirst from "SubApp/Farmer/Containers/Signup/AccountCredsForm";
import SignupFarmerSecond from "SubApp/Farmer/Containers/Signup/CardIdentityForm";
import SignupFarmerThird from "SubApp/Farmer/Containers/Signup/PhotoForm";
import SignupFarmerFourth from "SubApp/Farmer/Containers/Area/AreaList";
import FarmerFinalConfirm from "SubApp/Farmer/Containers/Signup/FinalConfirm";
import NotificationHistory from "SubApp/Farmer/Containers/Socmed/NotificationHistory";
import FarmerProfile from "SubApp/Farmer/Containers/Account/Profile";
import BioList from "SubApp/Farmer/Containers/BioEdit/BioList";

const AccountNav = createStackNavigator(
  {
    Signin: { screen: Signin },
    SignupFarmerFirst: { screen: SignupFarmerFirst },
    SignupFarmerSecond: { screen: SignupFarmerSecond },
    SignupFarmerThird: { screen: SignupFarmerThird },
    SignupFarmerFourth: { screen: SignupFarmerFourth },
    FarmerFinalConfirm: { screen: FarmerFinalConfirm },
    AreaDraw: { screen: AreaDraw },
    AreaList: { screen: AreaList },
    AreaType: { screen: AreaType },
    AreaCommodity: { screen: AreaCommodity },
    NotificationHistory: { screen: NotificationHistory },
    FarmerProfile: { screen: FarmerProfile },
    BioList: { screen: BioList },
  },
  {
    // initialRouteName: "Signin",
    initialRouteName: "AreaList",
    navigationOptions: {
      headerStyle: styles.header,
    },
  }
);

AccountNav.navigationOptions = (data) => tabNavOptions(data, Images.user);

export default AccountNav;
