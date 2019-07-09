import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: 'white',
    minHeight: 90,
  },
  item__container: {
    width: 160, 
    height: 90,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item__view: {
    padding: 10,
    borderWidth: 0.5, 
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
