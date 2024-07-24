/**
 <p>将两个升序链表合并为一个新的 <strong>升序</strong> 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。&nbsp;</p>

 <p>&nbsp;</p>

 <p><strong>示例 1：</strong></p>
 <img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg" style="width: 662px; height: 302px;" />
 <pre>
 <strong>输入：</strong>l1 = [1,2,4], l2 = [1,3,4]
 <strong>输出：</strong>[1,1,2,3,4,4]
 </pre>

 <p><strong>示例 2：</strong></p>

 <pre>
 <strong>输入：</strong>l1 = [], l2 = []
 <strong>输出：</strong>[]
 </pre>

 <p><strong>示例 3：</strong></p>

 <pre>
 <strong>输入：</strong>l1 = [], l2 = [0]
 <strong>输出：</strong>[0]
 </pre>

 <p>&nbsp;</p>

 <p><strong>提示：</strong></p>

 <ul>
 <li>两个链表的节点数目范围是 <code>[0, 50]</code></li>
 <li><code>-100 &lt;= Node.val &lt;= 100</code></li>
 <li><code>l1</code> 和 <code>l2</code> 均按 <strong>非递减顺序</strong> 排列</li>
 </ul>

 <div><div>Related Topics</div><div><li>递归</li><li>链表</li></div></div><br><div><li>👍 3426</li><li>👎 0</li></div>
 */

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

var mergeTwoLists = function(l1, l2) {
  let head = new ListNode(null, null)
  let temp = head

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      temp.next = l1
      temp = l1
      l1 = l1.next
    } else {
      temp.next = l2
      temp = l2
      l2 = l2.next
    }
  }
  if (l1 !== null) {
    temp.next = l1
  }
  if (l2 !== null) {
    temp.next = l2
  }
  return head.next
}

//leetcode submit region end(Prohibit modification and deletion)


function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

// var mergeList = function(list1, list2) {
//   let head = new ListNode(null, null)
//   let temp = head
//   while(list1.val && list2.val) {
//     if (list1.val <= list2.val) {
//       head.next =
//     }
//   }
// }


class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor() {
    this.root = null
  }

  // 添加节点
  add(val) {
    const newNode = new TreeNode(val)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  insertNode(node, newNode) {
    if (newNode.val < node.val) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  // 前序遍历
  preOrderTraversal() {
    this.preOrderHelper(this.root)
  }

  preOrderHelper(node) {
    if (node !== null) {
      console.log(node.val) // 访问根节点
      this.preOrderHelper(node.left) // 递归遍历左子树
      this.preOrderHelper(node.right) // 递归遍历右子树
    }
  }

  // 中序遍历
  inOrderTraversal() {
    this.inOrderHelper(this.root)
  }

  inOrderHelper(node) {
    if (node !== null) {
      this.inOrderHelper(node.left) // 递归遍历左子树
      console.log(node.val) // 访问根节点
      this.inOrderHelper(node.right) // 递归遍历右子树
    }
  }

  // 后序遍历
  postOrderTraversal() {
    this.postOrderHelper(this.root)
  }

  postOrderHelper(node) {
    if (node !== null) {
      this.postOrderHelper(node.left) // 递归遍历左子树
      this.postOrderHelper(node.right) // 递归遍历右子树
      console.log(node.val) // 访问根节点
    }
  }

  // 计算树的深度
  depth() {
    return this.depthHelper(this.root)
  }

  depthHelper(node) {
    if (node === null) {
      return 0
    } else {
      const leftDepth = this.depthHelper(node.left)
      const rightDepth = this.depthHelper(node.right)
      return Math.max(leftDepth, rightDepth) + 1
    }
  }
}
