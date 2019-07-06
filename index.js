import './App/Config/ReactotronConfig';
import { AppRegistry } from 'react-native';
import { Sentry } from 'react-native-sentry';

import App from './App/Containers/App';
import AppConfig from 'Config/AppConfig';

Sentry.config(AppConfig.sentryKey).install();

Sentry.setTagsContext({
  'environment': 'development',
  'react': true
})

AppRegistry.registerComponent('MhiMarketplace', () => App)
