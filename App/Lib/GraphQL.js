import moment from 'moment';
import { ReactNativeFile } from 'apollo-upload-client';

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

/**
 * Convert raw photo format from ImagePicker to a compatible format for uploading a file 
 *
 * @param {string} userId the user ID which upload this file
 * @param {array} photos raw photo list data, e.g. [ {path, mime}, ... ]
 * @return {array} compatible data format for GraphQL upload file
 */
export const convertToGraphQLFile = (userId, photos) => {
  if (Array.isArray(photos) && !photos.length) return null;
  const images = photos.map((item, index) => 
    new ReactNativeFile({
      uri: item.path,
      name: `${moment().format('YYYYMMDDHHmmss')}_${index}_${userId}`,
      type: item.mime
    })
  );
  return images;
};
