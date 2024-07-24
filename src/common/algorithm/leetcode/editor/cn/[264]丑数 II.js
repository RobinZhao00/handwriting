/**
 给你一个整数 n ，请你找出并返回第 n 个 丑数 。

 丑数 就是质因子只包含 2、3 和 5 的正整数。



 示例 1：


 输入：n = 10
 输出：12
 解释：[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是由前 10 个丑数组成的序列。


 示例 2：


 输入：n = 1
 输出：1
 解释：1 通常被视为丑数。




 提示：


 1 <= n <= 1690


 Related Topics 哈希表 数学 动态规划 堆（优先队列） 👍 1193 👎 0

 */

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
  let count = 0;
  let prev = 1;
  const result = [1];
  while (count < n) {
    prev++;
    if ((prev === 1) || (prev % 2 === 0) || (prev % 3 === 0) || (prev % 5 === 0)) {
      result.push(prev);
      count++;
    }
  }
  return result[count-1];
};
//leetcode submit region end(Prohibit modification and deletion)
