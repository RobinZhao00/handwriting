// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

const isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }
  const xArr = x.toString().split('');
  const yArr = [...xArr].reverse();
  return Array.from({ length: xArr.length / 2 })
    .reduce((prev, curr, index) => prev = prev && (xArr[index] === yArr[index]), true)
};
