import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.doubleBaseMargin,
  },
  image: {
    width: 60,
    height: 75,
    marginRight: Metrics.doubleBaseMargin,
  },
  detail: {
    flexDirection: 'column',
  },
  detailTitle: { },
  detailPrice: {
    marginBottom: Metrics.baseMargin,
  }
})
