import gql from 'graphql-tag';

import {
  FETCH_READY_TO_PROCESS_LIST,
  FETCH_PROCESSING_LIST,
  FETCH_READY_TO_SEND_LIST,
  FETCH_SENDING_LIST,
  FETCH_PROCESSING_COUNT,
  FETCH_READY_TO_SEND_COUNT,
  FETCH_SENDING_COUNT,
} from './Query';

export const START_CHECKOUT = gql`
  mutation startCheckout($user_id: String!) {
    startCheckout(user_id: $user_id) {
      _id
      user_id {
        _id
      }
      gross_price
      total_discount
      courier_cost
      total_cost
      products {
        _id
        qty
      }
    }
  }
`

export const FINISH_CHECKOUT = gql`
  mutation finishCheckout($_id: String!, $payment_option: String!, $gross_price: Int!, $total_discount: Int!, $courier_cost: Int!, $total_cost: Int!, $requested_shipping_date: [ShippingDateInput]!, $shipping_address: String) {
    finishCheckout(_id:$_id, payment_option:$payment_option, gross_price:$gross_price, total_discount:$total_discount, courier_cost:$courier_cost, total_cost:$total_cost, requested_shipping_date:$requested_shipping_date, shipping_address:$shipping_address) {
      _id
      user_id {
        _id
      }
      payment_option {
        type
        detail
        how_to_pay
      }
      gross_price
      total_discount
      courier_cost
      total_cost
      products {
        _id
        qty
      }
    }
  }
`

export const CONFIRM_ORDER = gql`
  mutation confirmOrder($_id: String!, $account_number: String!, $account_bank: String!, $total_paid: Int!, $transaction_detail: String) {
    confirmOrder(_id: $_id, account_number: $account_number, account_bank: $account_bank, total_paid: $total_paid, transaction_detail: $transaction_detail) {
      _id
      cart_id
      time
      total_cost
      time_stamp {
        ready_to_process
      }
      account_number
      account_bank
      total_paid
      transaction_detail
    }
  }
`

export const TAKE_ORDER = gql`
  mutation takeOrder($order_id: String!, $courier_id: String!, $actual_shipping_date: [ShippingDateInput!]) {
    takeOrder(order_id: $order_id, courier_id: $courier_id, actual_shipping_date: $actual_shipping_date) {
      _id
    }
  }
`

export const cacheTakeOrder = (cache, { data }, removedId) => {
  const { readyToProcessOrders } = cache.readQuery({
    query: FETCH_READY_TO_PROCESS_LIST,  
  });
  if (
    !removedId ||
    !Array.isArray(readyToProcessOrders) ||
    !readyToProcessOrders.length
  ) {
    return;
  }
  const removedIndex = readyToProcessOrders.findIndex(item => item._id === removedId);
  cache.writeQuery({
    query: FETCH_READY_TO_PROCESS_LIST,
    data: {
      readyToProcessOrders: [
        ...readyToProcessOrders.slice(0, removedIndex),
        ...readyToProcessOrders.slice(removedIndex + 1,readyToProcessOrders.length)
      ]
    }
  });
};

export const TAKE_ORDER_PRODUCTS = gql`
  mutation takeOrderProducts($order_id: String!) {
    takeOrderProducts(order_id: $order_id) {
      _id
    }
  }
`

export const cacheOrderCount = (cache, query, courierId, isAdd) => {
  const data = cache.readQuery({
    query,
    variables: { courier_id: courierId }
  });
  const value = data[Object.keys(data)[0]] || 0;
  cache.writeQuery({
    query,
    variables: { courier_id: courierId },
    data: {
      [Object.keys(data)[0]]: isAdd ? value + 1 : value - 1
    }
  });
}

export const cacheTakeOrderProducts = (cache, { data }, removedId, courierId) => {
  exports.cacheOrderCount(cache, FETCH_PROCESSING_COUNT, courierId, false);
  exports.cacheOrderCount(cache, FETCH_READY_TO_SEND_COUNT, courierId, true);
  const dataChild = cache.readQuery({
    query: FETCH_PROCESSING_LIST,
    variables: { courier_id: courierId },
  });
  const { processingOrders } = dataChild || {};
  if (
    !removedId ||
    !Array.isArray(processingOrders) ||
    !processingOrders.length
  ) {
    return;
  }
  const removedIndex = processingOrders.findIndex(item => item._id === removedId);
  cache.writeQuery({
    query: FETCH_PROCESSING_LIST,
    variables: { courier_id: courierId },
    data: {
      processingOrders: [
        ...processingOrders.slice(0, removedIndex),
        ...processingOrders.slice(removedIndex + 1, processingOrders.length)
      ]
    }
  });
};

export const SENDING_ORDER_PRODUCTS = gql`
  mutation sendingOrderProducts($order_id: String!) {
    sendingOrderProducts(order_id: $order_id) {
      _id
    }
  }
`

export const cacheSendingOrderProducts = (cache, { data }, removedId, courierId) => {
  exports.cacheOrderCount(cache, FETCH_READY_TO_SEND_COUNT, courierId, false);
  exports.cacheOrderCount(cache, FETCH_SENDING_COUNT, courierId, true);
  const dataChild = cache.readQuery({
    query: FETCH_READY_TO_SEND_LIST,
    variables: { courier_id: courierId },
  });
  const { readyToSendOrders } = dataChild || {};
  if (
    !removedId ||
    !Array.isArray(readyToSendOrders) ||
    !readyToSendOrders.length
  ) {
    return;
  }
  const removedIndex = readyToSendOrders.findIndex(item => item._id === removedId);
  cache.writeQuery({
    query: FETCH_READY_TO_SEND_LIST,
    variables: { courier_id: courierId },
    data: {
      readyToSendOrders: [
        ...readyToSendOrders.slice(0, removedIndex),
        ...readyToSendOrders.slice(removedIndex + 1, readyToSendOrders.length)
      ]
    }
  });
};

export const CONFIRM_ORDER_ARRIVAL = gql`
  mutation confirmOrderArrival($order_id: String!) {
    confirmOrderArrival(order_id: $order_id) {
      _id
    }
  }
`

export const cacheOrderArrival = (cache, { data }, removedId, courierId) => {
  const dataChild = cache.readQuery({
    query: FETCH_SENDING_LIST,
    variables: { courier_id: courierId },
  });
  const { sendingOrders } = dataChild || {};
  if (
    !removedId ||
    !Array.isArray(sendingOrders) ||
    !sendingOrders.length
  ) {
    return;
  }
  const removedIndex = sendingOrders.findIndex(item => item._id === removedId);
  cache.writeQuery({
    query: FETCH_SENDING_LIST,
    variables: { courier_id: courierId },
    data: {
      sendingOrders: [
        ...sendingOrders.slice(0, removedIndex),
        ...sendingOrders.slice(removedIndex + 1, sendingOrders.length)
      ]
    }
  });
};