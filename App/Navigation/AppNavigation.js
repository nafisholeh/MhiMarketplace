import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from '../Containers/Home/Home'
import Detail from '../Containers/Product/Detail'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  Home: { screen: Home },
  ProductDetail: { screen: Detail }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
