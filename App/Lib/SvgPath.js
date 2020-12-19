/**
 * Get path data for blocking the whole screen with SVG
 * @param  {Number} w   Width of rounded rectangle
 * @param  {Number} h   Height of rounded rectangle
 * @return {String}     Square rectangle SVG path data
 */
export function drawFullScreen(w, h) {
  return `M0,0H${w}V${h}H0V0Z`;
}

/**
 * Get path data for a rounded rectangle. Allows for different radius on each corner.
 * @param  {Number} x   Starting position in x-axis
 * @param  {Number} y   Starting position in y-axis
 * @param  {Number} w   Width of rounded rectangle
 * @param  {Number} h   Height of rounded rectangle
 * @param  {Number} tlr Top left corner radius
 * @param  {Number} trr Top right corner radius
 * @param  {Number} brr Bottom right corner radius
 * @param  {Number} blr Bottom left corner radius
 * @return {String}     Rounded rectangle SVG path data
 */
export function drawRoundedRectangle(x, y, w, h, tlr, trr, brr, blr) {
  return (
    'M ' +
    x +
    ' ' +
    (y + tlr) +
    ' A ' +
    tlr +
    ' ' +
    tlr +
    ' 0 0 1 ' +
    (x + tlr) +
    ' ' +
    y +
    ' L ' +
    (x + w - trr) +
    ' ' +
    y +
    ' A ' +
    trr +
    ' ' +
    trr +
    ' 0 0 1 ' +
    (x + w) +
    ' ' +
    (y + trr) +
    ' L ' +
    (x + w) +
    ' ' +
    (y + h - brr) +
    ' A ' +
    brr +
    ' ' +
    brr +
    ' 0 0 1 ' +
    (x + w - brr) +
    ' ' +
    (y + h) +
    ' L ' +
    (x + blr) +
    ' ' +
    (y + h) +
    ' A ' +
    blr +
    ' ' +
    blr +
    ' 0 0 1 ' +
    x +
    ' ' +
    (y + h - blr) +
    ' Z'
  );
}
