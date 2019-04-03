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
    isTabVisible = screenName.indexOf(routeName) === -1
  } else if(typeof screenName === 'string') {
    isTabVisible = routeName !== screenName
  }
  return isTabVisible
}
