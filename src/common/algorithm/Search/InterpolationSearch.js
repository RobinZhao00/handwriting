// 插值搜索
function interpolationSearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right && target >= arr[left] && target <= arr[right]) {
    let pos = left + Math.floor(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]));
    if (arr[pos] === target) {
      return pos; // 返回目标元素的索引
    } else if (arr[pos] < target) {
      left = pos + 1;
    } else {
      right = pos - 1;
    }
  }
  return -1; // 未找到目标元素，返回-1
}
