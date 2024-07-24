//给你一个 32 位的有符号整数 x ，返回 x 中每位上的数字反转后的结果。
//
// 如果反转后整数超过 32 位的有符号整数的范围 [−231, 231 − 1] ，就返回 0。
//假设环境不允许存储 64 位整数（有符号或无符号）。
//
//
//
// 示例 1：
//
//
//输入：x = 123
//输出：321
//
//
// 示例 2：
//
//
//输入：x = -123
//输出：-321
//
//
// 示例 3：
//
//
//输入：x = 120
//输出：21
//
//
// 示例 4：
//
//
//输入：x = 0
//输出：0
//
//
//
//
// 提示：
//
//
// -231 <= x <= 231 - 1
//
// Related Topics 数学
// 👍 2584 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} x
 * @return {number}
 */
const reverse = (x) => {
  const MAX_VALUE = Math.pow(2, 31)
  if (x === 0) {
    return 0
  }
  const isPositive = x > 0
  let absVal = Math.abs(x)
  let result
  while (result === 0) {
    result = absVal % 10
    if (!result) {
      absVal = absVal / 10
    }
  }
  absVal = absVal.toString().split('').reverse().join('')
  const res = parseInt(isPositive ? absVal : 0 - absVal, 10)
  if ((res > MAX_VALUE - 1) || (res < -MAX_VALUE)) {
    return 0
  }
  return res
}


// var reverse = function(x) {
//   let result = 0;
//   while(x !== 0) {
//     result = result * 10 + x % 10;
//     x = (x / 10) | 0;
//   }
//   return (result | 0) === result ? result : 0;
// };
