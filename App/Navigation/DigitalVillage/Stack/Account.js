import { createStackNavigator } from 'react-navigation';

import Signin from 'digital-village/Containers/Signin/Signin';

const AccountNav = createStackNavigator(
  {
    Signin: { screen: Signin },
  },
  {
    initialRouteName: 'Signin',
  }
);

export default AccountNav;
