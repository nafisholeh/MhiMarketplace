import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: 'white',
    minHeight: 100,
  },
  scrollView: {
    paddingHorizontal: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  section: {
    flex: 1,
    backgroundColor: 'white',
    minHeight: 100,
    // minWidth: 100,
  },
  product__item: {
    width: Metrics.deviceWidth, 
    borderBottomWidth: 1, 
    borderBottomColor: 'gray',
    padding: 20,
  },
  product__item_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  product__item_detail: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
    flexDirection:'column',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  product__item_cart: {
    alignSelf: 'center',
  },
  itemImage: {
    width: 20,
    height: 20,
  }
})
