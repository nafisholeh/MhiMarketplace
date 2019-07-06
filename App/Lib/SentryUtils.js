import { Sentry, SentrySeverity } from 'react-native-sentry'
import AppConfig from 'Config/AppConfig'
var _ = require('lodash')

/*
* laporkan error ke sentry
* input:
*   - classObject: selalu pakai this
*   - title: judul error dg format 'Nama fungsi'
*   - message: data yang berisi error, bisa dalam format data apa saja
*/
export function reportSentryError(classObject, title, message) {
  let titleError = ''
  if(_.isString(classObject)) {
    titleError = '[' + classObject + '] - ' + title
  } else {
    titleError = '[' + classObject.constructor.name + '] - ' + title
  }
  Sentry.captureMessage(
    titleError, {
      level: SentrySeverity.Warning,
      logger: 'muslimnesia',
      extra: exports.normalizeMessage(message)
    }
  )
}

export function addToSentryLog(classObject, title, message) {
  if(!AppConfig.sentryLog) return
  let titleError = ''
  if(_.isString(classObject)) {
    titleError = '[' + classObject + '] - ' + title
  } else {
    titleError = '[' + classObject.constructor.name + '] - ' + title
  }
  Sentry.captureBreadcrumb({
    message: titleError,
    category: 'action',
    data: exports.normalizeMessage(message),
  })
}

/*
* laporkan error ke sentry
* input:
*   - classObject: selalu pakai this
*   - title: judul error dg format 'Nama fungsi'
*   - message: data yang berisi error, bisa dalam format data apa saja
*/
export function reportSentryLog(classObject, title, message) {
  if(!AppConfig.sentryLog) return
  let titleError = ''
  if(_.isString(classObject)) {
    titleError = '[' + classObject + '] - ' + title
  } else {
    titleError = '[' + classObject.constructor.name + '] - ' + title
  }
  Sentry.captureMessage(
    titleError, {
      level: SentrySeverity.Warning,
      logger: 'muslimnesia',
      extra: exports.normalizeMessage(message)
    }
  )
}

export function normalizeMessage(message) {
  let dataOutput = {'extras': 'data not specified'}
  if(!_.isNil(message)) {
    if(_.isString(message) || _.isNumber(message)) {
      dataOutput = {'extras':message}
    } else if(_.isArray(message) || _.isObject(message)) {
      dataOutput = message
    } else {
      dataOutput = {'extras': 'data format not recognized'}
    }
  }
  
  return dataOutput
}
