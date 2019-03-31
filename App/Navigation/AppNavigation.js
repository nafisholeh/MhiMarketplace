import { createAppContainer, createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import Signin from '../Containers/Signin/Signin'
import Home from '../Containers/Home/Home'
import Detail from '../Containers/Product/Detail'

import styles from './Styles/NavigationStyles'

const HomeNav = createStackNavigator({
  Home: { screen: Home },
  ProductDetail: { screen: Detail },
  Signin: { screen: Signin },
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: styles.header
  }
})

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
    header: null,     // Hide the header from PrimaryNav stack, thus no stacked header should appeared
    gesturesEnabled: false
  }
}

export default createAppContainer(PrimaryTabNav);