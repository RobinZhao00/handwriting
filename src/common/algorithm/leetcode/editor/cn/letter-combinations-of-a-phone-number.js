// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = (digits) => {
  const DIGITS_MAPPING = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  }
  const digitsArr = digits.split('');
  const fullArr = digitsArr.map(digit => DIGITS_MAPPING[digit]);
  const { length } = fullArr;
  let result = [];
  for (let i = 0; i < length; i++) {
    const currentArr = fullArr[i];
    result = i === 0 ? currentArr : result.reduce((p, c) => [...p, ...currentArr.map(i => `${c}${i}`)], [])
  }
  return result;
};
letterCombinations('23');
