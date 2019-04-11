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
    }
  }
`
