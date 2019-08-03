import { Colors, Images } from 'Themes';

export default {
  uri: 'http://app-dev.metodehayati.id:4001/graphql',
  // uri: 'http://192.168.1.3:4001/graphql',
  oneSignalKey: "63d5eb55-3ba8-4489-bfba-ce4d74c3bd40",
  sentryKey: 'https://acfc9528eb164f6d8cb3c02a5294b6cd@sentry.io/1498313',
  allowTextFontScaling: true,
  hiddenTabScreen: [
    'ProductDetail',
    'Checkout',
    'AddressList',
    'AddressInput',
    'Slip',
    'Setup',
    'ProductEdit',
    'ProductAdd',
    'OrderDetail',
    'ReadyToProcessDetail',
    'ProcessingDetail',
    'ReadyToSendDetail',
    'SendingDetail',
    'SentDetail',
    'CompletedDetail',
    'ConsumerOrderDetail',
    'ConsumerSendingDetail'
  ],
  pageState: {
    ERROR: 'error',
    INFO: 'info',
    CART: 'cart',
    EMPTY: 'empty',
    EMPTY_CART: 'cart',
    LOCATION: 'location',
    EMPTY_LOCATION: 'location',
    NEED_CHECKOUT: 'cashier',
    NO_ACCOUNT: 'needLogin',
  },
  debounceInterval: 0,
  defaulCourierCost: 25000,
  warningMandatory: 'Wajib diisi',
  userType: {
    KURIR: 'kurir',
    STOK_OPNAME: 'stok opname',
    KEUANGAN: 'keuangan',
    KONSUMEN: 'user',
    RESELLER: 'reseller',
  },
  weightType: {
    KILOGRAM: 'kg',
    GRAM: 'gram',
    PIECES: 'pcs',
  },
  MIN_WEIGHT_FREE_COURIER: 10, 
  timelineTitle: {
    incomplete: 'Checkout pesanan',
    ready_to_process: 'Konsumen konfirmasi pesanan',
    processing: 'Kurir telah konfirmasi pengiriman',
    ready_to_send: 'Barang diambil dari gudang',
    sending: 'Pesanan sedang dikirim',
    complete: 'Barang telah sampai di konsumen'
  },
  notifPurpose: {
    NEW_ORDER: 'newReadyToProcess',
  },
  category: {
    sayuran: {
      title: 'Sayuran',
      icon: Images.veggie,
      color: Colors.veggie_bg,
    },
    buah: {
      title: 'Buah',
      icon: Images.fruit,
      color: Colors.fruit_bg,
    },
    hortikultura: {
      title: 'Hortikultura',
      icon: Images.horti,
      color: Colors.horti_bg,
    },
    default: {
      title: 'Lain-lain',
      icon: Images.veggie,
      color: Colors.veggie_bg,
    },
  }
}
