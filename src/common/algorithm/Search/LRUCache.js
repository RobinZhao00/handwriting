class ListNode {
  constructor(key, value, ttl) {
    this.key = key;
    this.value = value;
    this.ttl = ttl; // 过期时间
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.map = new Map(); // 用于快速查找节点
    this.head = new ListNode(); // 哨兵节点
    this.tail = new ListNode(); // 哨兵节点
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.map.has(key)) return null;
    const node = this.map.get(key);
    if (this.isExpired(node)) {
      this.removeNode(node);
      return null;
    }
    this.moveToHead(node);
    return node.value;
  }

  // time to live
  put(key, value, ttl) {
    let node;
    if (this.map.has(key)) {
      node = this.map.get(key);
      node.value = value;
      this.removeNode(node);
    } else {
      node = new ListNode(key, value, ttl);
      this.map.set(key, node);
      this.size++;
    }
    this.addToHead(node);
    if (this.size > this.capacity) {
      this.removeTail();
    }
  }

  isExpired(node) {
    return node.ttl !== -1 && Date.now() > node.ttl;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.map.delete(node.key);
    this.size--;
  }

  addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }

  removeTail() {
    const node = this.tail.prev;
    this.removeNode(node);
  }
}

const cache = new LRUCache(3); // 创建容量为3的LRU缓存

// 插入数据
cache.put('key1', 'value1', Date.now() + 1000); // 设置过期时间为当前时间后1秒
cache.put('key2', 'value2', Date.now() + 2000); // 设置过期时间为当前时间后2秒
cache.put('key3', 'value3', Date.now() + 3000); // 设置过期时间为当前时间后3秒
cache.put('key4', 'value4', Date.now() + 1000); // 设置过期时间为当前时间后1秒（缓存已满，应该移除最近最少使用的数据）

// 获取数据
console.log(cache.get('key1')); // 此时数据未过期，返回"value1"，并将"key1"移到链表头部
console.log(cache.get('key3')); // 此时数据未过期，返回"value3"，并将"key3"移到链表头部
console.log(cache.get('key2')); // 此时数据未过期，返回"value2"，并将"key2"移到链表头部
console.log(cache.get('key4')); // 此时数据已过期，返回null，并将"key4"移除

// 休眠2秒
setTimeout(() => {
  console.log(cache.get('key1')); // 此时数据已过期，返回null，并将"key1"移除
  console.log(cache.get('key2')); // 此时数据已过期，返回null，并将"key2"移除
  console.log(cache.get('key3')); // 此时数据已过期，返回null，并将"key3"移除
}, 2000);

