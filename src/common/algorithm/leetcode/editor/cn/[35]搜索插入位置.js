/**
 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

 请必须使用时间复杂度为 O(log n) 的算法。



 示例 1:


 输入: nums = [1,3,5,6], target = 5
 输出: 2


 示例 2:


 输入: nums = [1,3,5,6], target = 2
 输出: 1


 示例 3:


 输入: nums = [1,3,5,6], target = 7
 输出: 4




 提示:


 1 <= nums.length <= 10⁴
 -10⁴ <= nums[i] <= 10⁴
 nums 为 无重复元素 的 升序 排列数组
 -10⁴ <= target <= 10⁴


 Related Topics 数组 二分查找 👍 2341 👎 0

 */

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  nums.push(target)
  nums.sort((a, b) => a - b);
  let start = 0
  let end = nums.length-1
  while (start <= end) {
    const midIdx = Math.floor((start + end) / 2);
    const mid = nums[midIdx];
    if (target <= mid) {
      end = midIdx -1
    } else {
      start = midIdx + 1
    }
  }
  return start
};
//leetcode submit region end(Prohibit modification and deletion)
