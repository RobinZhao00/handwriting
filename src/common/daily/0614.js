// * [ ] quickSort
const quickSort = (arr) => {
  const { length } = arr;
  if (length <= 1) {
    return arr;
  }
  const left = [];
  const right = [];
  const pivotIdx = Math.floor(length / 2);
  const pivot = arr[pivotIdx];
  for (let i = 0; i < length; i++) {
    if (i !== pivotIdx) {
      const current = arr[i];
      if (current <= pivot) {
        left.push(current);
      } else {
        right.push(current);
      }
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};

// * [ ] bubbleSort
const bubbleSort = (arr) => {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};
// * [ ] binarySearch
const binarySearch = (arr, target) => {
  const { length } = arr;
  let left = 0;
  let right = length - 1;
  while (left <= right) {
    const midIdx = Math.floor((left + right) / 2);
    const mid = arr[midIdx];
    if (mid === target) {
      return midIdx;
    } else if (mid < right) {
      left = midIdx + 1;
    } else {
      right = midIdx - 1;
    }
  }
  return -1;
};

// * [ ] LRU
class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const { value: oldestKey } = this.cache.keys().next();
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value
  }
}
// * [ ] arr2Tree
const arr2Tree = (arr, options) => {
  const { rooId = '0', id = 'id', parentId = 'parentId' } = options || {};
  const nodeMap = arr.reduce((prev, curr) => {
    prev.set(curr[id], { ...curr, children: [] });
  }, new Map());
  return arr.reduce((prev, curr) => {
    const currentId = curr[id];
    const currentParentId = curr[parentId];
    const currentNode = nodeMap[currentId];
    if(currentParentId === rooId) {
      prev.push(currentNode)
    } else {
      const parent = nodeMap[currentParentId];
      if (parent) {
        parent.children.push(currentNode);
      }
    }
    return prev
  }, []);
};
// * [ ] tree2Arr
const tree2Arr = (arr) => arr.reduce((prev, curr) => {
  const { children, ...extra } = curr;
  prev.push(extra);
  if (children) {
    prev.push(...tree2Arr(children));
  }
  return prev;
}, []);
// * [ ] cloneDeep


const getType = (obj) => Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
const cloneDeep = (obj) => {
  if (!(typeof obj === 'object' && obj !== null)) {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  for (const key in Object.keys(obj)) {
    result[key] = cloneDeep(obj[key]);
  }
  return result;
};

// * [ ] currying
const currying = (fn, ...prevProps) => (...curProps) => curProps.length ? currying(fn, ...prevProps, ...curProps) : fn(...prevProps);
// * [ ] memoize
// * [ ] pipe
// * [ ] compose
// * [ ] debounce
// * [ ] throttle
// * [ ] myNew
// * [ ] myInstanceOf
// * [ ] MyExampleWebpackPlugin
// * [ ] MyExampleWebpackLoader
// * [ ] MyExampleBabelPlugin
// * [ ] promiseAll
// * [ ] promiseAllSettled
// * [ ] promiseRace
// * [ ] getThousand
