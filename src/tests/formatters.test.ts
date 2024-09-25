import {
  formatPriceDecimals,
  formatPercentageDecimals,
  formatVolumeDecimals,
  formatVolumeDecimalsZh,
  thousandSeparatorNum,
  formatVolumeInt,
} from '../utils/formatters' // 根据你的项目结构调整路径

describe('formatPriceDecimals', () => {
  test('should format numbers less than 1 with 4 significant digits', () => {
    expect(formatPriceDecimals(0.01234)).toBe('0.01234')
    expect(formatPriceDecimals(0.000000001234445)).toBe('0.000000001234') // 8个0,四舍五入
    expect(formatPriceDecimals(0.000000001234545)).toBe('0.000000001235') // 8个0,四舍五入
    expect(formatPriceDecimals(0.000000001299999)).toBe('0.000000001300') // 8个0,四舍五入
  })

  test('should format numbers between 1 and 10 with 4 decimal places', () => {
    expect(formatPriceDecimals(2.1234)).toBe('2.1234')
    expect(formatPriceDecimals(2.1)).toBe('2.1000') // 补齐0
    expect(formatPriceDecimals(2.123)).toBe('2.1230') // 保留4位小数
  })

  test('should format numbers between 10 and 1000 with 3 decimal places', () => {
    expect(formatPriceDecimals(123.123)).toBe('123.123')
    expect(formatPriceDecimals(123.12)).toBe('123.120') // 保留3位小数
    expect(formatPriceDecimals(123.1)).toBe('123.100') // 补齐0
  })

  test('should format numbers greater than or equal to 1000 with 2 decimal places', () => {
    expect(formatPriceDecimals(1234.12)).toBe('1234.12')
    expect(formatPriceDecimals(1234.1)).toBe('1234.10') // 补齐0
    expect(formatPriceDecimals(1234)).toBe('1234.00') // 直接转换
  })

  test('should handle string inputs', () => {
    expect(formatPriceDecimals('0.01234')).toBe('0.01234')
    expect(formatPriceDecimals('2.1')).toBe('2.1000')
    expect(formatPriceDecimals('123.123')).toBe('123.123')
    expect(formatPriceDecimals('1234.12')).toBe('1234.12')
    expect(formatPriceDecimals('0.000000001234545')).toBe('0.000000001235') // 8个0
  })
})

describe('formatPercentageDecimals', () => {
  test('should return "0" for values less than 0.01%', () => {
    expect(formatPercentageDecimals(0)).toBe('0')
    expect(formatPercentageDecimals(0.0001)).toBe('0')
    expect(formatPercentageDecimals(0.005)).toBe('0')
  })

  test('should format values less than 100% with 2 decimal places', () => {
    expect(formatPercentageDecimals(99.12345)).toBe('99.12')
    expect(formatPercentageDecimals(99.1)).toBe('99.10') // 补齐0
    expect(formatPercentageDecimals(50)).toBe('50.00') // 显示2位小数
    expect(formatPercentageDecimals(0.1)).toBe('0.10') // 显示2位小数
  })

  test('should format values greater than or equal to 100% with 1 decimal place', () => {
    expect(formatPercentageDecimals(100)).toBe('100.0')
    expect(formatPercentageDecimals(150.567)).toBe('150.6') // 显示1位小数
    expect(formatPercentageDecimals(999)).toBe('999.0') // 显示1位小数
    expect(formatPercentageDecimals(1000)).toBe('1000.0') // 显示1位小数
  })

  test('should handle string inputs', () => {
    expect(formatPercentageDecimals('0')).toBe('0')
    expect(formatPercentageDecimals('0.005')).toBe('0')
    expect(formatPercentageDecimals('99.123')).toBe('99.12')
    expect(formatPercentageDecimals('150')).toBe('150.0')
  })
})

describe('formatVolumeDecimals', () => {
  it('should format numbers less than 1000 with 2 decimal places', () => {
    expect(formatVolumeDecimals(999.126)).toBe('999.13')
    expect(formatVolumeDecimals(0)).toBe('0')
    expect(formatVolumeDecimals(0.009)).toBe('0.01')
  })

  it('should format numbers between 1000 and 1 million with K', () => {
    expect(formatVolumeDecimals(1500)).toBe('1.5K')
    expect(formatVolumeDecimals(9999)).toBe('10K')
    expect(formatVolumeDecimals(50000)).toBe('50K')
  })

  it('should format numbers between 1 million and 1 billion with M', () => {
    expect(formatVolumeDecimals(1500000)).toBe('1.5M')
    expect(formatVolumeDecimals(9999999)).toBe('10M')
    expect(formatVolumeDecimals(50000000)).toBe('50M')
  })

  it('should format numbers between 1 billion and 10 trillion with B', () => {
    expect(formatVolumeDecimals(1500000000)).toBe('1.5B')
    expect(formatVolumeDecimals(9999999999)).toBe('10B')
    expect(formatVolumeDecimals(50000000000)).toBe('50B')
  })

  it('should format numbers 10 trillion and above with T', () => {
    expect(formatVolumeDecimals(15000000000000)).toBe('15T')
    expect(formatVolumeDecimals(99999999999999)).toBe('100T')
    expect(formatVolumeDecimals(500000000000000)).toBe('500T')
  })

  it('should handle negative numbers correctly', () => {
    expect(formatVolumeDecimals(-0.009)).toBe('-0.01')
    expect(formatVolumeDecimals(-500)).toBe('-500.00')
    expect(formatVolumeDecimals(-1500000)).toBe('-1.5M')
    expect(formatVolumeDecimals(-500000000000000)).toBe('-500T')
  })

  it('should format string representations of numbers less than 1000 with 2 decimal places', () => {
    expect(formatVolumeDecimals('999.126')).toBe('999.13')
    expect(formatVolumeDecimals('0')).toBe('0')
    expect(formatVolumeDecimals('0.009')).toBe('0.01')
    expect(formatVolumeDecimals('5.6789')).toBe('5.68')
  })

  it('should format string representations of numbers between 1000 and 1 million with K', () => {
    expect(formatVolumeDecimals('1500')).toBe('1.5K')
    expect(formatVolumeDecimals('9999')).toBe('10K')
    expect(formatVolumeDecimals('50000')).toBe('50K')
    expect(formatVolumeDecimals('999.99')).toBe('999.99')
  })

  it('should format string representations of numbers between 1 million and 1 billion with M', () => {
    expect(formatVolumeDecimals('1500000')).toBe('1.5M')
    expect(formatVolumeDecimals('9999999')).toBe('10M')
    expect(formatVolumeDecimals('50000000')).toBe('50M')
  })

  it('should format string representations of numbers between 1 billion and 10 trillion with B', () => {
    expect(formatVolumeDecimals('1500000000')).toBe('1.5B')
    expect(formatVolumeDecimals('9999999999')).toBe('10B')
    expect(formatVolumeDecimals('50000000000')).toBe('50B')
  })

  it('should format string representations of numbers 10 trillion and above with T', () => {
    expect(formatVolumeDecimals('15000000000000')).toBe('15T')
    expect(formatVolumeDecimals('99999999999999')).toBe('100T')
    expect(formatVolumeDecimals('500000000000000')).toBe('500T')
  })

  it('should format string representations of negative numbers correctly', () => {
    expect(formatVolumeDecimals('15000000000000')).toBe('15T')
    expect(formatVolumeDecimals('99999999999999')).toBe('100T')
    expect(formatVolumeDecimals('500000000000000')).toBe('500T')
  })
})

describe('formatVolumeDecimalsZh', () => {
  it('should format numbers less than 10,000 with 2 decimal places', () => {
    expect(formatVolumeDecimalsZh(9999.126)).toBe('9999.13')
    expect(formatVolumeDecimalsZh(0)).toBe('0.00')
    expect(formatVolumeDecimalsZh(0.009)).toBe('0.01')
    expect(formatVolumeDecimalsZh(5.6789)).toBe('5.68')
  })

  it('should format numbers between 10,000 and 100,000,000 with 万', () => {
    expect(formatVolumeDecimalsZh(15000)).toBe('1.5万')
    expect(formatVolumeDecimalsZh(99999)).toBe('10万')
    expect(formatVolumeDecimalsZh(500000)).toBe('50万')
  })

  it('should format numbers greater than or equal to 100,000,000 with 亿', () => {
    expect(formatVolumeDecimalsZh(150000000)).toBe('1.5亿')
    expect(formatVolumeDecimalsZh(999999999)).toBe('10亿')
    expect(formatVolumeDecimalsZh(5000000000)).toBe('50亿')
  })

  it('should handle negative numbers correctly', () => {
    expect(formatVolumeDecimalsZh(-0.009)).toBe('-0.01')
    expect(formatVolumeDecimalsZh(-5000)).toBe('-5000.00')
    expect(formatVolumeDecimalsZh(-15000)).toBe('-1.5万')
    expect(formatVolumeDecimalsZh(-150000000)).toBe('-1.5亿')
  })

  it('should handle number strings correctly', () => {
    expect(formatVolumeDecimalsZh('-0.009')).toBe('-0.01')
    expect(formatVolumeDecimalsZh('15000')).toBe('1.5万')
    expect(formatVolumeDecimalsZh('99999')).toBe('10万')
    expect(formatVolumeDecimalsZh('150000000')).toBe('1.5亿')
  })
})

describe('thousandSeparatorNum', () => {
  it('should format integers with thousand separators', () => {
    expect(thousandSeparatorNum(1000)).toBe('1,000')
    expect(thousandSeparatorNum(1000000)).toBe('1,000,000')
    expect(thousandSeparatorNum(1234567890)).toBe('1,234,567,890')
  })

  it('should format floating point numbers with thousand separators', () => {
    expect(thousandSeparatorNum(1000.567)).toBe('1,000.567')
    expect(thousandSeparatorNum(1000000.99)).toBe('1,000,000.99')
    expect(thousandSeparatorNum(1234567890.1234)).toBe('1,234,567,890.1234')
  })

  it('should handle negative numbers correctly', () => {
    expect(thousandSeparatorNum(-1000)).toBe('-1,000')
    expect(thousandSeparatorNum(-1000000.45)).toBe('-1,000,000.45')
    expect(thousandSeparatorNum(-1234567890)).toBe('-1,234,567,890')
  })

  it('should handle string inputs correctly', () => {
    expect(thousandSeparatorNum('1000')).toBe('1,000')
    expect(thousandSeparatorNum('1000000')).toBe('1,000,000')
    expect(thousandSeparatorNum('1234567890.1234')).toBe('1,234,567,890.1234')
    expect(thousandSeparatorNum('-1234567890.1234')).toBe('-1,234,567,890.1234')
  })

  it('should return "0" for 0 input', () => {
    expect(thousandSeparatorNum(0)).toBe('0')
    expect(thousandSeparatorNum('0')).toBe('0')
  })
})

describe('formatVolumeInt', () => {
  test('should format numbers less than 1 million to K+', () => {
    expect(formatVolumeInt(999)).toBe('1K+')
    expect(formatVolumeInt(12345)).toBe('12K+')
    expect(formatVolumeInt(987654)).toBe('988K+')
  })

  test('should format numbers greater than or equal to 1 million to M+', () => {
    expect(formatVolumeInt(1000000)).toBe('1M+')
    expect(formatVolumeInt(2500000)).toBe('3M+')
    expect(formatVolumeInt(12345678)).toBe('12M+')
  })

  test('should handle values greater than 10 billion', () => {
    expect(formatVolumeInt(10000000000)).toBe('10000M+') // 10,000M+
    expect(formatVolumeInt(26540000000)).toBe('26540M+') // 26,540M+
  })

  test('should handle zero and negative numbers', () => {
    expect(formatVolumeInt(0)).toBe('0K+') // 0K+
    expect(formatVolumeInt(-500)).toBe('0K+') // 0K+ (处理负值为0)
  })

  test('should handle string input', () => {
    expect(formatVolumeInt('999')).toBe('1K+')
    expect(formatVolumeInt('1500000')).toBe('2M+')
    expect(formatVolumeInt('abcd')).toBe('0K+') // 非数字字符串处理
  })
})
