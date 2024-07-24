

/**
 * @param {Function[]} functions
 * @param {number} n
 * @return {Function}
 */
var promisePool = async function (functions, n) {
  // 使用 Set 存储正在执行的任务队列
  let queue = new Set();
  let resolved = [];

  for (const task of functions) {
    // 将正在执行的任务加入到队列中
    const x = task().then((res) => {
      // 任务执行完成后将结果存到 resolved 数组中
      resolved.push(res);
      // 完成后移出正在执行队列
      queue.delete(x);
    })
    queue.add(x);
    // 控制线程池执行最大数
    if (queue.size >= n) {
      await Promise.race(queue);
    }
  }
  // 执行完所有任务后才返回执行结果
  await Promise.allSettled(queue);
  return resolved;
};


var promisePool = async function(functions, n) {
  const next = async () => {
    while (functions.length) await functions.shift()();
  }
  await Promise.all([...Array(n)].map(next));
};

// https://leetcode.cn/problems/promise-pool/description/


const flatObj = (obj, key = '') => {
  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (typeof value === 'object') {
       key = key + flatObj(obj)
    }
    prev[key] = value
    return prev
  }, {})
}

// const getType = (obj, type2Compare) => {
//   const [type] = Object.prototype.toString.call(obj).match(/[A-Z]\w+/)
//   if(type2Compare) {
//     return type.toLowerCase() === type2Compare.toLowerCase()
//   }
//   return type.toLowerCase()
// }
const flattenObject = (obj, delimiter = '.', prefix = '') => Object.entries(obj)
  .reduce((acc, [key, value]) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : ''
    const isNoneNullObj = typeof value === 'object' && value !== null
    return {
      ...acc, ...isNoneNullObj ? flattenObject(value, delimiter, pre + key) : ({ [pre + key]: value }),
    }
  }, {})


function permute(arr) {
  const result = []

  function backtrack(start = 0) {
    if (start === arr.length - 1) {
      result.push(arr.slice())
      return
    }

    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]] // 交换元素
      backtrack(start + 1); // 递归下一层
      [arr[start], arr[i]] = [arr[i], arr[start]] // 恢复原数组状态
    }
  }

  backtrack()
  return result
}


const combine = function(n, k) {
  const result = [];

  const backtrack = (start, current) => {
    if (current.length === k) {
      result.push(arr.slice());
      return;
    }

    for (let i = start; i <= n; i++) {
      current.push(i);
      backtrack(i + 1, current);
      current.pop();
    }
  };

  backtrack(1, []);

  return result;
};


var reduce = function(nums, fn, init) {
  let prev = init
  for (let i = 0; i < nums.length; i++) {
    prev = fn(prev, nums[i], i)
  }
  return prev
};


// nums = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15]
// rowsCount = 5
// colsCount = 4
// 输出：
// [
//   [19,17,16,15],
//   [10,1,14,4],
//   [3,2,12,20],
//   [7,5,18,11],
//   [9,8,6,13]
// ]

Array.prototype.snail = function(rowsCount, colsCount) {
  if (this.length !== rowsCount * colsCount) {
    return []
  }
  const result = Array.from({ length: rowsCount }).map(_ => [])
  for (let i = 0; i < colsCount; i++) {
    for (let j = 0; j < rowsCount; j++) {
      const cols = this.slice(i * rowsCount, (i + 1) * rowsCount)
      if (i % 2) {
        result[j][i] = cols[rowsCount - j - 1]
      } else {
        result[j][i] = cols[j]
      }
    }
  }
  return result
}


var debounce = function(fn, t) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      clearTimeout(timer)
    }, t)
  }
}



const getType = (obj, type2Compare) => {
  const [type] = Object.prototype.toString.call(obj).match(/[A-Z]\w+/)
  if(type2Compare) {
    return type.toLowerCase() === type2Compare.toLowerCase()
  }
  return type.toLowerCase()
}
var areDeeplyEqual = function(o1, o2) {
  const typeO1 = getType(o1)
  const typeO2 = getType(o2)
  if(typeO1 !== typeO2) {
    return false
  }
  if (typeO1 === typeO2 && typeO1 !== 'object') {
    return o1 === o2
  }
  for (const key in o1) {
    if (!areDeeplyEqual(o1[key], o2[key])) {
      return false
    }
  }
}


var compose = function(functions) {

  return function(x) {
    return functions.reverse().reduce((prev, func) => prev = func(prev), x)
  }
}

function memoize(fn) {
  const memoizedMap = []
  return function(...args) {
    // console.log('...args', args, memoizedMap)
    const memoized = memoizedMap.find(memoizedItem => {

      console.log('memoizedItem.args', memoizedItem.args, args)
      return memoizedItem.args.every((memoizedArg, idx) => memoizedArg === args[idx])
    })
    if (memoized) {
      return memoized.val
    }

    const val = fn(...args)
    console.log('val', val)
    memoizedMap.push({
      args, val,
    })

    return val
  }
}


function memoize(fn) {
  const memoizeArgs = new Map()
  const memoizeResult = new Map()
  let id = 0
  return function(...args) {
    let key = ''
    for (let arg of args) {
      if (!memoizeArgs.has(arg)) {
        memoizeArgs.set(arg, id++)
      } else {
        key += memoizeArgs.get(arg) + '-'
      }
    }
    if (memoizeResult.has(key)) {
      return memoizeResult.get(key)
    }
    const res = fn(...args)
    memoizeResult.set(key, res)
    return res
  }
}


const sleep = (duration = 1000) => new Promise(resolve => setTimeout(resolve, duration))
var timeLimit = function(fn, t) {

  return async function(...args) {
    const promiseForFun = Promise.resolve(fn(...args))
    const promiseForExceeded = sleep(t).then(() => ({ message: 'Time Limit Exceeded' }))
    const res = await Promise.race([promiseForFun, promiseForExceeded])
    if(res.message) {
      throw res.message
    } else {
      return res
    }
  }
}


const flattenObject = (obj, delimiter = '.', prefix = '') => Object.entries(obj)
  .reduce((acc, [key, value]) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : ''
    const isNoneNullObj = typeof value === 'object' && value !== null
    return {
      ...acc, ...isNoneNullObj ? flattenObject(value, delimiter, pre + key) : ({ [pre + key]: value }),
    }
  }, {})
var jsonToMatrix = function(arr) {
  const matrix = Array.from({ length: arr.length + 1 }).map(_ => [])
  const { formattedArr, keys } = arr.reduce((prev, cur) => {
    const formattedObj = flattenObject(cur)
    return {
      formattedArr: [...prev.formattedArr, formattedObj],
      keys: [...new Set([...prev.keys, ...Object.keys(formattedObj)])],
    }
  }, { formattedArr: [], keys: [] })
  keys.sort()
  matrix[0] = keys
  for (let i = 0; i < keys.length; i++) {
    for (let j = 1; j < matrix.length; j++) {
      matrix[j][i] = formattedArr[j - 1][keys[i]] !== undefined ? formattedArr[j - 1][keys[i]] : ''
    }
  }
  return matrix
}




const optionalChain = (target) => {
  return new Proxy(target, {
    get(target, property, receiver) {
      if (property in target) {
        return Reflect.get(target, property, receiver);
      }
      return undefined;
    }
  });
};


var chunk = function(arr, size) {
  const count = Math.ceil(arr.length / size)
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(arr.slice(i * size, (i + 1) * size))
  }
  return result
}


Array.prototype.forEach = function(callback, context) {
  const length = this.length
  for (let i = 0; i < length; i++) {
    callback.bind(context)(this[i],i,this)
  }
}


String.prototype.replicate = function(times) {
  let result = ''
  for (let i = 0; i < times; i++) {
    result += this
  }
  return  result
}


var partial = function(fn, args) {

  return function(...restArgs) {
    let formattedArgs = []
    for (let i = 0; i < args.length; i++) {
      formattedArgs.push(args[i] === '_' ? restArgs.shift() : args[i])
    }
    formattedArgs = [...formattedArgs, ...restArgs]
    return fn(...formattedArgs)
  }
};


/**
 * @param {Array} keysArr
 * @param {Array} valuesArr
 * @return {Object}
 */
var createObject = function(keysArr, valuesArr) {
  const map = new Map()
  for (let i = 0; i < keysArr.length; i++) {
    const key = keysArr[i] + ''
    if(!map.has(key)) {
      map.set(key, valuesArr[i])
    }
  }
  return Object.fromEntries(map)
};


/**
 * @param {Array<Function>} functions
 * @return {Promise<Array>}
 */
var promiseAllSettled = function(functions) {
  return new Promise((resolve) => {
    let result = []
    let count = 0
    for (let i = 0; i < functions.length; i++) {
      Promise.resolve(functions[i]()).then((res) => {
        result[i] = { status: 'fulfilled', value: res }
      }).catch((err) => {
        result[i] = { status: 'rejected', reason: err }
      }).finally(() => {
        count++
        if (count === functions.length) {
          resolve(result)
        }
      })
    }
  })
};


var promisify = function(fn) {
  return async function(...args) {
    return new Promise((resolve, reject) => {
      fn((result, error) => {
        if (error) {
          reject(error); // 如果回调中有错误，拒绝 Promise
        } else {
          resolve(result); // 否则，解析 Promise
        }
      }, ...args);
    });
  };
};


const getType = (obj, type2Compare) => {
  const [type] = Object.prototype.toString.call(obj).match(/[A-Z]\w+/)
  if (type2Compare) {
    return type.toLowerCase() === type2Compare.toLowerCase()
  }
  return type.toLowerCase()
}
var undefinedToNull = function(obj) {
  for (const objKey in obj) {
    const value = obj[objKey]
    if (['array', 'object'].includes(getType(value))) {
      obj[objKey] = undefinedToNull(value)
    } else {
      obj[objKey] = value === undefined ? null : value
    }
  }
  return obj
}


/**
 * @param {number} target
 * @return {number}
 */
Array.prototype.upperBound = function(target) {
  const map = new Map()
  for (let i = 0; i < this.length; i++) {
    const current = this[i]
    map.set(current, map.has(current) ? [...map.get(current), i] : [i])
  }
  const targetArr = map.get(target) || []
  return targetArr.length ? targetArr[targetArr.length - 1] : -1
};


Array.prototype.upperBound = function(target) {
  let index = -1
  for (let i = 0; i < this.length; i++) {
    if(this[i] === target) {
      index = i
    }
  }
  return index
};


Date.prototype.nextDay = function() {
  const year = this.getFullYear()
  const month = this.getMonth() + 1
  const day = this.getDate()
  const monthWith31Days = [1, 3, 5, 7, 8, 10, 12]
  const monthWith30Days = [4, 6, 9, 11]
  let nexDay, nextMonth, nextYear
  if (day === 31 && month === 12) {
    nexDay = 1
    nextMonth = 1
    nextYear = year + 1
  } else if (day === 29 && month === 2 && year % 4 === 0) {
    nexDay = 1
    nextMonth = month + 1
    nextYear = year
  } else if (day === 28 && month === 2 && year % 4 !== 0) {
    nexDay = 1
    nextMonth = month + 1
    nextYear = year
  } else if (day === 30 && monthWith30Days.includes(month)) {
    nexDay = 1
    nextMonth = month + 1
    nextYear = year
  } else if (day === 31 && monthWith31Days.includes(month)) {
    nexDay = 1
    nextMonth = month + 1
    nextYear = year
  } else {
    nexDay = day + 1
    nextMonth = month
    nextYear = year
  }

  if (nextMonth < 10) {
    nextMonth = `0${nextMonth}`
  }
  if (nexDay < 10) {
    nexDay = `0${nexDay}`
  }

  return [nextYear, nextMonth, nexDay].join('-')
}


/**
 * @param {string} str
 * @return {null|boolean|number|string|Array|Object}
 */
var jsonParse = function(str) {

};


/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
  const NULL_VALUES = [null, 0, false, undefined, '']

  const compact = (object) => {
    const isArray = Array.isArray(object)
    let result = isArray ? []: {}
    for (const objKey in oobj) {
      let  currentValue = obj[objKey]
      if (!NULL_VALUES.includes(currentValue)) {
        currentValue = typeof currentValue === 'object' ? compact(currentValue): currentValue
        if (isArray) {
          result.push(currentValue)
        } else {
          result[objKey] = currentValue
        }
      }
    }
    return result
  }

  return compact(obj)
}


var promiseAll = function(functions) {
  return new Promise((resolve, reject) => {
    let result = []
    let count = 0
    functions.forEach((func, index) => func().then(res => {
      result[index] = res
    }).catch((err) => reject(err)).finally(() => {
      count++
      if (count === functions.length) {
        resolve(result)
      }
    }))
  })
}


/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function(arr1, arr2) {
  const map = new Map()
  const joinArr = [...arr1, ...arr2]
  for (let i = 0; i < joinArr.length; i++) {
    const current = joinArr[i]
    const { id } = current
    map.set(id, map.has(id) ? { ...map.get(id), ...current } : current)
  }
  return [...map.values()]
};



/**
 * @param {Object|Array} obj1
 * @param {Object|Array} obj2
 * @return {Object|Array}
 */

const getType = (obj, type2Compare) => {
  const [type] = Object.prototype.toString.call(obj).match(/[A-Z]\w+/)
  if(type2Compare) {
    return type.toLowerCase() === type2Compare.toLowerCase()
  }
  return type.toLowerCase()
}
function objDiff(obj1, obj2) {
  // const isArray = Array.isArray(obj1)
  let result = {}
  for (const objKey in obj1) {
    const currentVal1 = obj1[objKey]
    const currentVal2 = obj2[objKey]
    if (currentVal1 !== undefined && currentVal2 !== undefined && JSON.stringify(currentVal1) !== JSON.stringify(currentVal2)) {
      if (getType(currentVal1) === getType(currentVal2) && typeof currentVal2 === 'object') {
        result[objKey] = objDiff(currentVal1, currentVal2)
      } else {
        result[objKey] = [currentVal1, currentVal2]
      }
    }
  }
  return result
}


// return new Proxy(obj, {
//   get(target, property, receiver) {
//     if (Array.isArray(target) && ['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse'].includes(property)) {
//       return () => throw `Error Calling Method: ${property}`
//     }
//     return Reflect.get(target, property)
//   }, set(target, property, value, receiver) {
//     if (Array.isArray(target)) {
//       throw `Error Modifying Index: ${property}`
//     }
//     throw `Error Modifying: ${property}`
//   },
// })

var makeImmutable = function(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  for (const objKey in obj) {
    obj[objKey] = makeImmutable(obj[objKey])
  }
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (Array.isArray(target) && ['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse'].includes(property)) {
        return () => { throw `Error Calling Method: ${property}`}
      }
      return Reflect.get(target, property)
    }, set(target, property, value, receiver) {
      if (Array.isArray(target)) {
        throw `Error Modifying Index: ${property}`
      }
      throw `Error Modifying: ${property}`
    },
  })
}


var cancellable = function(fn, args, t) {
  let timer = setTimeout(() => fn(...args), t)
  return function() {
    clearTimeout(timer)
    timer = null
  }
}



// const result = Array.isArray(obj1) ? [] : {}
// if (obj2 === undefined) {
//   return obj1
// }
// if (typeof obj1 !== 'object' || obj1 === null) {
//   return obj2
// }
// for (const objKey in obj1) {
//   const currentValue1 = obj1[objKey]
//   const currentValue2 = obj2[objKey]
//   result[objKey] = deepMerge(currentValue1, currentValue2)
// }
// return {
//   ...obj2, ...result,
// }

// 给定两个值 obj1 和 obj2，返回一个 深度合并 的值。
//
// 你应该遵循以下规则进行值的 深度合并：
//
// 如果两个值都是对象，则结果对象应包含两个对象上存在的所有键。

// 如果一个键同时存在于两个对象中，则 深度合并 两个关联的值。否则，将键值对添加到结果对象中。

// 如果两个值都是数组，则结果数组的长度应与较长的数组相同。对于对象的合并逻辑，将索引视为键。

// 否则，结果值为 obj2。
// 你可以假设 obj1 和 obj2 是 JSON.parse() 的输出结果

/**
 * @param {null|boolean|number|string|Array|Object} obj1
 * @param {null|boolean|number|string|Array|Object} obj2
 * @return {null|boolean|number|string|Array|Object}
 */

const getType = (obj, type2Compare) => {
  const [type] = Object.prototype.toString.call(obj).match(/[A-Z]\w+/)
  if (type2Compare) {
    return type.toLowerCase() === type2Compare.toLowerCase()
  }
  return type.toLowerCase()
}
var deepMerge = function (obj1, obj2) {
  const type1 = getType(obj1)
  const type2 = getType(obj2)
  if (type1 !== type2) {
    if (obj2 === undefined) {
      return obj1
    }
    return obj2
  }
  if (type1 === type2 && !['array', 'object'].includes(type1)) {
    return obj2
  }

  // let result = type1 === 'array' ? [] : {}
  // const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]
  // for (const key of keys) {
  //   result[key] = deepMerge(obj1[key], obj2[key])
  // }
  // return result

  for (const key in obj2) {
    obj1[key] = deepMerge(obj1[key], obj2[key])
  }
  return obj1
}


const notObject = (obj) => typeof obj !== 'object' || obj === null

/**
 * @param {null|boolean|number|string|Array|Object} obj1
 * @param {null|boolean|number|string|Array|Object} obj2
 * @return {null|boolean|number|string|Array|Object}
 */
var deepMerge = function(obj1, obj2) {
  if (notObject(obj1) || notObject(obj2)) {
    return obj2
  }

  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return obj2
  }

  for (const key in obj2) {
    obj1[key] = deepMerge(obj1[key], obj2[key])
  }

  return obj1
};


const set = new Set();

function customInterval(fn, delay, period) {
  const id = set.size;
  set.add(id);
  run(fn, id, delay, period);
  return id;
}

function customClearInterval(id) {
  set.delete(id);
}

function run(fn, id, delay, period, count = 0) {
  setTimeout(() => {
    if (!set.has(id)) return;
    fn();
    run(fn, id, delay, period, count + 1);
  }, delay + period * count);
}


const sleep = (duration = 1000) => new Promise(resolve => setTimeout(resolve, duration))


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  nums.sort((a, b) => a - b);
};



function createGetProxy(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      if (prop === 'length' && Array.isArray(target)) {
        return target.length;
      } else if (prop in target) {
        return target[prop];
      } else if (typeof prop === 'string' && /^\d+$/.test(prop)) {
        return createGetProxy(() => undefined);
      } else {
        return createGetProxy(target[prop]);
      }
    },
  });
}

function getX(obj, path) {
  const pathArr = path.split('.');
  const getProxy = createGetProxy(obj);
  return pathArr.reduce((proxy, prop) => proxy[prop], getProxy);
}


function findCenterIndex(nums) {
  const totalSum = nums.reduce((prev, cur) => prev + cur, 0);
  let leftSum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (leftSum === totalSum - leftSum - nums[i]) {
      return i;
    }
    leftSum += nums[i];
  }
  return -1;
}


const str2Map = (arr) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    map.set(current, (map.has(current) ? map.get(current) : 0) + 1);
  }
  return map
}
var closeStrings = function(word1, word2) {
  if (word1.length !== word2.length) {
    return false;
  }
  const map1 = str2Map(word1);
  const map2 = str2Map(word2);
  const kvs1 = [...map1].sort((a, b) => a[1] - b[1]);
  const kvs2 = [...map2].sort((a, b) => a[1] - b[1]);
  for (let i = 0; i < kvs1.length; i++) {
    const [key1, value1] = kvs1[i];
    const [key2, value2] = kvs2[i];
    if (value1 !== value2) {
      return false;
    }
    if (key1 !== key2) {
      if (map1.get(key2) !== map2.get(key1)) {
        return false;
      }
    }
  }

  return true;
};


function equalPairs(grid) {
  const length = grid.length;
  let count = 0;

  // 将原始矩阵进行转置
  const transpositionGrid = Array.from({ length: n }, () => []);
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      transpositionGrid[i][j] = grid[j][i];
    }
  }

  // 将矩阵和转置矩阵分别转为字符串数组
  const transpositionGridMap = transpositionGrid.reduce((prev, curr) => {
    const key = curr.join(',');
    prev.set(key, (prev.has(key) ? prev.get(key) : 0) + 1);
    return prev;
  }, new Map);

  for (let i = 0; i < length; i++) {
    const key = grid[i].join(',');
    if(transpositionGridMap.has(key)) {
      count += transpositionGridMap.get(key)
    }
  }
  return count
}


var removeStars = function(s) {
  let result = [];
  for (let i = 0; i < s.length; i++) {
    const current = s[i]
    if (current !== '*') {
      result.push(current)
    } else {
      result.pop()
    }
  }
  return result.join('')
};


var asteroidCollision = function(asteroids) {
  let result = [];

  for (let i = 0; i < asteroids.length; i++) {
    const current = asteroids[i];
    let collision = false;

    while (result.length > 0 && current < 0 && result[result.length - 1] > 0) {
      const top = result[result.length - 1];
      if (top + current === 0) {
        result.pop();
        collision = true;
        break;
      } else if (top + current < 0) {
        result.pop();
      } else {
        collision = true;
        break;
      }
    }

    if (!collision) {
      result.push(current);
    }
  }
}
  const decodeString = (s) => {
    let numStack = [];        // 存倍数的栈
    let strStack = [];        // 存 待拼接的str 的栈
    let num = 0;              // 倍数的“搬运工”
    let result = '';          // 字符串的“搬运工”
    for (const char of s) {   // 逐字符扫描
      if (!isNaN(char)) {   // 遇到数字
        num = num * 10 + Number(char); // 算出倍数
      } else if (char == '[') {  // 遇到 [
        strStack.push(result); // result串入栈
        result = '';           // 入栈后清零
        numStack.push(num);    // 倍数num进入栈等待
        num = 0;               // 入栈后清零
      } else if (char === ']') {  // 遇到 ]，两个栈的栈顶出栈
        let repeatTimes = numStack.pop(); // 获取拷贝次数
        result = strStack.pop() + result.repeat(repeatTimes); // 构建子串
      } else {
        result += char;        // 遇到字母，追加给result串
      }
    }
    return result;
  };



var RecentCounter = function () {
  this.queue = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.queue.push(t);
  while (this.queue[0] < t - 3000) {
    this.queue.shift();
  }
  return this.queue.length;
};


/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function(senate) {
  // 代表当前还在参与投票的议员
  let winQueue = senate.split('');
  // 记录已经投票的议员
  let stack = [];

  while (winQueue[0]) {
    // 从参议院队列的开头取出一个议员的投票结果
    let data = winQueue.shift();
    // 如果栈为空，或者栈顶议员的投票结果与当前议员相同，则将当前议员入栈
    if (stack.length === 0 || stack[stack.length-1] === data) {
      stack.push(data);
    } else {
      // 如果栈顶议员的投票结果与当前议员不同，则废除栈顶议员的票，继续留在参议院队列中等待下一轮投票
      winQueue.push(stack.pop());
    }
  }

  return stack.pop() === 'R'  ? 'Radiant' : 'Dire';
};

const dfs = (node, result = []) => {
  if(!(node.left && node.right)) {
    result.push(node.val)
  } else {
    if (node.left) {
      dfs(node.left, result);
    }
    if (node.right) {
      dfs(node.right, result);
    }
  }
  return result
}

var leafSimilar = function(root1, root2) {

};


var deleteNode = function(root, key) {
  const findMin = (node) => {
    while (node.left) {
      node = node.left;
    }
    return node;
  };

  const dfs = (node, target) => {
    if (!node) {
      return node;
    }
    if (target < node.val) {
      node.left = dfs(node.left, target);
    } else if (target > node.val) {
      node.right = dfs(node.right, target);
    } else {
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      } else {
        const minNode = findMin(node.right);
        node.val = minNode.val;
        node.right = dfs(node.right, minNode.val);
      }
    }
    return node;
  };

  return dfs(root, key);
};


var lowestCommonAncestor = function(root, p, q) {
  const dfs = (node, target, chain = []) => {
    if (target === node.value) {
      return chain;
    } else if (target < node.value) {
      dfs(node.left, target, [...chain, node.value]);
    } else {
      dfs(node.left, target, [...chain, node.value]);
    }
  };
  console.log('dfs', dfs(root, p))
};

var lowestCommonAncestor = function (root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) {
    return root;
  }
  return left ?? right;
};


var dailyTemperatures = function (temperatures) {
  const result = new Array(temperatures.length).fill(0); // 初始化结果数组
  for (let i = 0; i < temperatures.length; i++) {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temperatures[i]) {
        result[i] = j - i;
        break; // 找到第一个更高温度后跳出内层循环
      }
    }
  }
  return result;
};

var dailyTemperatures = function (temperatures) {
  const { length } = temperatures;
  const result = new Array(length).fill(0);
  const stack = [];
  for (let i = 0; i < length; i++) {
    const t = temperatures[i];
    while (stack.length && t > temperatures[stack[stack.length - 1]]) {
      const j = stack.pop();
      result[j] = i - j;
    }
    stack.push(i);
  }
  return result;
};


var StockSpanner = function () {
  this.prices = []
  this.stack = []
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  this.prices.push(price)
  this.prices.stack(price)
  let count = 1
  while (this.stack.length && price > this.prices[this.stack[this.stack.length - 1]]) {
    this.stack.pop();
    count ++
  }
  return count
};

var suggestedProducts = function(products, searchWord) {
  // 1. Sort the products array lexicographically
  products.sort();

  // Function to find products with a given prefix
  const findProductsWithPrefix = (prefix) => {
    const results = [];
    for (const product of products) {
      if (product.startsWith(prefix)) {
        results.push(product);
        if (results.length === 3) break; // Only take the first three matches
      }
    }
    return results;
  };

  const result = [];
  let prefix = '';

  // 2. For each character in searchWord, update the prefix and find matching products
  for (const char of searchWord) {
    prefix += char;
    result.push(findProductsWithPrefix(prefix));
  }

  return result;
};

const suggestedProducts = (products, searchWord) => {
  products.sort();
  const { res } = searchWord.split('').reduce((prev, curr) => {
    let { str, res } = prev;
    str += curr
    res.push(products.filter(product => product.startsWith(str)).slice(0,3));
    return {
      str, res
    };
  }, { str: '', res: [] });
  return res
};

var countBits = function(n) {
  let result = []
  for (let i = 0; i <= n; i++) {
    result.push(i.toString(2).split('').filter(item => item === '1').length)
  }
  return result
};

var singleNumber = function(nums) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i]
    map.set(current, (map.has(current) ? map.get(current) : 0) + 1);
  }
  for (const [key, value] of map) {
    if(value === 1) {
      return key
    }
  }
};

const long

