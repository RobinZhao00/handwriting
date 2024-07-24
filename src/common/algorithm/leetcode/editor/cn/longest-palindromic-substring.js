/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = s => {
  const arr = s.split('');
  const { length } = arr;
  const isOdd = arr % 2;
  const middleIndex = isOdd ? Math.floor(length / 2) : Math.ceil(length / 2);
};

// 123455432999
