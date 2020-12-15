import { createStackNavigator } from 'react-navigation';

import Signin from 'digital-village/Containers/Signin/Signin';

import KtpSearch from 'digital-village/Containers/Signup/KtpSearch';
import KtpConfirmation from 'digital-village/Containers/Signup/KtpConfirmation';
import KtpTutorial from 'digital-village/Containers/Signup/KtpTutorial';
import PhotoSuccess from 'digital-village/Containers/Signup/PhotoSuccess';
import PhotoFailure from 'digital-village/Containers/Signup/PhotoFailure';

import SelfieTutorial from 'digital-village/Containers/Signup/SelfieTutorial';
import SelfieSuccess from 'digital-village/Containers/Signup/SelfieSuccess';
import SelfieFails from 'digital-village/Containers/Signup/SelfieFails';

const AccountNav = createStackNavigator(
  {
    Signin: { screen: Signin },
    KtpSearch: { screen: KtpSearch },
    KtpConfirmation: { screen: KtpConfirmation },
    KtpTutorial: { screen: KtpTutorial },
    PhotoSuccess: { screen: PhotoSuccess },
    PhotoFailure: { screen: PhotoFailure },
    SelfieTutorial: { screen: SelfieTutorial },
    SelfieSuccess: { screen: SelfieSuccess },
    SelfieFails: { screen: SelfieFails },
  },
  {
    initialRouteName: 'SelfieFails',
  }
);

export default AccountNav;
