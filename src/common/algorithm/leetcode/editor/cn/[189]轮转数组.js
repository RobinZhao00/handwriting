/**
 <p>给定一个整数数组 <code>nums</code>，将数组中的元素向右轮转 <code>k</code><em>&nbsp;</em>个位置，其中&nbsp;<code>k</code><em>&nbsp;</em>是非负数。</p>

 <p>&nbsp;</p>

 <p><strong>示例 1:</strong></p>

 <pre>
 <strong>输入:</strong> nums = [1,2,3,4,5,6,7], k = 3
 <strong>输出:</strong> <span><code>[5,6,7,1,2,3,4]</code></span>
 <strong>解释:</strong>
 向右轮转 1 步: <span><code>[7,1,2,3,4,5,6]</code></span>
 向右轮转 2 步: <span><code>[6,7,1,2,3,4,5]
 </code></span>向右轮转 3 步: <span><code>[5,6,7,1,2,3,4]</code></span>
 </pre>

 <p><strong>示例&nbsp;2:</strong></p>

 <pre>
 <strong>输入：</strong>nums = [-1,-100,3,99], k = 2
 <strong>输出：</strong>[3,99,-1,-100]
 <strong>解释:</strong>
 向右轮转 1 步: [99,-1,-100,3]
 向右轮转 2 步: [3,99,-1,-100]</pre>

 <p>&nbsp;</p>

 <p><strong>提示：</strong></p>

 <ul>
 <li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
 <li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
 <li><code>0 &lt;= k &lt;= 10<sup>5</sup></code></li>
 </ul>

 <p>&nbsp;</p>

 <p><strong>进阶：</strong></p>

 <ul>
 <li>尽可能想出更多的解决方案，至少有 <strong>三种</strong> 不同的方法可以解决这个问题。</li>
 <li>你可以使用空间复杂度为&nbsp;<code>O(1)</code> 的&nbsp;<strong>原地&nbsp;</strong>算法解决这个问题吗？</li>
 </ul>

 <div><div>Related Topics</div><div><li>数组</li><li>数学</li><li>双指针</li></div></div><br><div><li>👍 2074</li><li>👎 0</li></div>
 */

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// var rotate = function(nums, k) {
//   const { length } = nums
//   const actualStep = k % length
//   const backUp = [...nums]
//   for (let i = 0; i < length; i++) {
//     nums[(i + actualStep) % length] = backUp[i]
//   }
//   return nums
// }
var rotate = function(nums, k) {
  const cut = nums.length - k % nums.length
  const prev = nums.splice(cut)
  nums.splice(0, 0, ...prev)
  return nums
}
