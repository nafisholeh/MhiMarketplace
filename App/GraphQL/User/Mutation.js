import gql from 'graphql-tag';

export const SIGNIN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      _id
      email
      name
    }
  }
`

export const SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      _id
      email
      name
    }
  }
`