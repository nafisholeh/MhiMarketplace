import ImageResizer from "react-native-image-resizer";
import RNFetchBlob from "rn-fetch-blob";

import { METRICS } from "Themes";

/**
 * parse base64-based image/photo into smaller resolution
 *
 * @param {string} base64Original
 * @param {string} imageMime
 */
export async function generateBase64Thumbnail(base64Original, imageMime) {
  const newWidth = METRICS.IMAGE_SMALL;
  const newHeight = METRICS.IMAGE_SMALL;
  const compressFormat = "JPEG";
  const quality = METRICS.IMAGE_COMPRESS_QUALITY;
  const imageMimeParsed = imageMime || "image/jpeg";
  const base64Parsed = `data:${imageMimeParsed};base64,${base64Original}`;

  return new Promise((resolve, reject) => {
    try {
      ImageResizer.createResizedImage(
        base64Parsed,
        newWidth,
        newHeight,
        compressFormat,
        quality
      )
        .then((response) => {
          const { path } = response || {};
          RNFetchBlob.fs
            .readFile(path, "base64")
            .then((data) => {
              resolve({
                mime: imageMime,
                uri: path,
                data,
              });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
}
