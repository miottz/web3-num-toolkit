const formatWithDecimals = (value, decimalPlaces = 2) => {
    if (isNaN(value))
        return '-';
    return value.toFixed(decimalPlaces);
};
const formatLargeNumber = (value) => {
    if (value >= 1000000)
        return (value / 1000000).toFixed(2) + 'M';
    if (value >= 1000)
        return (value / 1000).toFixed(2) + 'K';
    return value.toString();
};

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const percentage = (value, total) => {
    if (total === 0)
        return '-';
    return ((value / total) * 100).toFixed(2) + '%';
};

export { add, formatLargeNumber, formatWithDecimals, multiply, percentage };
