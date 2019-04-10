import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NavigationActions } from 'react-navigation'
var _ = require('lodash')

const cache = new InMemoryCache();

class ApolloClientProvider {

  constructor() {
    this.client = new ApolloClient({
      //uri: 'http://app.metodehayati.id:4000/graphql',
      uri: 'http://192.168.1.2:4001/graphql',
      // uri: 'http://192.168.44.129:4001/graphql',
      cache,
      onError: this._onError,
    })
  }

  _onError = (errorObj) => {
    this._onHandleUnauthorized(errorObj)
  }

  // handle jika ada error sebab unauthorized
  _onHandleUnauthorized(error) {
    if(_.isNil(error)) return
  }

}

export default new ApolloClientProvider()
