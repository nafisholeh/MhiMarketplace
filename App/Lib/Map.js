import convert from "convert-units";

export function calculateAreaInSquareMeters(x1, x2, y1, y2) {
  return (y1 * x2 - x1 * y2) / 2;
}

export function calculateYSegment(latitudeRef, latitude, circumference) {
  return ((latitude - latitudeRef) * circumference) / 360.0;
}

export function calculateXSegment(
  longitudeRef,
  longitude,
  latitude,
  circumference
) {
  return (
    ((longitude - longitudeRef) *
      circumference *
      Math.cos(latitude * (Math.PI / 180))) /
    360.0
  );
}

export function calcPolygonSize(locations) {
  if (!locations.length) {
    return 0;
  }
  if (locations.length < 3) {
    return 0;
  }
  let radius = 6371000;

  const diameter = radius * 2;
  const circumference = diameter * Math.PI;
  const listY = [];
  const listX = [];
  const listArea = [];
  // calculate segment x and y in degrees for each point

  const latitudeRef = locations[0].latitude;
  const longitudeRef = locations[0].longitude;
  for (let i = 1; i < locations.length; i++) {
    let latitude = locations[i].latitude;
    let longitude = locations[i].longitude;
    listY.push(exports.calculateYSegment(latitudeRef, latitude, circumference));
    listX.push(
      exports.calculateXSegment(
        longitudeRef,
        longitude,
        latitude,
        circumference
      )
    );
  }

  // calculate areas for each triangle segment
  for (let i = 1; i < listX.length; i++) {
    let x1 = listX[i - 1];
    let y1 = listY[i - 1];
    let x2 = listX[i];
    let y2 = listY[i];
    listArea.push(exports.calculateAreaInSquareMeters(x1, x2, y1, y2));
  }

  // sum areas of all triangle segments
  let areasSum = 0;
  listArea.forEach((area) => (areasSum = areasSum + area));

  // get abolute value of area, it can't be negative
  let areaCalc = Math.abs(areasSum); // Math.sqrt(areasSum * areasSum);
  return areaCalc;
}

export function calcPolygonCenter(coordinates) {
  if (!Array.isArray(coordinates)) return null;
  let x = coordinates.map(({ latitude }) => latitude);
  let y = coordinates.map(({ longitude }) => longitude);

  let minX = Math.min.apply(null, x);
  let maxX = Math.max.apply(null, x);

  let minY = Math.min.apply(null, y);
  let maxY = Math.max.apply(null, y);

  return {
    latitude: (minX + maxX) / 2,
    longitude: (minY + maxY) / 2,
  };
}

export function normalizeAreaSize(size, fromUnit = "m2", toUnit = "ha") {
  if (size <= 0) return size;
  let outputSize =
    Math.round(convert(size).from(fromUnit).to(toUnit) * 10) / 10;
  outputSize =
    outputSize === 0
      ? `${Math.round(size * 10) / 10} ${fromUnit}`
      : `${outputSize} ${toUnit}`;
  return outputSize;
}

export function calcZoomFromRegion(region) {
  if (!region) return 0;
  const { longitudeDelta } = region || {};
  return Math.round(Math.log(360 / longitudeDelta) / Math.LN2);
}
