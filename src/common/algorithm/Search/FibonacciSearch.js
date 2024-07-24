function fibonacciSearch(arr, target) {
  let fibM2 = 0; // (m-2)'th Fibonacci number
  let fibM1 = 1; // (m-1)'th Fibonacci number
  let fibM = fibM2 + fibM1; // m'th Fibonacci number
  while (fibM < arr.length) {
    fibM2 = fibM1;
    fibM1 = fibM;
    fibM = fibM2 + fibM1;
  }
  let offset = -1;
  while (fibM > 1) {
    let i = Math.min(offset + fibM2, arr.length - 1);
    if (arr[i] < target) {
      fibM = fibM1;
      fibM1 = fibM2;
      fibM2 = fibM - fibM1;
      offset = i;
    } else if (arr[i] > target) {
      fibM = fibM2;
      fibM1 = fibM1 - fibM2;
      fibM2 = fibM - fibM1;
    } else {
      return i; // 返回目标元素的索引
    }
  }
  if (fibM1 && arr[offset + 1] === target) {
    return offset + 1; // 返回目标元素的索引
  }
  return -1; // 未找到目标元素，返回-1
}




