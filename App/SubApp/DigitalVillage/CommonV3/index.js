import { View } from 'react-native';

import InputText from './InputText';
import InputTextWithShadow from './InputTextWithShadow';
import InputPasswordWithShadow from './InputPasswordWithShadow';
import InputWithClearButton from './InputWithClearButton';
import NavHeader from './NavHeader';
import Button from './Button';
import ButtonWithShadow from './ButtonWithShadow';
import ButtonYesNo from './ButtonYesNo';
import ButtonWithIcon from './ButtonWithIcon';
import ButtonTwosWithIcon from './ButtonTwosWithIcon';
import Ktp from './Ktp';
import TourModal from './TourModal';
import TourHighlight from './TourHighlight';

import { withKeyboardAware, withDismissKeyboardOnTap } from 'Hoc';
const KeyboardAwareView = withKeyboardAware(View);
const DismissKeyboardOnTapView = withDismissKeyboardOnTap(View);

export {
  Button,
  ButtonWithShadow,
  ButtonYesNo,
  ButtonWithIcon,
  ButtonTwosWithIcon,
  InputText,
  InputTextWithShadow,
  InputPasswordWithShadow,
  InputWithClearButton,
  NavHeader,
  Ktp,
  TourModal,
  TourHighlight,
  KeyboardAwareView,
  DismissKeyboardOnTapView,
};
