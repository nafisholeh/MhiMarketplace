import gql from 'graphql-tag';

export const SIGNIN = gql`
  mutation signin($email: String!, $password: String!, $token: String) {
    signin(email: $email, password: $password, token: $token) {
      _id
      email
      name
      user_type
    }
  }
`

export const SIGNOUT = gql`
  mutation signout($user_id: String!) {
    signout(user_id: $user_id) {
      _id
    }
  }
`

export const SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      _id
      email
      name
      user_type
    }
  }
`

export const ADD_ONE_SIGNAL_TOKEN = gql`
  mutation addOneSignalToken($user_id: String!, $token: String!) {
    addOneSignalToken(user_id: $user_id, token: $token) {
      _id
    }
  }
`
