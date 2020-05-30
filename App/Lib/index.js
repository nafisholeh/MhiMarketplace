import { parseToRupiah, calcDiscount } from "./money";
import { isEmailValid, isEmailError } from "./Email";
import {
  getGraphQLError,
  convertToGraphQLFile,
  extractGraphQLResponse,
  parseUploadablePhoto,
} from "./GraphQL";
import {
  getReadableDate,
  getIntervalTimeToday,
  getIntervalDateToday,
  getUTCDate,
  unixToDate,
  convertMonthToNumber,
  convertMonthToNumberString,
  convertNumberToMonth,
  normalizeDate,
} from "./Date";
import { setTabBarHide } from "./Navigation";
import { moderateScale, screenWidth, screenHeight } from "./Responsive";
import { isString } from "./DataType";
import {
  getReadableAddress,
  getReadableSubdistrict,
  getReadableCityState,
  graphqlToRNPickerSelect,
} from "./Address";
import { InAppNotification } from "./InAppNotification";
import {
  getReadableTotalWeight,
  getAggregateProducts,
  getTotalWeight,
} from "./Product";
import { getUpcomingShippingSched, getReadableShippingSched } from "./Shipping";
import { filterObject } from "./Object";
import {
  reportSentryError,
  addToSentryLog,
  reportSentryLog,
} from "./SentryUtils";
import {
  calcPolygonSize,
  calcPolygonCenter,
  normalizeAreaSize,
  calcZoomFromRegion,
} from "./Map";
import {
  hasLocationPermission,
  requestLocationPermission,
  requestLocationPermissionIOS,
  extractAdministrativeName,
} from "./Location";
import {
  getStateFromAsyncStorage,
  setStateFromAsyncStorage,
} from "./AsyncStorage";
import {
  getFilenameFromPath,
  getFileType,
  combineFilenameMime,
  saveBase64AsImage,
  normalizeServerFileUri,
  generateValidServerFileUri,
} from "./File";
import { capitalizeFirstLetter } from "./String";
import { generateBase64Thumbnail } from "./Image";

export {
  parseToRupiah,
  calcDiscount,
  isEmailValid,
  isEmailError,
  getGraphQLError,
  getReadableDate,
  setTabBarHide,
  moderateScale,
  isString,
  getReadableAddress,
  getReadableSubdistrict,
  getReadableCityState,
  InAppNotification,
  getReadableTotalWeight,
  getReadableShippingSched,
  getUpcomingShippingSched,
  filterObject,
  getIntervalTimeToday,
  getAggregateProducts,
  screenWidth,
  screenHeight,
  graphqlToRNPickerSelect,
  getIntervalDateToday,
  reportSentryError,
  addToSentryLog,
  reportSentryLog,
  getTotalWeight,
  calcPolygonSize,
  extractAdministrativeName,
  getStateFromAsyncStorage,
  setStateFromAsyncStorage,
  calcPolygonCenter,
  normalizeAreaSize,
  convertToGraphQLFile,
  getUTCDate,
  unixToDate,
  getFilenameFromPath,
  getFileType,
  combineFilenameMime,
  generateBase64Thumbnail,
  saveBase64AsImage,
  generateValidServerFileUri,
  normalizeServerFileUri,
  extractGraphQLResponse,
  calcZoomFromRegion,
  capitalizeFirstLetter,
  parseUploadablePhoto,
  convertMonthToNumber,
  convertNumberToMonth,
  convertMonthToNumberString,
  normalizeDate,
  hasLocationPermission,
  requestLocationPermission,
  requestLocationPermissionIOS,
};
