import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";

import { InAppNotification } from "Lib";
import { STRINGS } from "Themes";
import AppConfig from "../Config/AppConfig";

const options = {
  uri: AppConfig.uri.graphql,
};

const httpLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError, operation }) => {
    if (operation.getContext().isCustomError) return;
    if (graphQLErrors) {
      InAppNotification.error(
        STRINGS.GRAPHQL_ERROR_HEADER,
        STRINGS.GRAPHQL_ERROR_BODY
      );
    } else if (networkError) {
      InAppNotification.error(
        STRINGS.NETWORK_ERROR_HEADER,
        STRINGS.NETWORK_ERROR_BODY
      );
    }
  }),
  new HttpLink({
    uri: AppConfig.uri.graphql,
    credentials: "same-origin",
  }),
]);

const aggregatedLink = ApolloLink.split(
  (operation) => operation.getContext().hasUpload,
  createUploadLink(options),
  httpLink
);

class ApolloClientProvider {
  constructor() {
    this.client = new ApolloClient({
      link: aggregatedLink,
      cache: new InMemoryCache(),
    });
  }
}

export default new ApolloClientProvider();
