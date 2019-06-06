import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { NavigationActions } from 'react-navigation';
var _ = require('lodash');

const cache = new InMemoryCache();

class ApolloClientProvider {

  constructor() {
    this.client = new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              ),
            );
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        new HttpLink({
          uri: 'http://app-dev.metodehayati.id:4001/graphql',
          credentials: 'same-origin'
        })
      ]),
      cache: new InMemoryCache()
    });
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
