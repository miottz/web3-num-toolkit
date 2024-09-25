export declare const _convertScientificToNumberString: (num: number) => string;
export declare const _findFirstNonZeroIndex: (str: string) => number;
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
export declare function formatPriceDecimals(number: number | string): string;
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
export declare function formatVolumeDecimals(value: number | string): string;
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
export declare function formatVolumeDecimalsZh(value: number | string): string;
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
export declare function formatPercentageDecimals(value: number | string): string;
/**
 * @description: 千分符展示
 * @param {number}  value
 * @return {*}
 */
export declare function thousandSeparatorNum(value: number | string): string;
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
export declare function formatVolumeInt(value: number | string): string;
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
export declare function formatVolumeIntZh(value: number | string): string;
/**
 * @description: 小数折叠0的个数后展示，如0.000000009123 =>0.0{9}123
 * @param {number} value
 * @param {number} foldingBoundary
 * @return {*}
 */
export declare function formatMinimumDecimals(value: number | string, foldingBoundary?: number): string;
/**
 * @description: 将小数值转换为固定精度的整数
 * @param {string | number} value - 要转换的小数值
 * @param {number} precision - 小数位数（默认为18位）
 * @return {string} - 转换后的整数值（字符串形式）
 */
export declare function fixedToInt(value: string | number, precision?: number): string;
/**
 * @description: 将固定精度的整数转换为小数值
 * @param {string | number} value - 要转换的整数值
 * @param {number} precision - 小数位数（默认为18位）
 * @return {string} - 转换后的小数值（字符串形式）
 */
export declare function intoFixed(value: string | number, precision?: number): string;
/**
 * @description: 格式化哈希，省略中间部分
 * @param {string} hash
 * @param {number} startLen
 * @param {number} endLen
 * @return {*}
 */
export declare function formatHash(hash: string, startLen?: number, endLen?: number | null): string;
/**
 * @description: base64转hex
 * @param {string} base64
 * @return {*}
 */
export declare function base64ToHex(base64: string): string;
