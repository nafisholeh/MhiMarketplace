import gql from "graphql-tag";

export const SEARCH_OCCUPATION = gql`
  query searchOccupation($term: String!) {
    searchOccupation(term: $term) {
      _id
      name
      date_added
    }
  }
`;
