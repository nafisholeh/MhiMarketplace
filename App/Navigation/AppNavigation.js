import { createAppContainer, createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'

import AppConfig from 'Config/AppConfig'
import { setTabBarHide } from 'Lib'

import Signin from 'Containers/Signin/Signin'
import Signup from 'Containers/Signup/Signup'
import Setup from 'Containers/Setup/Setup'
import Home from 'Containers/Home/Home'
import Detail from 'Containers/Product/Detail'
import Cart from 'Containers/Cart/Cart'
import Checkout from 'Containers/Checkout/Checkout'
import AddressList from 'Containers/Address/AddressList';
import AddressInput from 'Containers/Address/AddressInput';
import Slip from 'Containers/Slip/Slip';

import styles from './Styles/NavigationStyles'

const HomeNav = createStackNavigator({
  Home: { screen: Home },
  ProductDetail: { screen: Detail },
  Cart: { screen: Cart },
  Checkout: { screen: Checkout },
  AddressList: { screen: AddressList },
  AddressInput: { screen: AddressInput },
  Signin: { screen: Signin },
  Signup: { screen: Signup },  
  Setup: { screen: Setup },
  Slip: { screen: Slip },
}, {
  initialRouteName: 'Setup',
  navigationOptions: {
    headerStyle: styles.header
  }
})

HomeNav.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: setTabBarHide(navigation, AppConfig.hiddenTabScreen)
  }
}

const PrimaryTabNav = createBottomTabNavigator(
  {
    Home: { screen: HomeNav },
  },
  {
    initialRouteName: 'Home'
  }
)

// it actually styles it's parent navigator, i.e. PrimaryNav
PrimaryTabNav.navigationOptions = ({ navigation }) => {
  return {
    gesturesEnabled: false
  }
}

export default createAppContainer(PrimaryTabNav);