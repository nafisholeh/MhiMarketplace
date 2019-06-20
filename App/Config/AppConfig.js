export default {
  // uri: 'http://app-dev.metodehayati.id:4001/graphql',
  uri: 'http://192.168.1.3:4001/graphql',
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
  userType: {
    KURIR: 'kurir',
    STOK_OPNAME: 'stok opname',
    KEUANGAN: 'keuangan',
    KONSUMEN: 'user',
  },
  weightType: {
    KILOGRAM: 'kg',
    GRAM: 'gram',
    PIECES: 'pcs',
  }
}
