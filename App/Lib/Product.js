import Config from 'Config/AppConfig';

export const getReadableTotalWeight = products => {
  if (!Array.isArray(products) || !products.length) return 'Total tidak diketahui';
  const totalInWeight = exports.getTotalWeight(products);
  const totalPcs = products
    .filter(({ product: { unit } = {}}) => unit === Config.weightType.PIECES)
    .reduce((total, { qty = 0, product: { packaging } = {} }) => total + (qty * packaging), 0);
  return `${totalInWeight ? `${totalInWeight} Kg` : ``}${totalPcs ? ` dan ${totalPcs} pcs`: ``}`;
};

export const getTotalWeight = products => {
  if (!Array.isArray(products) || !products.length) return 'Total tidak diketahui';
  const totalKilogram = products
    .filter(({ product: { unit } = {}}) => unit === Config.weightType.KILOGRAM)
    .reduce((total, { qty = 0, product: { packaging } = {} }) => total + (qty * packaging), 0);
  const totalGram = products
    .filter(({ product: { unit } = {}}) => unit === Config.weightType.GRAM)
    .reduce((total, { qty = 0, product: { packaging } = {} }) => total + (qty * packaging), 0);
  
  return parseFloat((totalKilogram + (totalGram / 1000)).toFixed(2));
};

export const getAggregateProducts = products => {
  if (!Array.isArray(products) || !products.length) return '-';
  return products.map(({ product: { title } }) => title).join(', ');
}