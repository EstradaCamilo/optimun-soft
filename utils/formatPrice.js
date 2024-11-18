export const formatPrice = (initialNumber) => {
  if (typeof initialNumber !== "number") {
    initialNumber = parseFloat(initialNumber);
  }

  if (isNaN(initialNumber)) {
    return "Número inválido";
  }

  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(initialNumber);
};
