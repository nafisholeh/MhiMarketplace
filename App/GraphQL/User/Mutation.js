import gql from "graphql-tag";

export const SIGNIN = gql`
  mutation signin($email: String!, $password: String!, $token: String) {
    signin(email: $email, password: $password, token: $token) {
      _id
      email
      name
      user_type
    }
  }
`;

export const SIGNIN_FARMER = gql`
  mutation signinFarmer($email: String!, $password: String!, $token: String) {
    signinFarmer(email: $email, password: $password, token: $token) {
      _id
      phone
      email
      password
      token
      ktp_nik
      ktp_name
      ktp_birth_place
      ktp_birth_date
      ktp_gender
      ktp_blood_type

      ktp_kecamatan_id
      ktp_address_detail
      ktp_rtrw
      ktp_kodepos
      ktp_kelurahan
      ktp_kecamatan
      ktp_kabupaten
      ktp_provinsi

      ktp_religion
      ktp_marriage_status
      ktp_occupation
      ktp_citizenship
      ktp_expired_date
      ktp_photo_face
      ktp_photo_ktp

      areas {
        type
        status
        size
        polygon
        name
        date_start
        date_end
        commodity {
          name
          description
          photo
        }
      }
    }
  }
`;

export const SIGNOUT = gql`
  mutation signout($user_id: String!) {
    signout(user_id: $user_id) {
      _id
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      _id
      email
      name
      user_type
    }
  }
`;

export const SIGNUP_FARMER = gql`
  mutation signupFarmer(
    $email: String
    $phone: String!
    $password: String!
    $name: String!
  ) {
    signupFarmer(
      email: $email
      phone: $phone
      password: $password
      name: $name
    ) {
      _id
      email
      name
      phone
      user_type
    }
  }
`;

export const ADD_ONE_SIGNAL_TOKEN = gql`
  mutation addOneSignalToken($user_id: String!, $token: String!) {
    addOneSignalToken(user_id: $user_id, token: $token) {
      _id
    }
  }
`;
