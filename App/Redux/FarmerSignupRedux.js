import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { createSelector } from "reselect";
import isEmpty from "lodash/isEmpty";

import AppConfig from "Config/AppConfig";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetFarmerArea: null,
  storeFarmerCreds: ["phone", "email", "password"],
  storeFarmerKtp: ["ktp"],
  storeFarmerRawPhotos: ["data"],
  storeFarmerUploadablePhotos: ["data"],
  storeFarmerArea: ["area"],
  storeFarmerType: ["area"],
  storeFarmerCommodity: ["area"],
});

export const FarmerSignupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  phone: null,
  email: null,
  password: null,
  ktp: {},
  area: [],
});

/* ------------- Selectors ------------- */

export const farmerSignupSelectors = () => (state) => state.farmerSignup;

export const getAreas = () =>
  createSelector(farmerSignupSelectors(), (state) => {
    const { area } = state;
    return Array.isArray(area) ? [...area].reverse() : [];
  });

export const isAreasDrawn = () =>
  createSelector(farmerSignupSelectors(), (state) => {
    const { area } = state;
    return Array.isArray(area) && area.length ? true : false;
  });

export const getFarmerKtpPhotos = () =>
  createSelector(farmerSignupSelectors(), (state) => {
    const { ktp } = state || {};
    const { photo_ktp } = ktp || {};
    return photo_ktp;
  });

export const getFarmerFacePhotos = () =>
  createSelector(farmerSignupSelectors(), (state) => {
    const { ktp } = state || {};
    const { photo_face } = ktp || {};
    return photo_face;
  });

export const getFarmerUploadablePhotos = () =>
  createSelector(farmerSignupSelectors(), (state) => {
    const { ktp } = state || {};
    const { photo_face, photo_ktp, photo_face_thumbnail, photo_ktp_thumbnail } =
      ktp || {};
    return [
      photo_face || {},
      photo_ktp || {},
      photo_face_thumbnail || {},
      photo_ktp_thumbnail || {},
    ].filter((item) => item && !isEmpty(item));
  });

export const getFarmerSignupAreas = () =>
  createSelector(farmerSignupSelectors(), (state) => {
    const { area } = state || {};
    let areasData = null;
    if (Array.isArray(area) && area.length) {
      areasData = area.map((item) => {
        const {
          type,
          status,
          size,
          polygon,
          name,
          date_start,
          date_end,
          commodity,
        } = item || {};
        const polygonInCsv = Array.isArray(polygon)
          ? polygon
              .map(({ latitude, longitude }) => `${latitude},${longitude}||`)
              .join(",")
          : "";
        const { key, value, isManualInput } = commodity || {};
        const output = Object.assign(
          {},
          {
            type, // ["sawah", "tegal"]
            status, // ["own", "rent", "rented"]
            size, // in m2
            polygon: polygonInCsv,
          },
          status !== AppConfig.ownedArea
            ? {
                name,
                date_start,
                date_end,
              }
            : {},
          isManualInput ? { commodity_new: value } : { commodity: key }
        );
        return output;
      });
    }
    return areasData;
  });

export const getFarmerSignupData = () =>
  createSelector(
    farmerSignupSelectors(),
    getFarmerSignupAreas(),
    (state, areas) => {
      const { ktp, phone, email, password } = state || {};
      const {
        nik,
        name,
        birth_place,
        birth_date,
        gender,
        blood_type,
        religion,
        marriage_status,
        occupation,
        citizenship,
        expired_date,
        address_detail,
        rtrw,
        kecamatan_id,
      } = ktp || {};
      const {
        key: keyReligion,
        value: valueReligion,
        isManualInput: isManualInputRegion,
      } = religion || {};
      const {
        key: keyOccupation,
        value: valueOccupation,
        isManualInput: isManualInputOccupation,
      } = occupation || {};
      const { key: birthPlaceKey } = birth_place || {};

      const parsedReligion = isManualInputRegion
        ? { ktp_new_religion: valueReligion }
        : { ktp_religion: keyReligion };

      const parsedOccupation = isManualInputOccupation
        ? { ktp_new_occupation: valueOccupation }
        : { ktp_occupation: keyOccupation };

      const payload = Object.assign(
        {
          phone,
          email,
          password,
          ktp_nik: nik,
          ktp_name: name,
          ktp_birth_place: birthPlaceKey,
          ktp_birth_date: birth_date,
          ktp_gender: gender,
          ktp_blood_type: blood_type,
          ktp_marriage_status: marriage_status,
          ktp_occupation: occupation,
          ktp_citizenship: citizenship,
          ktp_expired_date: expired_date,
          ktp_kecamatan_id: kecamatan_id,
          ktp_address_detail: address_detail,
          ktp_rtrw: rtrw,
          areas,
        },
        parsedReligion,
        parsedOccupation
      );
      return payload;
    }
  );

export const isAnyAreaDrawn = () =>
  createSelector(farmerSignupSelectors(), (state) => {
    const areas = state.area || [];
    return Array.isArray(areas) && areas.length > 0;
  });

/* ------------- Reducers ------------- */

export const storeFarmerCreds = (state, { phone, email, password }) =>
  state.merge({ phone, email, password });

export const storeFarmerKtp = (state, { ktp }) => state.merge({ ktp });

export const resetFarmerArea = (state) => state.merge({ area: null });

export const storeFarmerRawPhotos = (state, { data }) => {
  return state.merge({
    ktp: Object.assign({}, state.ktp, data),
  });
};

export const storeFarmerUploadablePhotos = (state, { data }) => {
  const { photo_face, photo_ktp } = data || {};
  return state.merge({
    ktp: Object.assign({}, state.ktp, {
      photo_face,
      photo_ktp,
    }),
  });
};

export const storeFarmerArea = (state, { area: newArea }) => {
  const currentArea = state.area || [];
  if (Array.isArray(currentArea)) {
    const updatedArea = currentArea.concat([newArea]);
    return state.merge({ area: updatedArea });
  }
  return state;
};

export const storeFarmerType = (state, { area }) => {
  const currentArea = state.area || [];
  if (Array.isArray(currentArea) && currentArea.length > 0) {
    const updatedIndex = currentArea.length - 1;
    const lastArea = currentArea[updatedIndex];
    return state.merge({
      area: [
        ...state.area.slice(0, updatedIndex),
        Object.assign({}, lastArea, area),
        ...state.area.slice(updatedIndex + 1),
      ],
    });
  }
  return state;
};

export const storeFarmerCommodity = (state, { area }) => {
  const { commodity_id, commodity_name, isNewCommodity } = area;
  const currentArea = state.area || [];
  if (Array.isArray(currentArea) && currentArea.length > 0) {
    const updatedIndex = currentArea.length - 1;
    const lastArea = currentArea[updatedIndex];
    return state.merge({
      area: [
        ...state.area.slice(0, updatedIndex),
        Object.assign({}, lastArea, {
          commodity_id,
          commodity_name,
          isNewCommodity,
        }),
        ...state.area.slice(updatedIndex + 1),
      ],
    });
  }
  return state;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_FARMER_AREA]: resetFarmerArea,
  [Types.STORE_FARMER_CREDS]: storeFarmerCreds,
  [Types.STORE_FARMER_KTP]: storeFarmerKtp,
  [Types.STORE_FARMER_AREA]: storeFarmerArea,
  [Types.STORE_FARMER_TYPE]: storeFarmerType,
  [Types.STORE_FARMER_COMMODITY]: storeFarmerCommodity,
  [Types.STORE_FARMER_RAW_PHOTOS]: storeFarmerRawPhotos,
  [Types.STORE_FARMER_UPLOADABLE_PHOTOS]: storeFarmerUploadablePhotos,
});
