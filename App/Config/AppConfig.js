import { Colors, Images } from "Themes";

export const BASIC_RESPONSE = {
  SUCCESS: "sukses",
  FAILED: "gagal",
  NOTHING: "kosong",
};

export const NOTIF_TYPE = {
  NEW_ORDER: "newReadyToProcess",
  REPLY_POST: "reply_post",
  REPLY_COMMENT: "reply_comment",
};

export const ONE_SIGNAL_KEY = "63d5eb55-3ba8-4489-bfba-ce4d74c3bd40";

export const MAP_DRAW_STATE = {
  NOT_READY: "map_zoom_in",
  DRAWING: "map_drawing",
  DRAWING_QUALIFIED: "map_drawing_qualified",
  DRAWING_FINISHED: "map_drawing_finished",
};

export const MAP_DRAW_STATE_INFO = {
  NOT_READY: "Sentuh untuk memulai",
  DRAWING: "Sentuh untuk meletakkan titik area",
  DRAWING_QUALIFIED: [
    "Sentuh untuk meletakkan titik area",
    "Sentuh lama untuk mengakhiri",
  ],
  DRAWING_FINISHED: "Sentuh untuk lanjut isi detil lahan",
};

export const YEAR_RANGE_START = 2005;
export const YEAR_RANGE_END = 2050;

export const MINI_MAP_STYLE = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

export default {
  // uri: 'http://app-dev.metodehayati.id:4001/graphql',
  uri: {
    basic: "http://192.168.1.5:4001/",
    graphql: "http://192.168.1.5:4001/graphql",
    image: "http://192.168.1.5:4001",
  },
  sentryKey: "https://acfc9528eb164f6d8cb3c02a5294b6cd@sentry.io/1498313",
  allowTextFontScaling: true,
  hiddenTabScreen: [
    "ProductDetail",
    "Checkout",
    "AddressList",
    "AddressInput",
    "Slip",
    "Setup",
    "ProductEdit",
    "ProductAdd",
    "OrderDetail",
    "ReadyToProcessDetail",
    "ProcessingDetail",
    "ReadyToSendDetail",
    "SendingDetail",
    "SentDetail",
    "CompletedDetail",
    "ConsumerOrderDetail",
    "ConsumerSendingDetail",
    "EventInput",
    "Signup",
    "SignupFarmerFirst",
    "SignupFarmerSecond",
    "SignupFarmerThird",
    "SignupFarmerFourth",
    "SignupCustomer",
    "SignupScholar",
    "AreaDraw",
    "AreaList",
    "AreaType",
    "AreaCommodity",
    "FarmerFinalConfirm",
    "SopViewer",
    "NewsFeedDetail",
    "NotificationHistory",
  ],
  pageState: {
    ERROR: "error",
    INFO: "info",
    CART: "cart",
    EMPTY: "empty",
    EMPTY_CART: "cart",
    LOCATION: "location",
    EMPTY_LOCATION: "location",
    NEED_CHECKOUT: "cashier",
    NO_ACCOUNT: "needLogin",
  },
  debounceInterval: 0,
  defaulCourierCost: 25000,
  warningMandatory: "Wajib diisi",
  userType: {
    KURIR: "kurir",
    STOK_OPNAME: "stok opname",
    KEUANGAN: "keuangan",
    KONSUMEN: "user",
    RESELLER: "reseller",
    ADMIN: "admin",
    FARMER: "farmer",
  },
  weightType: {
    KILOGRAM: "kg",
    GRAM: "gram",
    PIECES: "pcs",
  },
  MIN_WEIGHT_FREE_COURIER: 10,
  timelineTitle: {
    incomplete: "Checkout pesanan",
    ready_to_process: "Konsumen konfirmasi pesanan",
    processing: "Kurir telah konfirmasi pengiriman",
    ready_to_send: "Barang diambil dari gudang",
    sending: "Pesanan sedang dikirim",
    complete: "Barang telah sampai di konsumen",
  },
  notifPurpose: {
    NEW_ORDER: "newReadyToProcess",
    REPLY_POST: "reply_post",
    REPLY_COMMENT: "reply_comment",
  },
  category: {
    sayuran: {
      title: "Sayuran",
      icon: Images.veggie,
      color: Colors.veggie_bg,
    },
    buah: {
      title: "Buah",
      icon: Images.fruit,
      color: Colors.fruit_bg,
    },
    hortikultura: {
      title: "Hortikultura",
      icon: Images.horti,
      color: Colors.horti_bg,
    },
    default: {
      title: "Lain-lain",
      icon: Images.veggie,
      color: Colors.veggie_bg,
    },
  },
  location: {
    timeout: 900000, // expired time to obtain location, in millisecond
    maximumAge: 900000, // maximum expired time for last location cache, in millisecond
    distanceFilter: 10, // minimum distance from the previous location to exceed before returning a new location, in meters
  },
  gender: [
    {
      label: "Laki-laki",
      value: "L",
    },
    {
      label: "Perempuan",
      value: "P",
    },
  ],
  bloodType: [
    {
      label: "A",
      value: "A",
    },
    {
      label: "B",
      value: "B",
    },
    {
      label: "AB",
      value: "AB",
    },
    {
      label: "O",
      value: "O",
    },
  ],
  marriageStatus: [
    {
      label: "Belum kawin",
      value: "Belum kawin",
    },
    {
      label: "Kawin",
      value: "Kawin",
    },
    {
      label: "Cerai hidup",
      value: "Cerai hidup",
    },
    {
      label: "Cerai mati",
      value: "Cerai mati",
    },
  ],
  expiredDate: [
    {
      label: "Seumur hidup",
      value: "Seumur hidup",
    },
    {
      label: "Isi tanggal...",
      value: "Isi tanggal",
      showManualInput: true,
    },
  ],
  citizenship: [
    {
      label: "WNI",
      value: "WNI",
    },
    {
      label: "Lainnya",
      value: "Lainnya",
      showManualInput: true,
    },
  ],
  ownedArea: "own",
  areaCommodityRequired: ["own", "rent"],
  areaStatus: [
    { label: "Milik sendiri", value: "own" },
    { label: "Sewa", value: "rent" },
    { label: "Disewakan", value: "rented" },
  ],
  areaType: [
    { label: "Sawah", value: "Sawah" },
    { label: "Tegal", value: "Sawah" },
  ],
  month: [
    {
      label: "Januari",
      value: "01",
    },
    {
      label: "Februari",
      value: "02",
    },
    {
      label: "Maret",
      value: "03",
    },
    {
      label: "April",
      value: "04",
    },
    {
      label: "Mei",
      value: "05",
    },
    {
      label: "Juni",
      value: "06",
    },
    {
      label: "Juli",
      value: "07",
    },
    {
      label: "Agustus",
      value: "08",
    },
    {
      label: "September",
      value: "09",
    },
    {
      label: "Oktober",
      value: "10",
    },
    {
      label: "Nopember",
      value: "11",
    },
    {
      label: "Desember",
      value: "12",
    },
  ],
  mapStyle: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#523735",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9b2a6",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#dcd2be",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ae9e90",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#93817c",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a5b076",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#447530",
        },
      ],
    },
    {
      featureType: "road",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#fdfcf8",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#f8c967",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#e9bc62",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#e98d58",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#db8555",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#806b63",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8f7d77",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b9d3c2",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#92998d",
        },
      ],
    },
  ],
};

export {
  NOTIF_TYPE as notifType,
  BASIC_RESPONSE as basicResponse,
  ONE_SIGNAL_KEY as oneSignalKey,
  MAP_DRAW_STATE as mapDrawState,
  MAP_DRAW_STATE_INFO as mapDrawStateInfo,
  YEAR_RANGE_START as yearRangeStart,
  YEAR_RANGE_END as yearRangeEnd,
  MINI_MAP_STYLE as miniMapStyle,
};
