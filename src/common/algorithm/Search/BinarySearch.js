const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const midIdx = Math.floor((start + end) / 2);
    const mid = arr[midIdx];
    if (mid === target) {
      return midIdx;
    } else if (mid < target) {
      start = midIdx + 1;
    } else {
      end = midIdx - 1;
    }
  }
  return -1;
};


console.log(binarySearch([100, -1, 0, 1, 2, 1, 2], 3));
// console.log(binarySearch([100, -1, 0, 1, 2, 1, 2], 1));
// console.log(binarySearch([100, -1, 0, 1, 2, 1, 2], 2));

const binarySearchAll = (arr = [], target) => {
  const { length } = arr;
  if (length === 0 || typeof target !== 'number') {
    return -1;
  }
  let result = [];
  let start = 0;
  let end = length - 1;
  while (start <= end) {
    const midIdx = Math.floor((start + end) / 2);
    const mid = arr[midIdx];
    if (mid === target) {
      let left = midIdx;
      let right = midIdx + 1;
      while (left >= 0 && arr[left] === target) {
        result.push(left);
        left--;
      }
      while (right < length && arr[right] === target) {
        result.push(right);
        right++;
      }
      return result.sort()
    } else if (mid < target) {
      start = midIdx + 1;
    } else {
      end = midIdx - 1;
    }
  }
  return -1;
};

console.log(binarySearchAll([100, -1, 0, 1, 2, 1, 2, 1, 2], 2));
console.log(binarySearchAll([ 1,1,1,1,2,2], 1));

