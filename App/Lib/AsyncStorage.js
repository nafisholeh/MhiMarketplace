import AsyncStorage from '@react-native-community/async-storage';
var _ = require('lodash');

/*
* get redux state of redux-persist while you can't access the store
* like from background thread while app already terminated
*/
export async function getStateFromAsyncStorage(title) {
  try {
    let key = 'reduxPersist:' + title
    let result = await AsyncStorage.getItem(key)
    return JSON.parse(result)
  } catch(error) {
    return error
  }
}

/*
* get redux state of redux-persist while you can't access the store
* like from background thread while app already terminated
*/
export async function setStateFromAsyncStorage(title, data) {
  try {
    let key = 'reduxPersist:' + title
    let result = await AsyncStorage.setItem(key, JSON.stringify(data))
    return result
  } catch(error) {
    return error
  }
}
