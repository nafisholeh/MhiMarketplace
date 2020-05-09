import gql from "graphql-tag";

export const FETCH_COMMODITIES = gql`
  query fetchCommodities {
    commodities {
      _id
      nama
      key
    }
  }
`;

export const AUTO_SUGGEST_COMMODITIES = gql`
  query autoSuggestCommodities($term: String!) {
    autoSuggestCommodities(term: $term) {
      _id
      name
    }
  }
`;
