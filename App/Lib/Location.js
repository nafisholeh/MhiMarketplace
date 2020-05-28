var _ = require('lodash')

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
export function calcDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

export function calcLocationDistance(loc1, loc2) {
  return calcDistance(loc1.latitude, loc1.longitude, loc2.latitude, loc2.longitude)
}

// Converts numeric degrees to radians
export function toRad(Value) {
    return Value * Math.PI / 180;
}

export function getRegionFromCoordinates(coordinates, latDelta, lngDelta) {
  return {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta
  }
}

export function getRegionForCoordinates(points) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  };
}

/*
* Ekstraksi kota, kabupaten, provinsi dan negara dari data
* data berasal dari Geocoder.geocodePosition({lat:lat,lng:lng})
* output: [<kota>, <kabupaten>, <provinsi>, <negara>]
*/
export function extractAdministrativeName(data) {
  let output = []
  if(!_.isNil(data) && !_.isEmpty(data)) {
    if(!_.isNil(data[0])) {
      if(data[0].hasOwnProperty('locality')) {
        output.push(data[0].locality)         // kota, kadang tidak bisa di query jadwal waktu sholatnya
      }
      if(data[0].hasOwnProperty('subAdminArea')) {
        output.push(data[0].subAdminArea)     // kabupaten, ini alternatif pertama, jika query nama kota tidak berhasil
      }
      if(data[0].hasOwnProperty('adminArea')) {
        output.push(data[0].adminArea)        // provinsi, ini alternatif kedua
      }
      if(data[0].hasOwnProperty('country')) {
        output.push(data[0].country)          // negara, ini alternatif terakhir
      }
    }
  }
  return output
}

// koordinat lat dan lng, dibatasi x angka dibelakang koma
export function normalizeCoordinate(input, count) {
  return Number(input).toFixed(count)
}

// cek apa koordinat valid atau tidak
export function isValidCoordinate(coordinate) {
  if(_.isNil(coordinate) || _.isEmpty(coordinate)) return false
  if(
    !coordinate.hasOwnProperty('latitude') ||
    !coordinate.hasOwnProperty('longitude')
  ) return false
  if(_.isNil(coordinate.latitude))
    return false
  if(_.isNil(coordinate.longitude))
    return false
  return true
}

// ambil singkatan kata dari kabupaten
export function abbreviateKabupaten(input) {
  if(_.isEqual(input, 'Kabupaten')) {
    return 'Kab.'
  } else {
    return input
  }
}
