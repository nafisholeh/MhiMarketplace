import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from 'Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
  },
  button: {
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'center',
  },
})
