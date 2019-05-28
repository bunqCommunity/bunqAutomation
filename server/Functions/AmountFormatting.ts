import DineroInstance from "dinero.js";
DineroInstance.defaultCurrency = "EUR";
DineroInstance.defaultPrecision = 2;
DineroInstance.globalFormat = "$0,0.00";

export const Dinero = DineroInstance;

export const formatMoney = (value, currency = "EUR", isCents = false) => {
    let parsedValue = parseFloat(value);
    if (isCents === false) {
        parsedValue = parsedValue * 100;
    }

    const dineroObject = Dinero({ amount: parsedValue, currency: currency });

    return dineroObject.toFormat();
};
