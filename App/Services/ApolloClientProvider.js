import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { NavigationActions } from 'react-navigation';

import { InAppNotification } from 'Lib';

const cache = new InMemoryCache();

const options = {
  uri: 'http://app-dev.metodehayati.id:4001/graphql'
};

const httpLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      InAppNotification.error('Maaf, terjadi kesalahan', 'Terjadi kesalahan teknis, silahkan kontak pengembang');
    } else if (networkError) {
      InAppNotification.error('Maaf, terjadi kesalahan', 'Silahkan coba lagi atau tunggu beberapa saat');
    }
  }),
  new HttpLink({
    uri: 'http://app-dev.metodehayati.id:4001/graphql',
    credentials: 'same-origin'
  })
]);

const aggregatedLink = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  createUploadLink(options),
  httpLink
);

class ApolloClientProvider {
  constructor() {
    this.client = new ApolloClient({
      link: aggregatedLink,
      cache: new InMemoryCache()
    });
  }
}

export default new ApolloClientProvider()
