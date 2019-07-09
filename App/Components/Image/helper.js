var _ = require('lodash');

export function getFirstParam(param) {
  let index = param.indexOf(',')
  if(index > -1) {
    return param.slice(0, index)
  }
  return param
}

export function isLocalImage(input) {
  return input.includes('file:///')
}

export function isAssetImage(input) {
  if(_.isNumber(input)) return true
  else return false
}

export function isServerImage(input) {
  return input.includes('http://')
}
