export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getStringProductPrice = (product) => {
  return product.count === 1
    ? product.price
    : `${product.count}x${product.price}`;
};

export const printAddress = ({ street, building, flat }) => {
  const flatString = flat?.trim() ? `, кв. ${flat}` : "";
  return `ул. ${street}, д. ${building}${flatString}`;
};
