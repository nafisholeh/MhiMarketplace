import { createStackNavigator } from 'react-navigation';

import Signin from 'digital-village/Containers/Signin/Signin';
import KtpSearch from 'digital-village/Containers/Signup/KtpSearch';

const AccountNav = createStackNavigator(
  {
    Signin: { screen: Signin },
    KtpSearch: { screen: KtpSearch },
  },
  {
    initialRouteName: 'KtpSearch',
  }
);

export default AccountNav;
