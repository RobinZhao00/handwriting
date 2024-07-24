var subarraySum = function(nums, k) {
  nums.sort((a, b) => b - a)
  const map = new Map()
  let result = 0
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i]
    if (current <= k) {
      map.set(current, (map.get(current) || 0) + 1)
    }
  }

}


let nums = [1, 1, 1], k = 2

subarraySum(nums, k)


const twoSum = (nums, target) => {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (map.has(complement)) {
      return [map.get(complement), i]
    }
    map.set(nums[i], i)
  }
  return [] // 如果找不到结果，返回空数组
}


var findDuplicate = function(nums) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i]
    if (map.has(current)) {
      return current
    } else {
      map.set(current, 1)
    }
  }
}


const merge = (intervals = []) => {
  intervals.sort((a, b) => a[0] - b[0])
  let results = [intervals[0]]
  for (let i = 1; i < intervals.length; i++) {
    if (results[results.length - 1][1] < intervals[i][0]) {
      results.push(intervals[i])
    } else {
      results[results.length - 1][1] = Math.max(results[results.length - 1][1], intervals[i][1])
    }
  }
  return results
}

console.log('merge', merge([[1, 3], [2, 6], [8, 10], [15, 18]]))
console.log('merge', merge([[1, 4], [4, 5]]))

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

const setColors = (nums = []) => {
  let left = 0
  let right = nums.length - 1
  let count = 0
  while (count <= right) {
    const current = nums[count]
    if (current === 0) {
      swap(nums, left, count)
      left++
      count++
    } else if (current === 2) {
      swap(nums, right, count)
      right--
    } else {
      count++
    }
  }
  return nums
}


var majorityElement = function(nums) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1)
  }
  let maxKey = ''
  let maxValue = 0
  for (let [key, value] of map) {
    maxValue = maxValue > value ? maxValue : value
    maxKey = maxValue > value ? maxKey : key
  }
  return maxKey
}

console.log('majorityElement', majorityElement([3, 2, 3]))
console.log('majorityElement', majorityElement([2, 2, 1, 1, 1, 2, 2]))

var invertObject = function(obj) {
  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (prev[value]) {
      if (Array.isArray(prev[value])) {
        prev[value] = [...prev[value], key]
      } else {
        prev[value] = [prev[value], key]
      }
    } else {
      prev[value] = key
    }
    return prev
  }, {})
}


var deepFilter = function(obj, fn) {
  return Array.isArray(obj) ? obj.reduce((prev, value) => {
    if (typeof value !== 'object') {
      return fn(value) ? [...prev, value] : prev
    }
    return [...prev, ...deepFilter(value, fn)]
  }, []) : Object.entries(obj).reduce((prev, [key, value]) => {
    if (typeof value !== 'object') {
      return fn(value) ? { ...prev, [key]: value } : prev
    }
    return {
      ...prev, ...deepFilter(value, fn),
    }
  }, {})
}


Array.prototype.groupBy = function(fn) {
  const length = this.length
  const result = {}
  for (let i = 0; i < length; i++) {
    const current = this[i] || {}
    const key = fn(current)
    result[key] = result[key] ? [...result[key], current] : [current]
  }
  return result
}


var curry = function(fn) {
  return function curried(...args) {
    // 参数够了就返回结果
    if (args.length >= fn.length) {
      return fn(...args)
    }
    // 参数不够返回,接收剩余参数的函数 (...args, ...nextArgs) 是关键
    return (...nextArgs) => curried(...args, ...nextArgs)
  }
}


var promisePool = async function(functions, n) {
  return new Promise((resolve) => {
    let inProgressCount = 0
    let functionIndex = 0

    function helper() {
      if (functionIndex >= functions.length) {
        if (inProgressCount === 0) resolve()
        return
      }

      while (inProgressCount < n && functionIndex < functions.length) {
        inProgressCount++
        const promise = functions[functionIndex]()
        functionIndex++
        promise.then(() => {
          inProgressCount--
          helper()
        })
      }
    }

    helper()
  })
}

// functions = [
//   () => new Promise(res => setTimeout(res, 300)),
//   () => new Promise(res => setTimeout(res, 400)),
//   () => new Promise(res => setTimeout(res, 200))
// ]
// n = 2


const myInstanceOf = (obj, Constructor) => {
  if (obj === null || typeof obj !== 'object' || typeof Constructor !== 'function') {
    return false;
  }
  let prototype = Constructor.prototype;
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};


//  快排
const quickSort = (arr = []) => {
  const { length } = arr;
  if (length <= 1) {
    return arr;
  }
  const pivotIdx = Math.floor(length / 2);
  const pivot = arr[pivotIdx];
  const left = [];
  const right = [];
  for (let i = 0; i < length; i++) {
    if (pivotIdx !== i) {
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


const binarySearch = (arr, target) => {
  const { length } = arr;
  if (length === 0) {
    return -1;
  }
  arr.sort();
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
  return -1
};


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
      return result
    } else if (mid < target) {
      start = midIdx + 1;
    } else {
      end = midIdx - 1;
    }
  }
  return -1;
};


const cloneDeep = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  for (const objKey in obj) {
    result[objKey] = cloneDeep(obj[objKey]);
  }
  return result;
};

const debounce = (func, delay) => {
  let timer;
  return function(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
};


const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};


((root, factory) => {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(factory);
  } else if (typeof exports === "object") {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === "function" && define.cmd) {
    // CMD
    define(function (require, exports, module) {
      module.exports = factory();
    });
  } else {
    // 都不是
    root.umdModule = factory();
  }
})(this, () => {
  console.log("我是UMD"); // "我是UMD"
  // todo...
});


const flat = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 }
]

const arrToTree = (arr) => {
  const walk = (lst, res) => {
    if (!lst.length) {
      return res;
    }
    return res.reduce((prev, curr) => [
      ...prev,
      {
        ...curr,
        children: walk(
          lst.filter(item => item.pid !== curr.id),
          lst.filter(item => item.pid === curr.id),
        ),
      },
    ], []);
  };
  return walk(arr, [{ id: 0 }]);
};


var findTheDifference = function(s, t) {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    map.set(current, (map.has(current) ? map.get(current) : 0) + 1);
  }
  for (let j = 0; j < t.length; j++) {
    const current = t[j];
    if (!map.has(current) || map.get(current) === 0) {
      return current;
    } else {
      map.set(current, map.get(current) - 1);
    }
  }
};


var mergeAlternately = function(word1, word2) {
  const length1 = word1.length;
  const length2 = word2.length;
  const length = Math.min(length1 , length2);
  let result = '';
  let count = 0;
  while (count < length) {
    result += word1[count] + word2[count];
    count++;
  }
  if (length1 > length) {
    result += word1.substring(count - 1);
  }

  if (length2 > length) {
    result += word2.substring(count - 1);
  }
  return result;
};


var repeatedSubstringPattern = function(s) {
  const map = new Map();
  const length = s.length;
  for (let i = 0; i < length; i++) {
    const current = s[i];
    map.set(current, (map.has(current) ? map.get(current) : 0) + 1);
  }
  const values = [...new Set([...map.values()])].sort((a, b) => a - b);
  if (values[0] === 1) {
    return;
  }
  for (let j = 0; j < values.length; j++) {
    const subStr = s.substring(0, values[j]);
    const count = length / values[j];
    if (subStr.repeat(count) === s) {
      return true;
    }
  }
  return false;
};



const divideBy2 = (number) => {
  if(number === 0) {
    return '0'
  }
  const resArr = [];
  while (number > 0) {
    const res = number % 2;
    resArr.push(res);
    number = Math.floor(number / 2);
  }
  return resArr.reverse().join('')
};


const binarySearch = (arr, target) => {
  if (!Array.isArray(arr) || arr.length === 0 || typeof target !== 'number' || isNaN(target)) {
    return -1;
  }
  const length = arr.length;
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


var maximumProduct = function(nums) {
  const length = nums.length;
  nums.sort((a, b) => a - b);
  return Math.max(nums[0] * nums[1] * nums[n-1], nums[n-1] * nums[n-2] * nums(n-3))
};



User
const permutations = arr => {
  if (arr.length <= 2) {
    return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  }
  return arr.reduce((acc, curr, i) => [
    ...acc,
    ...permutations([...arr.slice(0, i), ...arr.slice(i + 1)])
      .map(val => [
        curr,
        ...val,
      ]),
  ], []);
};


const maximumProfit = function(present, future, budget) {
  const dp = Array(budget + 1).fill(0);

  for (let i = 0; i < present.length; i++) {
    for (let j = budget; j >= present[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - present[i]] + future[i] - present[i]);
    }
  }
  return dp[budget];
};

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    } else {
      return -1;
    }
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
