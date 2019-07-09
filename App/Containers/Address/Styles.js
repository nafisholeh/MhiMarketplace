import { StyleSheet } from 'react-native'
import { Metrics, Colors, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  button: {
    height: 50,
    backgroundColor: Colors.green_light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.brown_light
  }
})
