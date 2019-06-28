import gql from 'graphql-tag';

export const INITIAL_CHECKOUT_LIST = gql`
  query initialCheckouts {
    initialCheckouts {
      _id
      transaction_id
      user_id {
        name
      }
      time_start
      total_cost
      products {
        _id
        qty
      }
      paid_off
    }
  }
`

export const COMPLETED_CHECKOUT_LIST = gql`
  query completedCheckouts {
    completedCheckouts {
      _id
      transaction_id
      user_id {
        name
      }
      time_start
      time_finish
      total_cost
      products {
        _id
        qty
      }
      paid_off
    }
  }
`

export const PAID_OFF_CHECKOUT_LIST = gql`
  query paidOffCheckouts {
    paidOffCheckouts {
      _id
      transaction_id
      user_id {
        name
      }
      time_start
      time_finish
      total_cost
      products {
        _id
        qty
      }
      paid_off
    }
  }
`

export const FETCH_CHECKOUT_ITEMS = gql`
  query fetchCheckoutItems($user_id:String!, $_id:String!) {
    checkout(user_id:$user_id, _id:$_id) {
      _id
      product {
        _id
        title
        photo
        price
        discount
        unit
      }
      qty
      selected
    }
  }
`

export const FETCH_ORDER_DETAIL = gql`
  query fetchOrderDetail($_id:String!) {
    orderDetail(_id:$_id) {
      _id
      user_id {
        _id
        email
        name
        user_type
      }
      transaction_id
      gross_price
      total_discount
      courier_cost
      total_cost
      time_stamp {
        incomplete
        ready_to_process
        processing
        ready_to_send
        sending
        complete
      }
      shipping_address {
        _id
        alamat
        rtrw
        kelurahan
        kecamatan
        kota
        provinsi
        kodepos
      }
      requested_shipping_date {
        _id
        date
        time_start
        time_end
      }
      actual_shipping_date {
        _id
        date
        time_start
        time_end
      }
      payment_option {
        type
        detail
        how_to_pay
      }
      products {
        _id
        product {
          _id
          title
          photo
          price
          discount
          unit
        }
        qty
        selected
      }
    }
  }
`

export const FETCH_READY_TO_PROCESS_LIST = gql`
  query fetchReadyToProcessOrders($user_id:String) {
    readyToProcessOrders(user_id:$user_id) {
      _id
      transaction_id
      total_cost
      shipping_address {
        _id
        alamat
        rtrw
        kelurahan
        kecamatan
        kota
        provinsi
        kodepos
      }
      products {
        _id
        product {
          _id
          title
          unit
        }
        qty
        selected
      }
      requested_shipping_date {
        _id
        date
        time_start
        time_end
      }
    }
  }
`

export const FETCH_PROCESSING_LIST = gql`
  query fetchProcessingOrders($courier_id:String, $user_id:String) {
    processingOrders(courier_id:$courier_id, user_id:$user_id) {
      _id
      transaction_id
      total_cost
      shipping_address {
        _id
        alamat
        rtrw
        kelurahan
        kecamatan
        kota
        provinsi
        kodepos
      }
      products {
        _id
        product {
          _id
          title
          unit
        }
        qty
        selected
      }
      requested_shipping_date {
        _id
        date
        time_start
        time_end
      }
      actual_shipping_date {
        _id
        date
        time_start
        time_end
      }
    }
  }
`

export const FETCH_PROCESSING_COUNT = gql`
  query processingOrdersCount($courier_id:String!, $user_id:String) {
    processingOrdersCount(courier_id:$courier_id, user_id:$user_id)
  }
`

export const FETCH_READY_TO_SEND_LIST = gql`
  query fetchReadyToSendOrders($courier_id:String, $user_id:String) {
    readyToSendOrders(courier_id:$courier_id, user_id:$user_id) {
      _id
      transaction_id
      total_cost
      shipping_address {
        _id
        alamat
        rtrw
        kelurahan
        kecamatan
        kota
        provinsi
        kodepos
      }
      products {
        _id
        product {
          _id
          title
          unit
        }
        qty
        selected
      }
      requested_shipping_date {
        _id
        date
        time_start
        time_end
      }
      actual_shipping_date {
        _id
        date
        time_start
        time_end
      }
    }
  }
`

export const FETCH_READY_TO_SEND_COUNT = gql`
  query readyToSendOrdersCount($courier_id:String!, $user_id:String) {
    readyToSendOrdersCount(courier_id:$courier_id, user_id:$user_id)
  }
`

export const FETCH_SENDING_LIST = gql`
  query fetchSendingOrders($courier_id:String, $user_id:String) {
    sendingOrders(courier_id:$courier_id, user_id:$user_id) {
      _id
      transaction_id
      total_cost
      shipping_address {
        _id
        alamat
        rtrw
        kelurahan
        kecamatan
        kota
        provinsi
        kodepos
      }
      products {
        _id
        product {
          _id
          title
          unit
        }
        qty
        selected
      }
      requested_shipping_date {
        _id
        date
        time_start
        time_end
      }
      actual_shipping_date {
        _id
        date
        time_start
        time_end
      }
    }
  }
`

export const FETCH_SENDING_COUNT = gql`
  query sendingOrdersCount($courier_id:String!, $user_id:String) {
    sendingOrdersCount(courier_id:$courier_id, user_id:$user_id)
  }
`

export const FETCH_SENT_LIST = gql`
  query fetchSentOrders($courier_id:String, $user_id:String) {
    sentOrders(courier_id:$courier_id, user_id:$user_id) {
      _id
      transaction_id
      total_cost
      shipping_address {
        _id
        alamat
        rtrw
        kelurahan
        kecamatan
        kota
        provinsi
        kodepos
      }
      products {
        _id
        product {
          _id
          title
          unit
        }
        qty
        selected
      }
      requested_shipping_date {
        _id
        date
        time_start
        time_end
      }
      actual_shipping_date {
        _id
        date
        time_start
        time_end
      }
    }
  }
`

export const FETCH_SENT_COUNT = gql`
  query sentOrdersCount($courier_id:String!, $user_id:String) {
    sentOrdersCount(courier_id:$courier_id, user_id:$user_id)
  }
`

export const FETCH_COMPLETED_LIST = gql`
  query fetchCompletedOrders($courier_id:String, $user_id:String) {
    completedOrders(courier_id:$courier_id, user_id:$user_id) {
      _id
      transaction_id
      total_cost
      products {
        _id
        product {
          _id
          title
          unit
        }
        qty
        selected
      }
      shipping_address {
        _id
        alamat
        rtrw
        kelurahan
        kecamatan
        kota
        provinsi
        kodepos
      }
      time_stamp {
        complete
      }
    }
  }
`
