import RNFetchBlob from "rn-fetch-blob";

import Config from "Config/AppConfig";

export async function saveBase64AsImage(base64, fileName, mime) {
  const { DocumentDir } = RNFetchBlob.fs.dirs;
  const tempName = exports.combineFilenameMime(fileName, mime);
  const tempUri = `${DocumentDir}/${tempName}`;
  return new Promise((resolve, reject) => {
    try {
      RNFetchBlob.fs
        .writeFile(tempUri, base64, "base64")
        .then(() => {
          resolve(tempUri);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// ekstrak filename dari full path (berlaku utk / dan \)
export function getFilenameFromPath(input) {
  return input.replace(/^.*[\\\/]/, "");
}

// ekstrak filetype utk protokol HTML berdasarkan nama file
export function getFileType(input) {
  if (!input) return input;
  if (input.includes(".")) {
    // jika input adalah filename dg ekstensi
    input = input.split(".").pop(); // ekstrak ekstensi dari filename
  }

  let output = "";
  switch (input.toLowerCase()) {
    // image file
    case "png":
      output = "image/png";
      break;
    case "jpg":
      output = "image/jpg";
      break;
    case "jpeg":
      output = "image/jpeg";
      break;
    case "gif":
      output = "image/gif";
      break;
    case "bmp":
      output = "image/x-ms-bmp";
      break;
    case "wbmp":
      output = "image/vnd.wap.wbmp";
      break;
    case "webp":
      output = "image/webp";
      break;

    case "txt":
      output = "text/plain";
      break;
    case "htm":
      output = "text/html";
      break;
    case "html":
      output = "text/html";
      break;
    case "pdf":
      output = "application/pdf";
      break;
    case "doc":
      output = "application/msword";
      break;
    case "docx":
      output = "application/msword";
      break;
    case "xls":
      output = "application/vnd.ms-excel";
      break;
    case "xlsx":
      output = "application/vnd.ms-excel";
      break;
    case "ppt":
      output = "application/mspowerpoint";
      break;
    case "pptx":
      output = "application/mspowerpoint";
      break;
    case "flac":
      output = "audio/flac";
      break;
    case "zip":
      output = "application/zip";
      break;
    case "mpg":
      output = "video/mp2p";
      break;
    case "mpeg":
      output = "video/mp2p";
      break;
  }
  return output;
}

// ekstrak filetype utk protokol HTML berdasarkan nama file
export function combineFilenameMime(filename, mime) {
  if (!filename || !mime) return filename;
  let extensionName = "";
  switch (mime.toLowerCase()) {
    // image file
    case "image/png":
      extensionName = ".png";
      break;
    case "image/jpg":
      extensionName = ".jpg";
      break;
    case "image/jpeg":
      extensionName = ".jpeg";
      break;
    case "image/gif":
      extensionName = ".gif";
      break;
    case "image/x-ms-bmp":
      extensionName = ".bmp";
      break;
    case "image/vnd.wap.wbmp":
      extensionName = ".wbmp";
      break;
    case "image/webp":
      extensionName = ".webp";
      break;

    case "text/plain":
      extensionName = ".txt";
      break;
    case "text/html":
      extensionName = ".htm";
      break;
    case "text/html":
      extensionName = ".html";
      break;
    case "application/pdf":
      extensionName = ".pdf";
      break;
    case "application/msword":
      extensionName = ".doc";
      break;
    case "application/msword":
      extensionName = ".docx";
      break;
    case "application/vnd.ms-excel":
      extensionName = ".xls";
      break;
    case "application/vnd.ms-excel":
      extensionName = ".xlsx";
      break;
    case "application/mspowerpoint":
      extensionName = ".ppt";
      break;
    case "application/mspowerpoint":
      extensionName = ".pptx";
      break;
    case "audio/flac":
      extensionName = ".flac";
      break;
    case "application/zip":
      extensionName = ".zip";
      break;
    case "video/mp2p":
      extensionName = ".mpg";
      break;
    case "video/mp2p":
      extensionName = ".mpeg";
      break;
  }
  return `${filename}${extensionName}`;
}

export function generateValidServerFileUri(uri) {
  if (!uri) return uri;
  if (uri.includes("data:image")) return uri;
  return uri
    ? `${Config.uri.image}/${exports.normalizeServerFileUri(uri)}`
    : null;
}

export function normalizeServerFileUri(uri) {
  if (!uri) return uri;
  let tempUri = uri.replace(`server/public/`, "");
  if (!tempUri.includes("images")) tempUri = `images/${tempUri};`;
  return exports.filterSymbolInLastChar(tempUri);
}

export function filterSymbolInLastChar(str) {
  const checkSymbolInLastChar = /[$-/:-?{-~!"^_`[\]]$/gm;
  let newStr = "";
  if (str) {
    newStr = str.constructor === Number ? str.toString() : str;
    newStr =
      newStr.constructor === String
        ? newStr.replace(checkSymbolInLastChar, "")
        : "";
  }
  if (checkSymbolInLastChar.test(newStr)) {
    return filterSymbolInLastChar(newStr);
  }
  return newStr;
}
