// Add 2 decimals to price
const formatNumber = number => {
  if (number == null) {
    return '';
  }

  if (number % 1 !== 0) {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  return number.toLocaleString();
};

export { formatNumber };
