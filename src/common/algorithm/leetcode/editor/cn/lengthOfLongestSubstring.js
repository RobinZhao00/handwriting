// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
const lengthOfLongestSubstring = (str) => {
  const getStr = (s, res) => {
    const { length: strLength } = s;
    if (!strLength || res > strLength) {
      return res;
    }
    let currentResult = '';
    for (let i = 0; i < strLength; i++) {
      if (currentResult.indexOf(s[i]) > -1) {
        break;
      }
      currentResult += s[i];
    }
    res = Math.max(res, currentResult.length)
    return getStr(s.slice(1), res);
  }
  return getStr(str, 0);
}
