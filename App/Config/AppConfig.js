// Simple React Native specific changes

export default {
  // font scaling override - RN default is on
  oneSignalKey: "63d5eb55-3ba8-4489-bfba-ce4d74c3bd40",
  allowTextFontScaling: true,
  hiddenTabScreen: [
    'ProductDetail',
    'Signin',
    'Signup',
    'Cart',
    'Checkout',
    'AddressList',
    'AddressInput',
    'Slip',
    'Setup',
    'ProductEdit',
    'ProductAdd',
    'OrderDetail'
  ],
  pageState: {
    ERROR: 'error',
    INFO: 'info',
    CART: 'cart',
    EMPTY_CART: 'cart',
    LOCATION: 'location',
    EMPTY_LOCATION: 'location',
    NEED_CHECKOUT: 'cashier',
    NO_ACCOUNT: 'needLogin',
  },
  debounceInterval: 1000,
  defaulCourierCost: 25000,
  warningMandatory: 'Wajib diisi',
}
