/**
给你一个整数数组 <code>nums</code> 。如果任一值在数组中出现 <strong>至少两次</strong> ，返回 <code>true</code> ；如果数组中每个元素互不相同，返回 <code>false</code> 。

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,1]
<strong>输出：</strong>true</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,4]
<strong>输出：</strong>false</pre>

<p><strong>示例&nbsp;3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,1,3,3,4,3,2,4,2]
<strong>输出：</strong>true</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
 <li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
 <li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>

<div><div>Related Topics</div><div><li>数组</li><li>哈希表</li><li>排序</li></div></div><br><div><li>👍 1074</li><li>👎 0</li></div>
*/

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
   return [...new Set(nums)].length !== nums.length
};
//leetcode submit region end(Prohibit modification and deletion)
