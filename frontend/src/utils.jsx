export const formatCurrency = (number) => {
    return new Intl.NumberFormat("de", {
        style: "currency",
        currency: "EUR"
    }).format(number);
};