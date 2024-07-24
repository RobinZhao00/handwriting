class LinkedListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  append(value) {
    const appendNode = new LinkedListNode(value)
    if (!this.head) {
      this.head = appendNode
    } else {
      let currentNode = this.head
      let index = 0
      while (currentNode.next) {
        currentNode = currentNode.next
      }
      currentNode.next = appendNode
    }

    this.length++
  }

  insert(position, value) {
    if (position > -1 && position < this.length) {
      const appendNode = new LinkedListNode(value)
      let current = this.head
      let previous = null
      let index = 0
      if (position === 0) {
        appendNode.next = current
        this.head = appendNode
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        appendNode.next = current
        previous.next = appendNode
      }
      this.length++
      return true
    } else {
      return false
    }
  }

  // 删除指定值的节点
  remove(value) {
    let currentNode = this.head
    let prevNode = null
    while (currentNode) {
      if (currentNode.value === value) {
        if (!prevNode) {
          this.head = currentNode.next
        } else {
          prevNode.next = currentNode.next
        }
        return true
      }
      prevNode = currentNode
      currentNode = currentNode.next
    }
    return false
  }

  indexOf(value) {
    let currentNode = this.head
    let idx = -1
    while (currentNode) {
      if (currentNode.value === value) {
        return idx
      }
      currentNode = currentNode.next
      idx++
    }
    return -1
  }

  removeAt(position) {
    if (position > -1 && position < this.length) {
      let current = this.head
      let previous = null
      let index = 0
      if (position === 0) {
        this.head = current.next
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
      }
      this.length-- // {10}
      return current.element
    }
    return null
  }

  update(oldValue, newValue) {}

  isEmpty() {
    return this.length === 0
  }

  size() {
    return this.length
  }

  toString() {}

  getHead() {
    return this.head
  }
}

const removeNthFromEnd = function(head, n) {
  let current = head
  let size = 0
  while (current) {
    current = current.next
    size++
  }

  // 处理边界情况
  if (n < 1 || n > size) return null
  if (n === size) {
    head = head?.next
    return head
  }


  let count = size - n - 1
  let current2 = head
  while (current2 && current2.next && count) {
    current2 = current2.next
    count--
  }
  current2.next = current2.next ? current2.next.next : null
  return head
}



