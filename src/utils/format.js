export const formatTvl = (tvl) => {
  const order = Math.floor(Math.log10(tvl) / 3);
  if (order < 0) { return '$0.00'; }

  const units = ['', 'k', 'M', 'B', 'T'];
  const num = tvl / 1000 ** order;

  return `$ ${num.toFixed(2)}${units[order]}`;
};