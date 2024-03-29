import moment from "moment";
import { ReactNativeFile } from "apollo-upload-client";

import { saveBase64AsImage, combineFilenameMime } from "./File";
import { generateBase64Thumbnail } from "./Image";

/**
 * Get message from a complex error objects
 *
 * @param {object} error object from catch in ApolloClientProvider or GraphQL query and mutation
 * @return {string} graphql errors
 */
export const getGraphQLError = (error) => {
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
  const images = photos.map(
    (item, index) =>
      new ReactNativeFile({
        uri: item.path,
        name: `${moment().format("YYYYMMDDHHmmss")}_${index}_${userId}`,
        type: item.mime,
      })
  );
  return images;
};

/**
 * Get the actual object of the response through React Component
 *
 * @param {any} res { [name]: { actual object } } or { data: { [name]: { actual object } } }
 * @return {object} the actual object filled with the needed data
 */
export const extractGraphQLResponse = (res) => {
  if (!res) return null;
  const firstParent = Object.values(res);
  const firstChild =
    Array.isArray(firstParent) && firstParent.length ? firstParent[0] : null;
  if (!firstChild) return null;
  const actualObject = Object.values(firstChild);
  if (Array.isArray(actualObject) && actualObject.length === 1) {
    return Array.isArray(actualObject) && actualObject.length
      ? actualObject[0]
      : null;
  } else if (Array.isArray(actualObject) && actualObject.length > 1) {
    return firstChild;
  }
  return null;
};

/**
 * parse photo to be uploadable through GraphQL upload mechanism
 *
 * @param {any} input
 * @param {string} key
 */
export const parseUploadablePhoto = async (input, key, options) => {
  if (!input || !key) return [];
  const { isThumbnail } = options || {};

  let parsedInput = input;
  if (Array.isArray(input)) {
    parsedInput = input[0];
  }
  const { mime, data } = parsedInput || {};
  let parsedMime = mime;
  let parsedData = data;

  if (isThumbnail) {
    const { data: thumbnail } = await generateBase64Thumbnail(parsedData, mime);
    parsedData = thumbnail;
  }

  if (parsedMime && parsedData) {
    const imagePath = await saveBase64AsImage(parsedData, key, parsedMime);
    const imageName = `${moment().format("YYYYMMDDHHmmss")}_${key}`;
    const output = new ReactNativeFile({
      uri: "file:///" + imagePath,
      name: combineFilenameMime(imageName, parsedMime),
      type: parsedMime,
    });
    return output;
  }
  return {};
};
