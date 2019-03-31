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