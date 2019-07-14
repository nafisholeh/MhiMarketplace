var _ = require('lodash');

export function parseToRupiah(angka, prefix, isShort) {
  if (!angka) return angka;
  let number_string = angka.toString().replace(/[^,\d]/g, '');
  let split = number_string.split(',');
  let sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  let ribuan_string = null;
  if (isShort && Array.isArray(ribuan) && ribuan.length) {
      switch (ribuan.length) {
          case 1:
              ribuan_string = 'rb';
              ribuan = null;
          break;
          case 2: 
              ribuan_string = 'jt';
              ribuan = null;
          break;
          case 3:
          default:
              ribuan.splice(ribuan.length - 3);
              ribuan_string = 'jt';
          break;
      }
  }
  if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
  }
  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return rupiah ? `${prefix || 'Rp'} ${rupiah}${ribuan_string || ''}` : '-';
}

/*
 * calculate discount price
 * param price number
 * param discount number
 * return discount_price number
*/
export function calcDiscount(price, discount) {
  if(price && discount) {
    return price * ( discount / 100);
  }
  return 0;
}