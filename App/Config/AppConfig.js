import { Colors, Images } from 'Themes';

export default {
  uri: 'http://app-dev.metodehayati.id:4001/graphql',
  // uri: 'http://192.168.1.2:4001/graphql',
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
    'ConsumerSendingDetail',
    'EventInput',
    'Signup',
    'SignupFarmerFirst',
    'SignupFarmerSecond',
    'SignupFarmerThird',
    'SignupCustomer',
    'SignupScholar',
    'AreaDraw',
    'AreaList',
    'AreaType',
    'AreaCommodity',
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
    ADMIN: 'admin',
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
  },
  location: {
    timeout: 900000,        // expired time to obtain location, in millisecond
    maximumAge: 900000,     // maximum expired time for last location cache, in millisecond
    distanceFilter: 10,  // minimum distance from the previous location to exceed before returning a new location, in meters
  },
  gender: [
    {
      label: 'Laki-laki',
      value: 'L',
    },
    {
      label: 'Perempuan',
      value: 'P',
    }
  ],
  bloodType: [
    {
      label: 'A',
      value: 'A',
    },
    {
      label: 'B',
      value: 'B',
    },
    {
      label: 'AB',
      value: 'AB',
    },
    {
      label: 'O',
      value: 'O',
    }
  ],
  religion: [
    {
      label: 'Islam',
      value: 'Islam',
    },
    {
      label: 'Kristen',
      value: 'Kristen',
    },
    {
      label: 'Katholik',
      value: 'Katholik',
    },
    {
      label: 'Hindu',
      value: 'Hindu',
    },
    {
      label: 'Budha',
      value: 'Budha',
    },
    {
      label: 'Khong Hucu',
      value: 'Khong Hucu',
    },
    {
      label: 'Penghayat kepercayaan',
      value: 'Penghayat Kepercayaan',
      showManualInput: true,
    },
    {
      label: 'Lainnya',
      value: 'Lainnya',
      showManualInput: true,
    },
  ],
  marriageStatus: [
    {
      label: 'Belum kawin',
      value: 'Belum kawin',
    },
    {
      label: 'Kawin',
      value: 'Kawin',
    },
    {
      label: 'Cerai hidup',
      value: 'Cerai hidup',
    },
    {
      label: 'Cerai mati',
      value: 'Cerai mati',
    }
  ],
  occupation: [
    {
      label: 'Petani/Pekebun',
      value: 'Petani/Pekebun',
    },
    {
      label: 'Peternak',
      value: 'Peternak',
    },
    {
      label: 'Nelayan/Perikanan',
      value: 'Nelayan/Perikanan',
    },
    {
      label: 'Karyawan swasta',
      value: 'Karyawan swasta',
    },
    {
      label: 'Karyawan BUMN',
      value: 'Karyawan BUMN',
    },
    {
      label: 'Karyawan BUMD',
      value: 'Karyawan BUMD',
    },
    {
      label: 'Karyawan honorer',
      value: 'Karyawan honorer',
    },
    {
      label: 'Buruh harian lepas',
      value: 'Buruh harian lepas',
    },
    {
      label: 'Buruh tani/perkebunan',
      value: 'Buruh tani/perkebunan',
    },
    {
      label: 'Buruh nelayan/perikanan',
      value: 'Buruh nelayan/perikanan',
    },
    {
      label: 'Buruh peternakan',
      value: 'Buruh peternakan',
    },
    {
      label: 'Dosen',
      value: 'Dosen',
    },
    {
      label: 'Guru',
      value: 'Guru',
    },
    {
      label: 'Pelaut',
      value: 'Pelaut',
    },
    {
      label: 'Pedagang',
      value: 'Pedagang',
    },
    {
      label: 'Perangkat desa',
      value: 'Perangkat desa',
    },
    {
      label: 'Kepala desa',
      value: 'Kepala desa',
    },
    {
      label: 'Wiraswasta',
      value: 'Wiraswasta',
    },
    {
      label: 'Lainnya',
      value: 'Lainnya',
      showManualInput: true,
    }
  ],
  citizenship: [
    {
      label: 'WNI',
      value: 'WHI',
    },
    {
      label: 'Lainnya',
      value: 'Lainnya',
      showManualInput: true,
    }
  ],
  month: [
    {
      label: 'Januari',
      value: '01',
    },
    {
      label: 'Februari',
      value: '02',
    },
    {
      label: 'Maret',
      value: '03',
    },
    {
      label: 'April',
      value: '04',
    },
    {
      label: 'Mei',
      value: '05',
    },
    {
      label: 'Juni',
      value: '06',
    },
    {
      label: 'Juli',
      value: '07',
    },
    {
      label: 'Agustus',
      value: '08',
    },
    {
      label: 'September',
      value: '09',
    },
    {
      label: 'Oktober',
      value: '10',
    },
    {
      label: 'Nopember',
      value: '11',
    },
    {
      label: 'Desember',
      value: '12',
    },
  ],
  commodity: [
    {
      label: 'Lombok',
      value: 'lombok',
    },
    {
      label: 'Padi',
      value: 'padi',
    },
    {
      label: 'Lainnya',
      value: 'lainnya',
      showManualInput: true,
    }
  ]
}
