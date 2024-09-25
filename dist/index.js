const _convertScientificToNumberString = (num) => {
    if (!String(num).includes('e'))
        return String(num);
    return num.toFixed(20).replace(/\.?0+$/, '');
};
const _findFirstNonZeroIndex = (str) => {
    var _a;
    const match = str.match(/[1-9]/); // 匹配第一个不为 0 的数字
    if (match) {
        return (_a = match.index) !== null && _a !== void 0 ? _a : -1;
    }
    else {
        return -1; // 如果没有找到不为 0 的数字，则返回 -1
    }
};
/**
 * 格式化价格以进行展示------
"数据极小值处理规则
a.数据小于1：展示4位有效数字，之后四舍五入，例：0.01234、0.000000001234
数据正常值处理规则
a.数据大于等于1，小于10：小数点后显示4位数字，小数点不足使用0填充，之后四舍五入，例：2.1234、2.1230
b.数据大于等于10，小于1000：小数点后展示3位数字，小数点不足使用0填充，之后四舍五入，例：123.123、123.120
数据极大值处理规则
a.数据大于等于1000：小数点后显示2位数字，小数点不足使用0填充，之后四舍五入，例：1234.12、1234.10"
 * @param value
 * @returns
 */
function formatPriceDecimals(number) {
    var _a;
    const num = Number(number || 0);
    if (num < 1) {
        const decimalPart = (_a = _convertScientificToNumberString(num).split('.')[1]) !== null && _a !== void 0 ? _a : _convertScientificToNumberString(num).split('.')[0];
        const nonZeroIndex = _findFirstNonZeroIndex(decimalPart);
        if (nonZeroIndex === -1) {
            return '-';
        }
        else {
            let count = 1;
            for (let i = nonZeroIndex + 1; i < decimalPart.length; i++) {
                if (decimalPart[i] !== '0') {
                    count++;
                }
                else {
                    break;
                }
            }
            const precision = nonZeroIndex + (count > 4 ? 4 : count);
            return num.toFixed(precision);
        }
    }
    else if (num < 10) {
        return num.toFixed(4);
    }
    else if (num < 1000) {
        return num.toFixed(3);
    }
    else {
        return num.toFixed(2);
    }
}
/**
 * @description
 * 格式化市值、交易量------
数字处理规则
a.数据小于1000：正常显示，小数点后显示2位数字，小数点不足使用0填充，之后四舍五入， 例：999.12
b.数据大于等于1000，小于100万：使用K为单位处理数字
c..数据大于等于100万，小于10亿：使用M为单位处理数字
d.数据大于等于10亿,小于10000亿：使用B为单位处理数字
e.数据大于等于10000亿：使用T为单位处理数字
处理后的纯数字展示规则
 a.数据大于等于100：小数点后展示1位数字，之后四舍五入 例：381.3M
 b.数据小于100：小数点后展示2位数字，小数点不足使用0填充，之后四舍五入 例：89.12M"
 * @param {number} value
 * @return {*}
 */
function formatVolumeDecimals(value) {
    let num = Number(value || 0);
    const units = ['', 'K', 'M', 'B', 'T'];
    let unitIndex = 0;
    while (Math.abs(num) >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }
    const formattedNumber = num !== 0 ? num.toFixed(unitIndex === 0 ? 2 : 1) : '0';
    let result;
    if (formattedNumber.endsWith('.0')) {
        result = formattedNumber.slice(0, -2) + units[unitIndex];
    }
    else {
        result = formattedNumber + units[unitIndex];
    }
    return result;
}
/**
 *
 * @description
 * 格式化市值、交易量（中文）------
"数字处理规则
a.数据小于1万：正常显示，小数点后显示2位数字，小数点不足使用0填充，之后四舍五入  例：9999.12
b.数据大于等于1万，小于1亿：使用万为单位处理数字
c.数据大于等于1亿：使用亿为单位处理数字
处理后的纯数字展示规则
 a.数据大于等于100：小数点后展示1位数字，之后四舍五入 例：381.3万
 b.数据小于100：小数点后展示2位数字，小数点不足使用0填充，之后四舍五入 例：89.12万"
 * @param {number} value
 * @return {*}
 */
function formatVolumeDecimalsZh(value) {
    let number = Number(value || 0);
    const units = ['', '万', '亿'];
    let unitIndex = 0;
    while (Math.abs(number) >= 10000 && unitIndex < units.length - 1) {
        number /= 10000;
        unitIndex++;
    }
    const formattedNumber = number.toFixed(unitIndex === 0 ? 2 : 1);
    if (formattedNumber.endsWith('.0')) {
        return formattedNumber.slice(0, -2) + units[unitIndex];
    }
    else {
        return formattedNumber + units[unitIndex];
    }
}
/**
 * @description
 * 格式化百分比展示------
"数据极小值处理规则
a.数据小于0.01%：显示–
数据正常值规则
a.数据小于100.00%：正常显示，小数点后显示2位数字，小数点不足使用0填充 例：99.12%
数据极大值显示规则
a.数据大于等于100.0%：小数点后显示1位数字，小数点不足使用0填充 例：999.1%"
 * @param {number} value
 * @return {*}
 */
function formatPercentageDecimals(value) {
    const num = Number(value || 0);
    if (num < 0.01) {
        return '0';
    }
    else if (num < 100) {
        return num.toFixed(2);
    }
    else {
        return num.toFixed(1);
    }
}
/**
 * @description: 千分符展示
 * @param {number}  value
 * @return {*}
 */
function thousandSeparatorNum(value) {
    const arr = value.toString().split('.');
    const one = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // return arr.length > 1 && arr[1].length > 0 ? `${one}.${arr[1]}` : one
    return arr.length > 1 ? `${one}.${arr[1]}` : one;
}
/**
 * @description
 * 首焦数据背书展示，整数、非中文------
数字处理规则
"数据极小值处理规则
a.不考虑
数据正常值处理规则
a.数据小于1百万：取整，以K为单位显示，例：98K+
b.数据大于等于1百万：取整，以M为单位显示，例：26M+
数据极大值处理规则
a.数据大于百亿：取整，以M为单位显示，例：2,654M+"
 * @param {number} value
 * @return {*}
 */
function formatVolumeInt(value) {
    const num = Number(value) || 0;
    // 数据小于 1,000,000
    if (num < 1000000) {
        return `${Math.round(num / 1000)}K+`; // 取整并以 K 为单位显示
    }
    return `${Math.round(num / 1000000)}M+`; // 取整并以 M 为单位显示
}
/**
 * @description
 * 首焦数据背书展示，整数、中文------
"数据极小值处理规则
a.不考虑
数据正常值处理规则
a.数据小于100万：取整，以万为单位显示，例：98万+
b.数据大于等于100万，小于1000万：取整，以百万为单位显示，例：9百万+
c.数据大于等于1千万，小于1亿：取整，以千万为单位显示，例：9千万+
d.数据大于等于1亿：取整，以亿为单位显示，例：982亿+"
 * @param {number} value
 * @return {*}
 */
function formatVolumeIntZh(value) {
    const num = Number(value) || 0;
    if (num < 10000) {
        return `${Math.round(num)}+`; // 数据小于1万：直接显示整数
    }
    else if (num >= 10000 && num < 1000000) {
        return `${Math.round(num / 10000)}万+`; // 数据小于100万，取整，以万为单位显示
    }
    else if (num >= 1000000 && num < 10000000) {
        return `${Math.round(num / 1000000)}百万+`; // 数据大于等于100万，小于1000万，取整，以百万为单位显示
    }
    else if (num >= 10000000 && num < 100000000) {
        return `${Math.round(num / 10000000)}千万+`; // 数据大于等于1000万，小于1亿，取整，以千万为单位显示
    }
    else {
        return `${Math.round(num / 100000000)}亿+`; // 数据大于等于1亿，取整，以亿为单位显示
    }
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const percentage = (value, total) => {
    if (total === 0)
        return '-';
    return ((value / total) * 100).toFixed(2) + '%';
};

export { _convertScientificToNumberString, _findFirstNonZeroIndex, add, formatPercentageDecimals, formatPriceDecimals, formatVolumeDecimals, formatVolumeDecimalsZh, formatVolumeInt, formatVolumeIntZh, multiply, percentage, thousandSeparatorNum };
