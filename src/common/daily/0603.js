const binarySearch = (arr, target) => {
  if (!Array.isArray(arr) || arr.length === 0 || typeof target === 'number' || Number.isNaN(target)) {
    return -1;
  }
  const { length } = arr;
  let start = 0;
  let end = length - 1;
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
const bubbleSort = (arr) => {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i; j++) {
      if (arr[j] > arr[j + 1]) {
       [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
};

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if(this.cache.size >= this.capacity) {
      const { value: oldestKey } = this.cache.keys().next()
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
    return value;
  }
}

const pipe = (fns = []) => (...args) => fns.reduce((prev, curr) => curr(prev), ...args);
const combine = (fns = []) => (...args) => fns.reduceRight((prev, curr) => curr(prev), ...args);
const debounce = (fn, delay = 300) => {
  let timer;
  return function(...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => fn.apply(context, args), delay);
  };
};
const throttle = (fn, wait = 300) => {
  let lastFunc, lastTime, inThrottle = false;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
          inThrottle = false;
        }
      }, Math.max((wait - (Date.now() - lastTime)), 0));
    }
  };
};
const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const myInstanceOf = (obj, constructor) => {
  if (!((typeof obj === 'object' && obj !== null) && typeof constructor === 'function')) {
    throw Error('error input')
  }
  let proto = Object.getPrototypeOf(obj)
  let prototype = constructor.prototype
  while (proto !== null) {
    if(proto === prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
};
const myNew = (constructor, ...args) => {
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, args);
  return typeof result === 'object' && result !== null ? result : obj;
};
const getThousand = (number) => {
  const symbol = number > 0 ? '' : '-';
  let [integer, decimal] = Math.abs(number).toString().split('.');
  decimal = decimal ? `.${decimal}`: ''
  let result = ''
  let count = 0
  for (let i = integer.length - 1; i >= 0; i--) {
    result = integer[i] + result
    count ++
    if (count % 3 === 0 && i !== 0) {
      result = `,` + result
    }
  }
  return [symbol,result,decimal].join('')
};
