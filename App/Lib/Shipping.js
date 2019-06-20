import moment from 'moment';

import { getIntervalDateToday } from './Date';

export const getUpcomingShippingSched = (shippingDates = []) => {
  const now = new Date();
  let closest = Infinity;
  let closestIndex = 0;

  shippingDates.forEach((d, i) => {
    const { date: itemDate } = d || {};
     var date = new Date(itemDate);
     if (date >= now && (date < new Date(closest) || date < closest)) {
        closest = itemDate;
        closestIndex = i;
     }
  });

  const closestShipping = shippingDates.length > closestIndex ? shippingDates[closestIndex] : null;
  return exports.getReadableShippingSched(closestShipping);
}

export const getReadableShippingSched = shippingDate => {
  const { date, time_start = '00:00', time_end = '24:00' } = shippingDate || {};
  if (!date || !shippingDate) return 'Jadwal tidak tersedia'; 
  
  const relativeDate = getIntervalDateToday(moment(date, 'YYYY-MM-DD'));
  let timeRange = '';
  if (time_start !== '00:00' || time_end === '24:00' || time_end === '00:00') {
    timeRange = `${time_start} - ${time_end}`;
  }
  return `${relativeDate ? `${relativeDate}` : ``}${timeRange ? `, ${timeRange}` : ``}`;
}
