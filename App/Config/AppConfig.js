// Simple React Native specific changes

export default {
  // font scaling override - RN default is on
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
    'Setup'
  ],
  pageState: {
    ERROR: 'error',
    INFO: 'info',
    CART: 'cart',
    EMPTY_CART: 'cart',
    LOCATION: 'location',
    EMPTY_LOCATION: 'location',
    NEED_CHECKOUT: 'cashier',
  },
  debounceInterval: 1000,
  defaulCourierCost: 25000,
}
