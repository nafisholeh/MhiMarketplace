import { createStackNavigator } from 'react-navigation';

import Signin from 'digital-village/Containers/Signin/Signin';
import KtpSearch from 'digital-village/Containers/Signup/KtpSearch';
import KtpConfirmation from 'digital-village/Containers/Signup/KtpConfirmation';
import KtpTutorial from 'digital-village/Containers/Signup/KtpTutorial';
import KtpPhotoExample from 'digital-village/Containers/Signup/KtpPhotoExample';

const AccountNav = createStackNavigator(
  {
    Signin: { screen: Signin },
    KtpSearch: { screen: KtpSearch },
    KtpConfirmation: { screen: KtpConfirmation },
    KtpTutorial: { screen: KtpTutorial },
    KtpPhotoExample: { screen: KtpPhotoExample },
  },
  {
    initialRouteName: 'Signin',
  }
);

export default AccountNav;
