import gql from 'graphql-tag'

export const FETCH_ADDRESS = gql`
  query fetchAddress($user_id: ID!) {
    address(user_id: $user_id) {
      _id
      alamat
      rtrw
      kelurahan
      kecamatan
      kota
      provinsi
      kodepos
      selected
    }
  }
`

export const FETCH_SELECTED_ADDRESS = gql`
  query($user_id: ID!) {
    selectedAddress(user_id: $user_id) {
      _id
      alamat
      rtrw
      kelurahan
      kecamatan
      kota
      provinsi
      kodepos
      selected
      location
    }
  }
`

export const FETCH_ALL_PROVINSI = gql`
  query fetchAllProvinsi {
    provinsi {
      key
      nama
    }
  }
`

export const FETCH_KABUPATEN_BY_PROVINSI = gql`
  query fetchKabupatenByProvinsi($prov_key:String!) {
    kabupatenByProvinsi(prov_key: $prov_key) {
      key
      nama
    }
  }
`

export const FETCH_KECAMATAN_BY_KABUPATEN = gql`
  query fetchKecamatanByKabupaten($kab_key:String!) {
    kecamatanByKabupaten(kab_key: $kab_key) {
      _id
      key
      nama
      kelurahan
    }
  }
`
