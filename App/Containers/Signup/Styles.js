import { StyleSheet } from 'react-native'
import { Metrics, Colors, ApplicationStyles } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
  },
  button: {
    marginTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.green_light,
    paddingVertical: Metrics.marginVertical,
    paddingHorizontal: Metrics.marginHorizontal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: Colors.white,
  }
})
