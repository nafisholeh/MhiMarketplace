import gql from 'graphql-tag';

import { store } from 'Containers/App';
import { FETCH_ADDRESS } from './Query';

export const ADD_ADDRESS = gql`
  mutation addAddress($user_id: String!, $data: AddressInput) {
   addAddress(user_id:$user_id, data:$data) {
     _id
     alamat
     rtrw
     kelurahan
     kecamatan
     kota
     provinsi
     kodepos
     selected
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
