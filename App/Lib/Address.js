
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

// konversi format data dari graphql response ke picker
export const graphqlToRNPickerSelect = (input = [], isKeyDisplayed) => {
  if (!Array.isArray(input) || !input.length) return null;
  let output = [];
  const keyMap = new Map();
  input.forEach(item => {
    const { key, nama, kelurahan, _id } = item || {};
    if (!key || !nama) return;
    if (!keyMap.has(key)) {
      keyMap.set(key, true); 
      let temp = {};
      temp['label'] = isKeyDisplayed ? `(${key}) - ${nama}` : nama;
      temp['value'] = isKeyDisplayed ? `${_id}||${key}||${kelurahan}` : key;
      output.push(temp);
    }
  });
  return output;
}
  