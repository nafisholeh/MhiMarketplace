import gql from 'graphql-tag';

export const SIGNUP_FARMER = gql`
  mutation signupFarmer($data: UserFarmerInput!) {
    signupFarmer(data: $data) {
      _id
    }
  }
`

export const POST_AS_FARMER = gql`
  mutation postAsFarmer($data: CreateFarmerPostInput) {
    postAsFarmer(data: $data) {
      _id
    }
  }
`