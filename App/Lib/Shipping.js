import moment from 'moment';

import { getIntervalDateToday } from './Date';

export const getUpcomingShippingSched = (shippingDates = []) => {
  let closestShipping = null;
  
  if (shippingDates.length === 1) {
    closestShipping = shippingDates[0];
  } else if (shippingDates.length > 1) {
    const now = new Date();
    let closest = Infinity;
    let closestIndex = 0;
    shippingDates.forEach((d, i) => {
      const { date: itemDate } = d || {};
      let date = new Date(itemDate);
      if (Number(date) >= Number(now) && (date <= new Date(closest) || date <= closest)) {
        closest = date;
        closestIndex = i;
      }
    });
    closestShipping = closestShipping = shippingDates.length > closestIndex ? shippingDates[closestIndex] : null;
  }

  return exports.getReadableShippingSched(closestShipping);
}

export const getReadableShippingSched = shippingDate => {
  const { date, time_start = '00:00', time_end = '24:00' } = shippingDate || {};
  if (!date || !shippingDate) return 'Jadwal belum ada'; 
  
  const relativeDate = getIntervalDateToday(moment(date, 'YYYY-MM-DD'), 'DD MMM');
  let timeRange = '';
  if (time_start !== '00:00' || time_end === '24:00' || time_end === '00:00') {
    timeRange = `(${time_start} - ${time_end})`;
  }
  return `${relativeDate ? `${relativeDate}` : ``}${timeRange ? ` ${timeRange}` : ``}`;
}
