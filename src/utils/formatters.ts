export const formatWithDecimals = (value: number, decimalPlaces: number = 2): string => {
    if (isNaN(value)) return '-';
    return value.toFixed(decimalPlaces);
  };
  
  export const formatLargeNumber = (value: number): string => {
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + 'M';
    if (value >= 1_000) return (value / 1_000).toFixed(2) + 'K';
    return value.toString();
  };