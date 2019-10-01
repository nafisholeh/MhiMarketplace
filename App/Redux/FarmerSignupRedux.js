import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import update from 'immutability-helper';

import { convertToGraphQLFile } from 'Lib';
import AppConfig from 'Config/AppConfig';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeFarmerCreds: ['phone', 'email', 'password'],
  storeFarmerKtp: ['ktp'],
  storeFarmerArea: ['area'],
  storeFarmerType: ['area'],
  storeFarmerCommodity: ['area'],
})

export const FarmerSignupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  phone: null,
  email: null,
  password: null,
  ktp: null,
  area: [],
})

/* ------------- Selectors ------------- */

export const farmerSignupSelectors = () => state => state.farmerSignup

export const getAreas = () =>
  createSelector(farmerSignupSelectors(), state => state.area || [])
  
export const getFarmerSignupData = () =>
  createSelector(farmerSignupSelectors(), state => {
    const { area, ktp, phone, email, password } = state || {};
    const {
      nik, name, birth_place, birth_date, gender,
      blood_type, religion, marriage_status, occupation,
      citizenship, expired_date, photo_face, photo_ktp,
      address_detail, rtrw, kodepos, kelurahan,
      kecamatan, kecamatan_id, kabupaten, provinsi
    } = ktp || {};
    let areasData = null;
    if (Array.isArray(area) && area.length) {
      areasData = area.map((item, index) => {
        const {
          type,
          status,
          size,
          polygon,
          name,
          date_start,
          date_end,
          commodity_id,
          isNewCommodity
        } = item || {};
        const polygonInCsv = polygon
          .map(
            ({ latitude, longitude }) => `${latitude},${longitude}||`
          )
          .join(',');
        const output = Object.assign(
          {},
          {
            type,   // ["sawah", "tegal"]
            status, // ["own", "rent", "rented"]
            size,   // in m2
            polygon: polygonInCsv,
          },
          status !== AppConfig.areaStatus.OWN
            ? {
              name,
              date_start,
              date_end,
            }
            : {},
          isNewCommodity
            ? { commodity_other_name: commodity_id }
            : { commodity_id }
        );
        return output;
      });
    }
    
    return {
      phone, email, password,
      ktp_nik: nik, ktp_name: name, ktp_birth_place: birth_place,
      ktp_birth_date: birth_date, ktp_gender: gender, ktp_blood_type: blood_type,
      ktp_religion: religion, ktp_marriage_status: marriage_status,
      ktp_occupation: occupation, ktp_citizenship: citizenship,
      ktp_expired_date: expired_date, ktp_photo_face: photo_face,
      ktp_photo_ktp: photo_ktp, ktp_kecamatan_id: kecamatan_id,
      ktp_address_detail: address_detail, ktp_rtrw: rtrw, ktp_kodepos: kodepos,
      ktp_kelurahan: kelurahan, ktp_kecamatan: kecamatan,
      ktp_kabupaten: kabupaten, ktp_provinsi: provinsi,
      areas: areasData,
    }
  })

export const isAnyAreaDrawn = () =>
  createSelector(farmerSignupSelectors(), state => {
    const areas = state.area || [];
    return Array.isArray(areas) && areas.length > 0;
  })

/* ------------- Reducers ------------- */

export const storeFarmerCreds = (state, { phone, email, password }) =>
  state.merge({ phone, email, password })
  
export const storeFarmerKtp = (state, { ktp }) =>
  state.merge({ ktp })
  
export const storeFarmerArea = (state, { area: newArea }) => {
  const currentArea = state.area || [];
  if (Array.isArray(currentArea)) {
    const updatedArea = currentArea.concat([newArea]);
    return state.merge({ area: updatedArea })
  }
  return state;
}

export const storeFarmerType = (state, { area }) => {
  const { type, status, name, date_start, date_end } = area;
  const currentArea = state.area || [];
  if (Array.isArray(currentArea) && currentArea.length > 0) {
    const updatedIndex = currentArea.length - 1;
    const lastArea = currentArea[updatedIndex];
    return state.merge({
      area: [
        ...state.area.slice(0, updatedIndex),
        Object.assign({}, lastArea, { type, status, name, date_start, date_end }),
        ...state.area.slice(updatedIndex + 1)
      ]
    });
  }
  return state;
}

export const storeFarmerCommodity = (state, { area }) => {
  const { commodity_id, commodity_name, isNewCommodity } = area;
  const currentArea = state.area || [];
  if (Array.isArray(currentArea) && currentArea.length > 0) {
    const updatedIndex = currentArea.length - 1;
    const lastArea = currentArea[updatedIndex];
    return state.merge({
      area: [
        ...state.area.slice(0, updatedIndex),
        Object.assign({}, lastArea, { commodity_id, commodity_name, isNewCommodity }),
        ...state.area.slice(updatedIndex + 1)
      ]
    });
  }
  return state;
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_FARMER_CREDS]: storeFarmerCreds,
  [Types.STORE_FARMER_KTP]: storeFarmerKtp,
  [Types.STORE_FARMER_AREA]: storeFarmerArea,
  [Types.STORE_FARMER_TYPE]: storeFarmerType,
  [Types.STORE_FARMER_COMMODITY]: storeFarmerCommodity,
})
