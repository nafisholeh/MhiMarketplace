import gql from 'graphql-tag';

export const ADD_ONE_SIGNAL_TOKEN = gql`
  mutation addOneSignalToken($user_id: String!, $token: String!) {
    addOneSignalToken(user_id: $user_id, token: $token) {
      user_id
      token
      updated_at
    }
  }
`