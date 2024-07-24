// for 版
Array.prototype.myReduce = function (fn, initialValue) {
  const arr = this;
  const [begin, ...remain] = arr;
  const hasInitialValue = initialValue !== 'undefined';
  let prev = hasInitialValue ? begin : initialValue;
  const array = hasInitialValue ? remain : arr;
  for (let i = 0; i < array.length; i++) {
    prev = fn(prev, array[i], arr.indexOf(array[i]), arr);
  }
  return prev;
}
const sum1 = [1, 2, 3, 4].myReduce((prev, curr) => prev += curr);
const sum2 = [1, 2, 3, 4].myReduce((prev, curr) => prev += curr, 0);
console.log('**test**', sum1, sum2);

// foreach 版
Array.prototype.myReduce = function (fn, initialValue) {
  const arr = this;
  let prev = initialValue;
  arr.forEach((item, idx) => {
    prev = typeof prev === 'undefined' && idx === 0
      ? arr[idx]
      : fn(prev, arr[idx], idx, arr);
  });
  return prev;
}
const sum3 = [1, 2, 3, 4].myReduce((prev, curr) => prev += curr);
const sum4 = [1, 2, 3, 4].myReduce((prev, curr) => prev += curr, 0);
console.log('**test**', sum3, sum4);

// 递归 版
Array.prototype.myReduce = function (fn, initialValue) {
  const arr = this;
  const run = (array, prev, idx = 0) => {
    if (!array.length) return prev;
    const [current, ...remain] = array;
    idx = arr.indexOf(current);
    return typeof prev === 'undefined' && idx === 0
      ? run(remain, current, idx)
      : run(remain, fn(prev, current, idx, arr), idx)
  };
  return run(arr, initialValue);
}
const sum5 = [1, 2, 3, 4].myReduce((prev, curr) => prev += curr);
const sum6 = [1, 2, 3, 4].myReduce((prev, curr) => prev += curr, 0);
console.log('**test**', sum5, sum6);
