import ApolloClient from 'apollo-boost'
import { NavigationActions } from 'react-navigation'
var _ = require('lodash')

class ApolloClientProvider {

  constructor() {
    this.client = new ApolloClient({
      uri: 'http://app-dev.metodehayati.id:4000/graphql',
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
