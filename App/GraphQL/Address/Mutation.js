import gql from 'graphql-tag';

import { store } from 'Containers/App';
import { FETCH_ADDRESS, FETCH_SELECTED_ADDRESS } from './Query';

export const ADD_ADDRESS = gql`
  mutation addAddress($user_id: String!, $id_address: String!, $data: AddressInput) {
   addAddress(user_id:$user_id, id_address: $id_address, data:$data) {
     _id
     alamat
     rtrw
     kelurahan
     kecamatan
     kota
     provinsi
     kodepos
     selected
     location
    }
  }
`

export const cacheAddAddress = ( cache, { data }, dataInput ) => {
  try {
    const { session: { user: { _id: user_id } }} = store.getState();
    const { addAddress } = data;
    const { address } = cache.readQuery({
      query: FETCH_ADDRESS,
      variables: { user_id } 
    });
    cache.writeQuery({
      query: FETCH_ADDRESS,
      variables: { user_id },
      data: { address: [addAddress, ...address] }
    });
  } catch(err) {
    return null;
  }
};

export const SELECT_ADDRESS = gql`
  mutation selectAddress($user_id: String!, $_id: String!) {
    selectAddress(user_id: $user_id, _id: $_id) {
      _id
      user_id 
    }
  } 
`

export const cacheSelectAddress = ( cache, { data }, addressId ) => {
  try {
    const { session: { user: { _id: userId } }} = store.getState();
    const { address = [] } = cache.readQuery({
      query: FETCH_ADDRESS,
      variables: { user_id: userId } 
    });
    const newAddresses = 
      Array.isArray(address) && address.map(item => {
          if (item.selected && item._id !== addressId) {
            return Object.assign({}, item, { selected: false })
          }
          if (item._id === addressId) {
            return Object.assign({}, item, { selected: true })
          }
          return item
      });
    cache.writeQuery({
      query: FETCH_ADDRESS,
      variables: { user_id: userId },
      data: { address: newAddresses }
    });
    const selectedAddress = newAddresses.find(n => n.selected);
    cache.writeQuery({
      query: FETCH_SELECTED_ADDRESS,
      variables: { user_id: userId },
      data: { selectedAddress: selectedAddress }
    });
  } catch(err) {
    return null;
  }
};