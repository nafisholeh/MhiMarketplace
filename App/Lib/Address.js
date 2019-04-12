
export const getReadableAddress = data => {
  const { alamat, rtrw } = data;
  return `${alamat || ''}${rtrw ? ` RT/RW ${rtrw}` : ``}`;
};

export const getReadableSubdistrict = data => {
  const { kelurahan, kecamatan } = data;
  return `${kelurahan ? `Kel ${kelurahan}` : ``}${
    kecamatan ? `, Kec ${kecamatan}` : ``
  }`;
};

export const getReadableCityState = data => {
  const { kota, provinsi, kodepos } = data;
  return `${kota ? `Kota ${kota}` : ``}${
    provinsi ? `, ${provinsi}` : ``}${kodepos ? kodepos : ``}`;
};