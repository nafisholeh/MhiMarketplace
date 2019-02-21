var _ = require('lodash');

export function parseToRupiah(angka, prefixTerm) {
  if(angka) {
    let rupiah = '';
    //split behind comma
    let frontNumber = 0
    let afterComma = 0
    let fullNumber = angka.toString().split('.');
    if(fullNumber.length != 1){
        afterComma=fullNumber[1]
        afterComma=','+afterComma
    }
    frontNumber=fullNumber[0]
  	let angkarev = frontNumber.toString().split('').reverse().join('');
      for(let i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    let output = rupiah.split('',rupiah.length-1).reverse().join('')+(afterComma>0?afterComma:'')
    if(!_.isNil(prefixTerm)) return prefixTerm+output;
    else return 'Rp '+output;
  }
  return null;  
}

/*
 * calculate discount price
 * param price number
 * param discount number
 * return discount_price number
*/
export function calcDiscount(price, discount) {
  if(price && discount) {
    return price - (price * ( discount / 100));
  }
  return null;
}