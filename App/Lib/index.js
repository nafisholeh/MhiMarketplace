import { parseToRupiah, calcDiscount } from './money';
import { isEmailValid, isEmailError } from './Email';
import { getGraphQLError } from './GraphQL';
import { getReadableDate } from './Date';
import { setTabBarHide } from './Navigation';
import { moderateScale } from './Responsive';
import { isString } from './DataType';
import {
  getReadableAddress,
  getReadableSubdistrict,
  getReadableCityState
} from './Address';
import { InAppNotification } from './InAppNotification';

export { 
  parseToRupiah, calcDiscount, isEmailValid, isEmailError, 
  getGraphQLError, getReadableDate, setTabBarHide, moderateScale,
  isString, getReadableAddress, getReadableSubdistrict, getReadableCityState,
  InAppNotification
};