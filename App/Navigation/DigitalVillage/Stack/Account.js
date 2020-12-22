import { createStackNavigator } from 'react-navigation';

import Signin from 'digital-village/Containers/Signin/Signin';

import KtpSearch from 'digital-village/Containers/Signup/KtpSearch';
import KtpConfirmation from 'digital-village/Containers/Signup/KtpConfirmation';
import KtpPhotoTutorial from 'digital-village/Containers/Signup/KtpPhotoTutorial';
import KtpPhotoPrepare from 'digital-village/Containers/Signup/KtpPhotoPrepare';
import KtpPhotoSuccess from 'digital-village/Containers/Signup/KtpPhotoSuccess';
import KtpPhotoFails from 'digital-village/Containers/Signup/KtpPhotoFails';

import SelfieTutorial from 'digital-village/Containers/Signup/SelfieTutorial';
import SelfieSuccess from 'digital-village/Containers/Signup/SelfieSuccess';
import SelfieFails from 'digital-village/Containers/Signup/SelfieFails';
import SelfiePrepare from 'digital-village/Containers/Signup/SelfiePrepare';

const AccountNav = createStackNavigator(
  {
    Signin: { screen: Signin },
    KtpSearch: { screen: KtpSearch },
    KtpConfirmation: { screen: KtpConfirmation },
    KtpPhotoTutorial: { screen: KtpPhotoTutorial },
    KtpPhotoPrepare: { screen: KtpPhotoPrepare },
    KtpPhotoSuccess: { screen: KtpPhotoSuccess },
    KtpPhotoFails: { screen: KtpPhotoFails },
    SelfieTutorial: { screen: SelfieTutorial },
    SelfieSuccess: { screen: SelfieSuccess },
    SelfieFails: { screen: SelfieFails },
    SelfiePrepare: { screen: SelfiePrepare },
  },
  {
    initialRouteName: 'SelfieTutorial',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

export default AccountNav;
