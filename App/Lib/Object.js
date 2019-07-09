
export const filterObject = (obj, filter, filterValue) => {
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((acc, val) => {
      return (obj[val][filter] === filterValue ? {
        ...acc,
        [val]: obj[val]
      } : acc      
    )}, {});
  }
  return null;
};
