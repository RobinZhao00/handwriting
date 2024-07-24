/**
<p>给定一个由 <strong>整数 </strong>组成的<strong> 非空</strong> 数组所表示的非负整数，在该数的基础上加一。</p>

<p>最高位数字存放在数组的首位， 数组中每个元素只存储<strong>单个</strong>数字。</p>

<p>你可以假设除了整数 0 之外，这个整数不会以零开头。</p>

<p>&nbsp;</p>

<p><strong>示例&nbsp;1：</strong></p>

<pre>
<strong>输入：</strong>digits = [1,2,3]
<strong>输出：</strong>[1,2,4]
<strong>解释：</strong>输入数组表示数字 123。
</pre>

<p><strong>示例&nbsp;2：</strong></p>

<pre>
<strong>输入：</strong>digits = [4,3,2,1]
<strong>输出：</strong>[4,3,2,2]
<strong>解释：</strong>输入数组表示数字 4321。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>digits = [0]
<strong>输出：</strong>[1]
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
 <li><code>1 &lt;= digits.length &lt;= 100</code></li>
 <li><code>0 &lt;= digits[i] &lt;= 9</code></li>
</ul>

<div><div>Related Topics</div><div><li>数组</li><li>数学</li></div></div><br><div><li>👍 1354</li><li>👎 0</li></div>
*/

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let result = []
  const { length } = digits
  let add = 1
  for (let i = 0; i < length; i++) {
    const sum = digits[length -i -1] + add
    result[length -i -1] = sum % 10
    add = Math.floor(sum / 10)
  }
  return add ? [add, ...result] : result
};
//leetcode submit region end(Prohibit modification and deletion)

// if (digits[length -1] < 9) {
//   result[length -1] = digits[length -1] + 1
//   break
// }
// result[length -1] = 0
