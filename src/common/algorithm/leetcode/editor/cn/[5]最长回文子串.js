/**
<p>给你一个字符串 <code>s</code>，找到 <code>s</code> 中最长的回文<span data-keyword="substring">子串</span>。</p>

<p>如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "babad"
<strong>输出：</strong>"bab"
<strong>解释：</strong>"aba" 同样是符合题意的答案。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "cbbd"
<strong>输出：</strong>"bb"
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
 <li><code>1 &lt;= s.length &lt;= 1000</code></li>
 <li><code>s</code> 仅由数字和英文字母组成</li>
</ul>

<div><div>Related Topics</div><div><li>字符串</li><li>动态规划</li></div></div><br><div><li>👍 7164</li><li>👎 0</li></div>
*/

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {

};
//leetcode submit region end(Prohibit modification and deletion)


var fib = function(n) {
  let prev = 0, curr = 1;
  if (n === 0) {
    return 0;
  }
  for (let i = 1; i < n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
};


const quickSort = (arr = []) => {
  if (arr.length <= 1) {
    return arr;
  }
  const left = [];
  const right = [];
  const pivotIdx = Math.floor(arr.length / 2);
  const pivot = arr[pivotIdx];
  for (let i = 0; i < arr.length; i++) {
    if (i !== pivotIdx) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};



