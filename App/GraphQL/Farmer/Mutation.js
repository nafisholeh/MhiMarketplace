import gql from 'graphql-tag';

export const SIGNUP_FARMER = gql`
  mutation signupFarmer($data: UserFarmerInput!) {
    signupFarmer(data: $data) {
      _id
    }
  }
`