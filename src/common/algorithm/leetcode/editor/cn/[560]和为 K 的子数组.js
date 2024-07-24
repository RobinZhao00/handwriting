/**
<p>给你一个整数数组 <code>nums</code> 和一个整数&nbsp;<code>k</code> ，请你统计并返回 <em>该数组中和为&nbsp;<code>k</code><strong>&nbsp;</strong>的子数组的个数&nbsp;</em>。</p>

<p>子数组是数组中元素的连续非空序列。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,1], k = 2
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3], k = 3
<strong>输出：</strong>2
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
 <li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
 <li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>
 <li><code>-10<sup>7</sup> &lt;= k &lt;= 10<sup>7</sup></code></li>
</ul>

<div><div>Related Topics</div><div><li>数组</li><li>哈希表</li><li>前缀和</li></div></div><br><div><li>👍 2313</li><li>👎 0</li></div>
*/

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  // 初始化前缀和和计数变量
  let prefixSumCount = new Map();
  prefixSumCount.set(0, 1); // 初始化哈希表，前缀和为0出现一次
  let currentSum = 0;
  let count = 0;

  // 遍历数组
  for (let i = 0; i < nums.length; i++) {
    // 更新当前前缀和
    currentSum += nums[i];

    // 计算目标前缀和
    let targetSum = currentSum - k;

    // 如果目标前缀和在哈希表中存在，则增加计数
    if (prefixSumCount.has(targetSum)) {
      count += prefixSumCount.get(targetSum);
    }

    // 更新哈希表中的当前前缀和出现次数
    if (prefixSumCount.has(currentSum)) {
      prefixSumCount.set(currentSum, prefixSumCount.get(currentSum) + 1);
    } else {
      prefixSumCount.set(currentSum, 1);
    }
  }

  return count;
};
//leetcode submit region end(Prohibit modification and deletion)
