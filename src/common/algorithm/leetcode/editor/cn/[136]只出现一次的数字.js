/**
<p>给你一个 <strong>非空</strong> 整数数组 <code>nums</code> ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。</p>

<p>你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。</p>

<div class="original__bRMd">
 <div>
  <p>&nbsp;</p>
 </div>
</div>

<p><strong class="example">示例 1 ：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,2,1]
<strong>输出：</strong>1
</pre>

<p><strong class="example">示例 2 ：</strong></p>

<pre>
<strong>输入：</strong>nums = [4,1,2,1,2]
<strong>输出：</strong>4
</pre>

<p><strong class="example">示例 3 ：</strong></p>

<pre>
<strong>输入：</strong>nums = [1]
<strong>输出：</strong>1
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
 <li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
 <li><code>-3 * 10<sup>4</sup> &lt;= nums[i] &lt;= 3 * 10<sup>4</sup></code></li>
 <li>除了某个元素只出现一次以外，其余每个元素均出现两次。</li>
</ul>

<div><div>Related Topics</div><div><li>位运算</li><li>数组</li></div></div><br><div><li>👍 3079</li><li>👎 0</li></div>
*/

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let count = Math.floor(nums.length / 2) + 1
  let result
   while (count > 0) {
     if (count === 1) {
       result = nums[0]
       break;
     }
     const [element,...res] = nums
     const idx = res.indexOf(element)
     if (idx === -1) {
       result = element
       break
     }
     res.splice(idx, 1)
     nums = res
     -- count
   }
  return result
};
//leetcode submit region end(Prohibit modification and deletion)
