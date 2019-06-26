
export const getReadableAddress = data => {
  const { alamat, rtrw } = data || {};
  if (!alamat && !rtrw) return '-';
  return `${alamat || ''}${rtrw ? ` RT/RW ${rtrw}` : ``}`;
};

export const getReadableSubdistrict = data => {
  const { kelurahan, kecamatan } = data || {};
  if (!kelurahan && !kelurahan) return '-';
  return `${kelurahan ? `Kel ${kelurahan}` : ``}${
    kecamatan ? `, Kec ${kecamatan}` : ``
  }`;
};

export const getReadableCityState = data => {
  const { kota, provinsi, kodepos } = data || {};
  if (!kota && !provinsi) return '-';
  return `${kota ? `Kota ${kota}` : ``}${
    provinsi ? `, ${provinsi}` : ``}${kodepos ? kodepos : ``}`;
};