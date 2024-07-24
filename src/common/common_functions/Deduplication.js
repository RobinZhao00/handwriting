// 1. 使用set
const deduplication = arr => [...new Set(arr)];
const testArr = [1, 1, 2, 3, 4, 5];
deduplication(testArr);// [1,2,3,4,5]
const testArr2 = [1, 1, 2, 3, 4, 5].map(item => ({ id: item })); // [{"id":1},{"id":1},{"id":2},{"id":3},{"id":4},{"id":5}]

const deduplication02 = (array, key = '') => {
  const actions = {
    object: (arr, k) => arr.reduce((prev, curr) => prev.filter(item => item[k] === curr[k]).length ? prev : [...prev, curr], []),
    plain: arr => [...new Set(arr)]
  };
  return key ? actions.object(array, key) : actions.plain(array);
};

deduplication02(testArr2, 'id'); // [{"id":1},{"id":2},{"id":3},{"id":4},{"id":5}]
