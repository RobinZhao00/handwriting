function sequentialSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // 返回目标元素的索引
    }
  }
  return -1; // 未找到目标元素，返回-1
}
