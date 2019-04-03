var _ = require('lodash')

/*
* if current user are on screenName, then hide tabBar
* use the return value on tabBarVisible
* return false if you want tabBar to be visible
*/
export function setTabBarHide(navigation, screenName) {
  const { state: { routes, index } } = navigation;
  if(!routes || !routes[index]) return true
  let isTabVisible = false
  const { routeName } = routes[index]
  if(Array.isArray(screenName)) {
    console.tron.log("routename",routeName, screenName.indexOf(routeName))
    isTabVisible = screenName.indexOf(routeName) === -1
  } else if(typeof screenName === 'string') {
    console.tron.log("routename isString",routeName)
    isTabVisible = routeName !== screenName
  }
  console.tron.log("setTabBarHide", isTabVisible, navigation, screenName)
  return isTabVisible
}
