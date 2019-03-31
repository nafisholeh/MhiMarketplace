
/**
 * Get message from a complex error objects
 *
 * @param {object} error object from catch in ApolloClientProvider or GraphQL query and mutation
 * @return {string} graphql errors
 */
 export const getGraphQLError = error => {
  const { graphQLErrors, message } = error;
  if (Array.isArray(graphQLErrors)) {
    if (graphQLErrors.length > 0) {
      const { message } = graphQLErrors[0];
      return message;
    }
  }
  if (message) {
    return message.replace("GraphQL error: ", "");
  }
};