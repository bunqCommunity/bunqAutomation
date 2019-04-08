export const formatMoney = (value, currency = "EUR") => {
    const parsedValue = parseFloat(value);
    const localeType = "nl";

    return parsedValue.toLocaleString(localeType, {
        currency: currency,
        style: "currency",
        currencyDisplay: "symbol",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};
