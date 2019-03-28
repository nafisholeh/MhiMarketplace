import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import Home from '../Containers/Home/Home'
import Detail from '../Containers/Product/Detail'

const TabNav = createBottomTabNavigator(
  {
    Home: { screen: Home },
    ProductDetail: { screen: Detail }
  },
  {
    initialRouteName: 'Home'
  }
)

// it actually styles it's parent navigator, i.e. PrimaryNav
TabNav.navigationOptions = ({ navigation }) => {
  return {
    header: null,     // Hide the header from PrimaryNav stack, thus no stacked header should appeared
    gesturesEnabled: false
  }
}

export default TabNav