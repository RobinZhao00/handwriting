/**
<p>给你一个整数数组 <code>prices</code> ，其中&nbsp;<code>prices[i]</code> 表示某支股票第 <code>i</code> 天的价格。</p>

<p>在每一天，你可以决定是否购买和/或出售股票。你在任何时候&nbsp;<strong>最多</strong>&nbsp;只能持有 <strong>一股</strong> 股票。你也可以先购买，然后在 <strong>同一天</strong> 出售。</p>

<p>返回 <em>你能获得的 <strong>最大</strong> 利润</em>&nbsp;。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>prices = [7,1,5,3,6,4]
<strong>输出：</strong>7
<strong>解释：</strong>在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
&nbsp;    随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
     总利润为 4 + 3 = 7 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>prices = [1,2,3,4,5]
<strong>输出：</strong>4
<strong>解释：</strong>在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
&nbsp;    总利润为 4 。</pre>

<p><strong>示例&nbsp;3：</strong></p>

<pre>
<strong>输入：</strong>prices = [7,6,4,3,1]
<strong>输出：</strong>0
<strong>解释：</strong>在这种情况下, 交易无法获得正利润，所以不参与交易可以获得最大利润，最大利润为 0 。</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
 <li><code>1 &lt;= prices.length &lt;= 3 * 10<sup>4</sup></code></li>
 <li><code>0 &lt;= prices[i] &lt;= 10<sup>4</sup></code></li>
</ul>

<div><div>Related Topics</div><div><li>贪心</li><li>数组</li><li>动态规划</li></div></div><br><div><li>👍 2398</li><li>👎 0</li></div>
*/

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {

};
//leetcode submit region end(Prohibit modification and deletion)


var rotate = (matrix) => {
  let length = matrix.length
  //先上下交换
  for (let i = 0; i < length / 2; i++) {
    [matrix[length - i - 1], matrix[i]] = [matrix[i], matrix[length - i - 1]]
  }
  //在按照对角线交换
  for (let i = 0; i < length; ++i) {
    for (let j = i + 1; j < length; ++j) {
      [matrix[j][i], matrix[i][j]] = [matrix[i][j], matrix[j][i]]
    }
  }
}




var isValidSudoku = function(board) {
  const getSections = (arr) => {
    const { length } = arr
    const sqrt = Math.sqrt(length)
    const result = Array.from({ length: sqrt })
      .map(() => Array.from({ length: sqrt })
        .map(() => []))
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result.length; j++) {
        result[i][j] = arr.slice(i * sqrt, (i + 1) * sqrt).map(item => item.slice(j * sqrt, (j + 1) * sqrt))
      }
    }
    return result.flat(1).map(item => item.flat(1))
  }

  const getRows = (arr) => {
    let result = []
    for (let i = 0; i < arr.length; i++) {
      result[i] = []
      for (let j = 0; j < arr.length; j++) {
        result[i][j] = arr[j][i]
      }
    }
    return result
  }
  return [...getRows(board), ...getSections(board), ...board].every(item => {
    item = item.filter(itm => itm!== '.')
    return item.length === new Set(item).size
  })
};



var removeNthFromEnd = function(head, n) {
  let current = head
  let size =1
  while(current && current.next) {
    current = current.next
    size ++
  }
  let count = size - n-1
  let current2 = head
  while(current2 && current2.next && count) {
    current2 = current2.next
    count --
  }
  current2.next = current2.next.next
  return head
};

removeNthFromEnd = function(head, n) {
  let current = head;
  let size = 0;
  while(current) {
    current = current.next;
    size ++;
  }

  // 处理边界情况
  if (n < 1 || n > size) return null;
  if (n === size) {
    head = head?.next;
    return head;
  };

  let count = 0;
  let current2 = head;
  // 得出倒数第N+1个数
  while(current2 && count < size - n) {
    current2 = current2.next;
    count ++;
  }
  current2.next = current2.next ? current2.next.next : null;
  return head;
};
