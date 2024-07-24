function hashSearch(hashTable, target) {
  let index = hashFunction(target); // 通过哈希函数计算目标元素的索引
  if (hashTable[index] === target) {
    return index; // 返回目标元素的索引
  } else {
    return -1; // 未找到目标元素，返回-1
  }
}
