// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
//
// 有效字符串需满足：
//
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = s => {
  const { length } = s;
  if (!length || length % 2) {
    return false;
  }
  let len = length / 2;
  while (len) {
    s = s
      .replace('[]', '')
      .replace('{}', '')
      .replace('()', '')
    --len;
  }
  return !s.length;
};
