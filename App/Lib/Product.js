import Config from 'Config/AppConfig';

export const calcTotalWeight = products => {
  if (!Array.isArray(products) || !products.length) return 'Total tidak diketahui';
  const totalKilogram = products
    .filter(({ product: { unit } = {}}) => unit === Config.weightType.KILOGRAM)
    .reduce((total, { qty = 0 }) => total + qty, 0);
  const totalGram = products
    .filter(({ product: { unit } = {}}) => unit === Config.weightType.GRAM)
    .reduce((total, { qty = 0 }) => total + qty, 0);
  const totalPcs = products
    .filter(({ product: { unit } = {}}) => unit === Config.weightType.PIECES)
    .reduce((total, { qty = 0 }) => total + qty, 0);
  
  const totalInWeight = parseFloat((totalKilogram + (totalGram / 1000)).toFixed(2));
  return `${totalInWeight ? `${totalInWeight} Kg` : ``}${totalPcs ? ` dan ${totalPcs} pcs`: ``}`;
};

export const getAggregateProducts = products => {
  if (!Array.isArray(products) || !products.length) return '-';
  return products.map(({ product: { title } }) => title).join(', ');
}