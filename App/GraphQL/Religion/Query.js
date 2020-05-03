import gql from "graphql-tag";

export const SEARCH_RELIGION = gql`
  query searchReligion($term: String!) {
    searchReligion(term: $term) {
      _id
      name
      date_added
    }
  }
`;
