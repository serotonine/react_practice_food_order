export function setPrice(price) {
  const nbFormat = new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
  });
  return nbFormat.format(price);
}
export function getTotal(data) {
  if (!Array.isArray(data)) {
    return false;
  }
  return data.reduce(
    (prevprice, item) => prevprice + item.price * item.quantity,
    0
  );
}
