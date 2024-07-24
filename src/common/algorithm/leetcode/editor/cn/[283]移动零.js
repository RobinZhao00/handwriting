/**
<p>给定一个数组 <code>nums</code>，编写一个函数将所有 <code>0</code> 移动到数组的末尾，同时保持非零元素的相对顺序。</p>

<p><strong>请注意</strong>&nbsp;，必须在不复制数组的情况下原地对数组进行操作。</p>

<p>&nbsp;</p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = <span><code>[0,1,0,3,12]</code></span>
<strong>输出:</strong> <span><code>[1,3,12,0,0]</code></span>
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = <span><code>[0]</code></span>
<strong>输出:</strong> <span><code>[0]</code></span></pre>

<p>&nbsp;</p>

<p><strong>提示</strong>:</p>
<meta charset="UTF-8" />

<ul>
 <li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
 <li><code>-2<sup>31</sup>&nbsp;&lt;= nums[i] &lt;= 2<sup>31</sup>&nbsp;- 1</code></li>
</ul>

<p>&nbsp;</p>

<p><b>进阶：</b>你能尽量减少完成的操作次数吗？</p>

<div><div>Related Topics</div><div><li>数组</li><li>双指针</li></div></div><br><div><li>👍 2290</li><li>👎 0</li></div>
*/

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let len = nums.length
  if(len < 2) return len

  let left = 0

  for(let i=0;i<len;i++){
    if(nums[i] !== 0){
      nums[left++] = nums[i]
      if(i >= left) nums[i] = 0
    }
  }
};
//leetcode submit region end(Prohibit modification and deletion)
