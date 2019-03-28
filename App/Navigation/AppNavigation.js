import { createStackNavigator, createAppContainer } from 'react-navigation'
import Signin from '../Containers/Signin/Signin'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  Signin: { screen: Signin },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Signin',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
