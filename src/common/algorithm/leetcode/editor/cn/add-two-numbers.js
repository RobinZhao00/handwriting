// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
//
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
//
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

const addTwoNumbers =  (l1, l2) => {
  const result = new ListNode(0);
  const add = (num1 = {}, num2 = {}, progress = 0, res) => {
    const sum = (num1.val || 0) + (num2.val || 0) + progress;
    const isProgress = sum > 9;
    const presentProgress = isProgress ? 1 : 0;
    const val = isProgress ? (sum - 10) : sum;
    if (!num1.next && !num2.next) {
      res.val = val > 9 ? 0 : val;
      res.next = isProgress ? { val: 1, next: null } : null;
      return res;
    }
    return { ...res, val, next:  add(num1.next || {}, num2.next || {}, presentProgress,  new ListNode(val))}
  };
  return add(l1, l2, 0, result);
};

const testL1 = {
  val: 9,
  next: {
    val: 9,
    next: {
      val: 9, next: null
    }
  }
};

const testL2 = {
  val: 9,
  next: {
    val: 9,
    next: {
      val: 9,
      next: {
        val: 9, next: null
      }
    }
  }
};

addTwoNumbers(testL1, testL2);
