/**
<p>给你两个整数数组&nbsp;<code>nums1</code> 和 <code>nums2</code> ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [1,2,2,1], nums2 = [2,2]
<strong>输出：</strong>[2,2]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入：</strong>nums1 = [4,9,5], nums2 = [9,4,9,8,4]
<strong>输出：</strong>[4,9]</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
 <li><code>1 &lt;= nums1.length, nums2.length &lt;= 1000</code></li>
 <li><code>0 &lt;= nums1[i], nums2[i] &lt;= 1000</code></li>
</ul>

<p>&nbsp;</p>

<p><strong><strong>进阶</strong>：</strong></p>

<ul>
 <li>如果给定的数组已经排好序呢？你将如何优化你的算法？</li>
 <li>如果&nbsp;<code>nums1</code><em>&nbsp;</em>的大小比&nbsp;<code>nums2</code> 小，哪种方法更优？</li>
 <li>如果&nbsp;<code>nums2</code><em>&nbsp;</em>的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？</li>
</ul>

<div><div>Related Topics</div><div><li>数组</li><li>哈希表</li><li>双指针</li><li>二分查找</li><li>排序</li></div></div><br><div><li>👍 1025</li><li>👎 0</li></div>
*/

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
   const { length: nums1Length } = nums1
   const { length: nums2Length } = nums2
   const countArray = nums1Length > nums2Length ? nums2 : nums1
   const deleteArray = nums1Length > nums2Length ? nums1 : nums2
   const count = countArray.length
   const result = []
   for (let i = 0; i < count; i++) {
      const current = countArray[i]
      console.log('current', countArray, current, i)
      const index = deleteArray.indexOf(current)
      if (index > -1) {
         result.push(current)
         deleteArray.splice(index,1)
      }
   }
   return result
};

