// Add 2 decimals to price
const formatPrice = price => {
  if (price % 1 !== 0) {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  return price.toLocaleString();
};

export { formatPrice };
