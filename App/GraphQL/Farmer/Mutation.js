import gql from 'graphql-tag';

export const SIGNUP_FARMER = gql`
  mutation signupFarmer($data: UserFarmerInput!, $images: [Upload]) {
    signupFarmer(data: $data, images: $images) {
      _id
    }
  }
`