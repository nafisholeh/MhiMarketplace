// Simple React Native specific changes

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  hiddenTabScreen: [
    'ProductDetail',
    'Signin',
    'Signup',
    'Cart'
  ],
  pageState: {
    ERROR: 'error',
    INFO: 'info',
    EMPTY_CART: 'cart',
    CART: 'cart',
  },
  debounceInterval: 2000,
}
