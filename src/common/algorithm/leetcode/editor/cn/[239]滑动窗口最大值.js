/**
 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。


 返回 滑动窗口中的最大值 。



 示例 1：


 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
 输出：[3,3,5,5,6,7]
 解释：
 滑动窗口的位置                最大值
 ---------------               -----
 [1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7


 示例 2：


 输入：nums = [1], k = 1
 输出：[1]




 提示：


 1 <= nums.length <= 10⁵
 -10⁴ <= nums[i] <= 10⁴
 1 <= k <= nums.length


 Related Topics 队列 数组 滑动窗口 单调队列 堆（优先队列） 👍 2820 👎 0

 */

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  const result = [];
  const queue = [];
  for (let i = 0; i < nums.length; i++) {
    while (queue.length && nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop(); // 维护 q 的单调性
    }
    queue.push(i); // 入队
    // 2. 出
    if (i - queue[0] >= k) { // 队首已经离开窗口了
      queue.shift(); // 力扣没有 Deque，不过这样写也挺快的
    }
    // 3. 记录答案
    if (i >= k - 1) {
      // 由于队首到队尾单调递减，所以窗口最大值就是队首
      result.push(nums[queue[0]]);
    }
  }
  return result;
};



var lengthOfLongestSubstring = function (s) {
  let result = 0;
  let left = 0;
  const window = new Set()
  for (let right = 0; right < s.length; right++) {
    const current = s[right]
    while (window.has(current)) {
      window.delete(s[left++])
    }
    window.add(current)
    result = Math.max(result, right - left + 1)
  }
  return result;
};

const long = (s) => {
  let result = 0;
  let left = 0;
  const window = new Set();
  for (let right = 0; right < s.length; right++) {
    const current = s[right];
    while (window.has(current)) {
      window.delete(s[left++]);
    }
    window.add(current);
    result = Math.max(result, right - left + 1);
  }
  return result;
};
