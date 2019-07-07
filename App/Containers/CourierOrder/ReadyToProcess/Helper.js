import ApolloClientProvider from 'Services/ApolloClientProvider'
import { FETCH_READY_TO_PROCESS_LIST } from 'GraphQL/Order/Query';

export const cacheNewOrder = (data) => {
  const {
    _id: orderId,
    transaction_id,
    total_cost,
    products = [],
    shipping_address = {},
    requested_shipping_date = [],
  } = data;
  const normalisedProducts = (Array.isArray(products) && products.length) ?
    products.map(item => {
      const { product } = item;
      return { ...item, ...{__typename: 'CartItem'}, product: { ...product, ...{__typename: 'Product'} }};
    }) :
    null;
  const normalisedShippingDate = (Array.isArray(requested_shipping_date) && requested_shipping_date.length) ?
    requested_shipping_date.map(item => ({ ...item, ...{__typename: 'ShippingDate'} })) :
    null;
  const normalisedData = {
    _id: orderId,
    transaction_id,
    total_cost,
    __typename: 'Order',
    products: normalisedProducts,
    requested_shipping_date: normalisedShippingDate,
    shipping_address: { ...shipping_address, ...{__typename: 'Address'} },
  }
  
  const { readyToProcessOrders } = ApolloClientProvider.client.cache.readQuery({
    query: FETCH_READY_TO_PROCESS_LIST,  
  });
  if (
    !readyToProcessOrders ||
    !Array.isArray(readyToProcessOrders) ||
    !readyToProcessOrders.length
  ) {
    ApolloClientProvider.client.writeQuery({
      query: FETCH_READY_TO_PROCESS_LIST,
      data: {
        readyToProcessOrders: [normalisedData]
      }
    });
  } else {
    const { _id: newId } = normalisedData;
    const similarItem = readyToProcessOrders.findIndex(({ _id }) => _id === newId);
    
    ApolloClientProvider.client.writeQuery({
      query: FETCH_READY_TO_PROCESS_LIST,
      data: {
        readyToProcessOrders: similarItem > -1 ? 
          [
            ...readyToProcessOrders.slice(0, similarItem),
            normalisedData,
            ...readyToProcessOrders.slice(similarItem + 1, readyToProcessOrders.length)
          ] :
          [].concat(normalisedData, readyToProcessOrders)
      }
    });
  }
};
