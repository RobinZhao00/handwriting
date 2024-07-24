// * [ ] quickSort
const quickSort = (arr = []) => {
  const { length } = arr;
  if (length <= 1) {
    return arr;
  }
  const left = [];
  const right = [];
  const midIdx = Math.floor(length / 2);
  const mid = arr[midIdx];
  for (let i = 0; i < length; i++) {
    if (i !== midIdx) {
      const current = arr[i];
      if (current <= mid) {
        left.push(current);
      } else {
        right.push(current);
      }
    }
  }
  return [...quickSort(left), mid, ...quickSort(right)];
};
console.log('quickSort', quickSort([90, 5, 4, 2, 3, 0, 100, -1, 2]));
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
console.log('bubbleSort', bubbleSort([90, 5, 4, 2, 3, 0, 100, -1, 2]));
// * [ ] binarySearch
const binarySearch = (arr, target) => {
  const { length } = arr;
  let left = 0;
  let right = length - 1;
  while (left <= right) {
    const midIdx = Math.floor((left + right) / 2);
    const mid = arr[midIdx];
    if (target === mid) {
      return midIdx;
    } else if (target > mid) {
      left = midIdx + 1;
    } else {
      right = midIdx - 1;
    }
  }
  return -1;
};

console.log('binarySearch', binarySearch([90, 5, 4, 2, 3, 0, 100, -1, 2], 100));

// * [ ] LRU
class LRU {
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const { value: oldestKey } = this.cache.keys.next();
      this.cache.delete(oldestKey);
    }
    this.capacity.set(key, value);
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.capacity.set(key, value);
    }
    return -1;
  }
}

// * [ ] arr2Tree
const arr2Tree = (arr = [], options = {}) => {
  const {
    parentId = 'parentId', id = 'id', rootId = '0',
  } = options;
  const nodeMap = arr.reduce((prev, curr) => ({
    ...prev, [curr[id]]: { ...curr, children: [] },
  }), {});
  return arr.reduce((prev, curr) => {
    const currentId = curr[id];
    const currentParentId = curr[parentId];
    const currentNode = nodeMap[currentId];
    if (currentParentId === rootId) {
      prev.push(currentNode);
    } else {
      nodeMap[currentParentId]?.children?.push(currentNode);
    }
    return prev;
  }, []);
};

console.log('arr2Tree', JSON.stringify(arr2Tree([{
  id: '19', parentId: '0',
}, {
  id: '18', parentId: '16',
}, {
  id: '17', parentId: '16',
}, {
  id: '16', parentId: '0',
}])));

// * [ ] tree2Arr
const tree2Arr = (tree) => tree.reduce((prev, curr) => {
  const { children, ...extra } = curr;
  prev.push(extra);
  if (children) {
    prev.push(...tree2Arr(children));
  }
  return prev;
}, []);
console.log('tree2Arr', tree2Arr(arr2Tree([{
  id: '19', parentId: '0',
}, {
  id: '18', parentId: '16',
}, {
  id: '17', parentId: '16',
}, {
  id: '16', parentId: '0',
}])));
// * [ ] cloneDeep
const cloneDeep = (obj) => {
  if (!(typeof obj === 'object' && obj !== null)) {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  for (const objKey in obj) {
    result[objKey] = cloneDeep(obj[objKey]);
  }
  return result;
};
// * [ ] currying
const currying = (fn, ...defaultProps) => (...extraProps) => extraProps.length ? currying(fn, ...defaultProps, ...extraProps) : fn(...defaultProps);
// * [ ] memoize
const memoize = (fn) => {
  const cache = new Map();
  return function(...args) {
    const key = args.join(':');
    const value = cache.has(key) ? cache.get(key) : fn(...args);
    cache.set(key, value);
    return value;
  };
};
// * [ ] pipe
const pipe = (fns) => (...args) => fns.reduce((prev, curFn) => curFn(...prev), ...args);
// * [ ] compose
const compose = (fns) => (...args) => fns.reduceRight((prev, curFn) => curFn(...prev), ...args);
// * [ ] debounce
const debounce = (fn, delay = 300) => {
  let timer;
  return function(...args) {
    const self = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn.apply(self, args), delay);
  };
};
// * [ ] throttle
const throttle = (fn, wait = 300) => {
  let inThrottle = false;
  let lastTime;
  let timer;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;
      lastTime = Date.now();
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
          inThrottle = false;
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
// * [ ] myNew
const myNew = (constructor, ...args) => {
  const obj = {};
  obj.__proto__ = constructor.proto;
  const result = constructor.apply(obj, args);
  return typeof result === 'object' && result !== null ? result : obj;
};
// * [ ] myInstanceOf
const myInstanceOf = (obj, constructor) => {
  let proto = Object.getPrototypeOf(obj)
  const prototype = constructor.prototype
  while (proto !== null) {
    if(prototype === proto) {
      return true
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false
}
// * [ ] MyExampleWebpackPlugin
// * [ ] MyExampleWebpackLoader
// * [ ] MyExampleBabelPlugin
// * [ ] promiseAll
const promiseAll = (fns) =>  new Promise((resolve, reject) => {
  let count = 0;
  let result = [];
  fns.forEach((fn, idx) => Promise.resolve(fn()).then((result) => {
    result[idx] = result;
    count++;
    if (count === fns.length) {
      resolve(result)
    }
  }).catch(reject))
});
// * [ ] promiseAllSettled
const promiseAllSettled = (fns) => new Promise((resolve) => {
  let count = 0;
  let result = [];
  fns.forEach((fn, idx) => Promise.resolve(fn()).then((result) => {
    result[idx] = { status: 'fulfilled', result };
  }).catch((error) => {
    result[idx] = { status: 'rejected', error };
  }).finally(() => {
    count++;
    if (count === fns.length) {
      resolve(result)
    }
  }));
});
// * [ ] promiseRace
const promiseRace = (fns = []) => new Promise((resolve, reject) => fns.forEach((fn) => Promise.resolve(fn())
  .then(resolve)
  .catch(reject)),
);
// * [ ] getThousand
const getThousand = (number) => {
  const symbol = number >= 0 ? '' : '-';
  let [integer, decimal] = Math.abs(number).toString().split('.');
  decimal = decimal ? `.${decimal}` : '';
  let result = ''
  let count = 0
  for (let i = integer.length - 1; i >= 0; i--) {
    result = integer[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result;
    }
  }
  return [symbol, result, decimal].join('');
};

console.log(getThousand(-123456))