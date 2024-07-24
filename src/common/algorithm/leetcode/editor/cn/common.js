const quickSort = (arr) => {
  const length = arr.length;
  if (length <= 1) {
    return arr;
  }
  const left = [];
  const right = [];
  const pivotIdx = Math.floor(length / 2);
  const pivot = arr[pivotIdx];
  for (let i = 0; i < length; i++) {
    if (pivotIdx !== i) {
      const current = arr[i];
      if (current < pivot) {
        left.push(current);
      } else {
        right.push(current);
      }
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};
const binarySearch = (arr, target, isFirst) => {
  const { length } = arr;
  let resultIndex = -1;
  if (!Array.isArray(arr) || length === 0 || typeof target !== 'number') {
    return resultIndex;
  }
  let start = 0;
  let end = length - 1;
  while (start <= end) {
    const midIdx = Math.floor((start + end) / 2);
    const mid = arr[midIdx];
    if (mid === target) {
      resultIndex = midIdx;
      if (isFirst) {
        end = midIdx - 1; // 继续在左侧子数组中查找第一个目标值
      } else {
        start = midIdx + 1; // 继续在右侧子数组中查找最后一个目标值
      }
    } else if (mid < target) {
      start = midIdx + 1;
    } else {
      end = midIdx - 1;
    }
  }
  return resultIndex;
};
const promiseAll = (promises) => new Promise((resolve, reject) => {
  let count = 0;
  let result = [];
  promises.forEach((promise, i) => promise()
    .then((value) => {
      result[i] = value;
      count++;
      if (count === promises.length) {
        resolve(result);
      }
    })
    .catch((reason) => reject(reason)));
});
const promiseAllSettled = (promises) => new Promise((resolve, reject) => {
  let count = 0;
  let result = [];
  promises.forEach((promise, i) => promise()
    .then((value) => {
      result[i] = { status: 'fulfilled', value };
    })
    .catch((reason) => {
      result[i] = { status: 'rejected', reason };
    })
    .finally(() => {
      count++;
      if (count === promises.length) {
        resolve(result);
      }
    }));
});
const promiseRace = (promises) => new Promise((resolve, reject) => {
  if (!Array.isArray(promises)) {
    reject(new Error('promises should be an array'));
    return;
  }

  promises.forEach((promise) => {
    if (typeof promise !== 'function') {
      reject(new Error('Each element of promises should be a function'));
      return;
    }
    promise()
      .then(resolve)
      .catch(reject);
  });
});
// 连续触发事件时，按照一定的时间间隔执行事件, 使用定时器实现，每次触发事件都检查是否超过时间间隔
const throttle = (fn, wait = 300) => {
  let inThrottle, lastFn, lastTime;
  return function(...args) {
    const context = this;
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
          inThrottle = false;
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
// 连续触发事件时，只执行最后一次触发的事件, 使用定时器实现，每次触发事件都重置定时器
const debounce = (func, wait = 300, immediate = false) => {
  let timer;
  return function(...args) {
    const context = this;
    const later = () => {
      timer = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};
let currying = (fn, ...prevArgs) => (...currArgs) => currArgs.length ? currying(fn, ...prevArgs, ...currArgs) : fn(...prevArgs);
const pipe = (fns = []) => (args) => fns.reduce((result, fn) => fn(result), args);
const compose = (fns = []) => (arg) => fns.reduceRight((result, fn) => fn(result), arg);
const memoize = fn => {
  const cache = new Map();
  return function(...args) {
    const key = args.join('|');
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
};
const getType = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};
const cloneDeep = (obj, hash = new WeakMap()) => {
  const type = getType(obj);

  // 原始值直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 特殊对象

  if (type === 'regexp') {
    return new RegExp(obj);
  }

  if (type === 'date') {
    return new Date(obj.getTime());
  }

  // 处理数组和对象
  const result = Array.isArray(obj) ? [] : {};
  hash.set(obj, result); // 存储当前对象和拷贝对象的映射关系
  for (const key in Object.keys(obj)) {
    result[key] = cloneDeep(obj[key], hash);
  }
  return result;
};
const getThousand = (number) => {
  let symbol = number >= 0 ? '' : '-';
  let [integer, decimal] = Math.abs(number).toString().split('.');
  decimal = decimal ? `.${decimal}` : '';
  let result = '';
  let count = 0;
  for (let i = integer.length - 1; i >= 0; i--) {
    result = integer[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result;
    }
  }
  return [symbol, result, decimal].join('');
};
const myInstanceOf = (obj, constructor) => {
  if ((obj === null || typeof obj !== 'object') || typeof constructor !== 'function') {
    return false;
  }
  let proto = Object.getPrototypeOf(obj);
  const protoType = constructor.prototype;
  while (proto !== null) {
    if (proto === protoType) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};
const myNew = (constructor, ...args) => {
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, args);
  return typeof result === 'object' ? result : obj;
};

class MyExampleWebpackPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.emit.tapAsync('MyExampleWebpackPlugin', (compilation, callback) => {
      callback();
    });
  }
}

function MyExampleWebpackLoader(source) {
  const handleContent = (source) => {
    // todo
    return source;
  };
  this.callback(null, handleContent);
}

const MyExampleBabelPlugin = () => ({
  visitor: {
    Identifier(path) {
      const name = path.node.name;
      path.node.name = name
        .split('')
        .reverse()
        .join('');
    },
  },
});
const babelPlugin = () => ({
  visitor: {
    Identifier(path) {
      // path.node
    },
  },
});

class ListNode {
  constructor(key, value, ttl) {
    this.key = key;
    this.value = value;
    this.ttl = ttl; // 过期时间 Time to Live
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.map = new Map(); // 用于快速查找节点
    this.head = new ListNode(); // 哨兵节点
    this.tail = new ListNode(); // 哨兵节点
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.map.has(key)) return null;
    const node = this.map.get(key);
    if (this.isExpired(node)) {
      this.removeNode(node);
      return null;
    }
    this.moveToHead(node);
    return node.value;
  }

  // time to live
  put(key, value, ttl) {
    let node;
    if (this.map.has(key)) {
      node = this.map.get(key);
      node.value = value;
      this.removeNode(node);
    } else {
      node = new ListNode(key, value, ttl);
      this.map.set(key, node);
      this.size++;
    }
    this.addToHead(node);
    if (this.size > this.capacity) {
      this.removeTail();
    }
  }

  isExpired(node) {
    return node.ttl !== -1 && Date.now() > node.ttl;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.map.delete(node.key);
    this.size--;
  }

  addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }

  removeTail() {
    const node = this.tail.prev;
    this.removeNode(node);
  }
}

class LRUCacheMini {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
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

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const { value: oldestKey } = this.cache.keys().next();
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}

class Koa {
  constructor() {
    this.middleware = [];
  }

  use(fn) {
    this.middleware.push(fn);
  }

  async handleRequest(ctx) {
    let index = -1;

    const dispatch = async (i) => {
      if (i <= index) throw new Error('next() called multiple times');
      index = i;
      const fn = this.middleware[i];
      if (!fn) return;
      try {
        return await fn(ctx, dispatch.bind(null, i + 1));
      } catch (err) {
        throw err;
      }
    };

    await dispatch(0);
  }

  async listen() {
    const ctx = { req: 'mockRequest', res: 'mockResponse' };
    try {
      await this.handleRequest(ctx);
      console.log('Response sent.');
    } catch (err) {
      console.error('Error occurred:', err.message);
    }
  }
}

// 测试
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('Start of middleware 1');
  await next();
  console.log('End of middleware 1');
});

app.use(async (ctx, next) => {
  console.log('Start of middleware 2');
  await next();
  console.log('End of middleware 2');
});

app.listen();

Function.prototype.uncurry = function() {
  const fn = this;
  return function(...args) {
    return fn.apply(this, args);
  };
};


// 作用域链主要用于确定变量和函数的访问范围，
// 而原型链主要用于实现对象之间的继承关系。
// 两者的作用对象略有不同，但都是 JavaScript 中重要的机制。


// async function fn(args){
//   // ...
// }
//
// // 等同于
//
// function fn(args){
//   return spawn(function*() {
//     // ...
//   });
// }


function spawn(genF) {
  return new Promise(function(resolve, reject) {
    function step(gen, nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(val) { step(gen, function() { return gen.next(val); }); }, function(err) { step(gen, function() { return gen.throw(err); }); });
    }

    const gen = genF();
    step(genF(), function() { return gen.next(undefined); });
  });
}

const arr2Tree = (arr, options = {
  parentId: 'parentId', id: 'id', rootId: '0',
}) => {
  const { parentId, id, rootId } = options;
  // 用于存储每个节点的子节点
  const nodeMap = arr.reduce((prev, curr) => ({
    ...prev, [curr[id]]: { ...curr, children: [] },
  }), {});
  // 第二次遍历，构建树形结构
  return arr.reduce((prev, current) => {
    const currentId = current[id];
    const currentParentId = current[parentId];
    const currentNode = nodeMap[currentId];

    if (currentParentId !== rootId) {
      const parent = nodeMap[currentParentId];
      if (parent) {
        parent.children.push(currentNode);
      }
    } else {
      prev.push(currentNode); // 否则将其视为根节点，添加到树形数组中
    }

    return prev;
  }, []);
};


const tree2Arr = (treeArray) => {
  return treeArray.reduce((prev, currNode) => {
    const { children = [], ...extra } = currNode || {};
    prev = [...prev, extra];
    if (children && children.length > 0) {
      prev = [...prev, ...tree2Arr(children)];
    }
    return prev;
  }, []);
};


const promiseAll = (promises = []) => new Promise((resolve, reject) => {
  let count = 0;
  let result = [];
  promises.forEach((promise, i) => Promise.resolve(promise()).then(res => {
    count++;
    result[i] = res;
    if (count === promises.length) {
      resolve(result);
    }
  }).catch(reject));
});

const promiseAllSettled = (promises = []) => new Promise((resolve) => {
  let count = 0;
  let result = [];
  promises.forEach((promise, idx) => Promise.resolve(promise())
    .then(value => {
      result[idx] = { status: 'fulfilled', value };
    })
    .catch(reason => {
      result[idx] = { status: 'reject', reason };
    })
    .finally(() => {
      count++;
      if (count === promises.length) {
        resolve(result);
      }
    }));
});

const promiseRace = (promises = []) => new Promise((resolve, reject) => {
  promises.forEach((promise) => Promise
    .resolve(promise())
    .then(resolve)
    .catch(reject));
});

const debounce = (fn, delay = 300) => {
  let timerId;
  return function(...args) {
    const context = this;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => fn.apply(context, args), delay);
  };
};

const throttle = (fn, wait = 300) => {
  let lastTime, lastFn, inThrottle = false;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
          inThrottle = false;
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

const currying = (fn, ...prevArgs) => (...currArgs) => currArgs.length === 0 ? fn(...prevArgs) : currying(fn, ...prevArgs, ...currArgs);

const createObj = (constructor, ...args) => {
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, args);
  return typeof result === 'object' && result !== null ? result : obj;
};

const myInstanceOf = (obj, constructor) => {
  if (typeof obj !== 'object' || obj === null || typeof constructor !== 'function') {
    return false;
  }
  let proto = Object.getPrototypeOf(obj);
  const prototype = constructor.prototype;
  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};

class LRUCacheMini2 {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
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

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const { value: oldestKey } = this.cache.keys().next();
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}

const memoize = fn => {
  const resultMap = new Map();
  return function(...args) {
    const context = this;
    const key = args.join('|');
    if (resultMap.has(key)) {
      return resultMap.get(key);
    } else {
      const value = fn.apply(context, args);
      resultMap.set(key, value);
      return value;
    }
  };
};


const arr2Tree = (arr, options = {}) => {
  const {
    parentId = 'parentId', id = 'id', rootId = '0',
  } = options;
  const nodeMap = arr.reduce((prev, curr) => ({
    ...prev, [curr.id]: curr,
  }), {});
  return arr.reduce((prev, curr) => {
    const currId = curr[id];
    const currParentId = curr[parentId];
    const currNode = nodeMap[currId];
    if (currParentId !== rootId) {
      const parent = nodeMap[currParentId];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(currNode);
      }
    } else {
      prev.push(curr);
    }
    return prev;
  }, []);
};

const tree2Arr = (arr) => {
  return arr.reduce((prev, curr) => {
    const { children, ...extra } = curr;
    prev = [...prev, extra];
    if (children) {
      prev = [...prev, ...tree2Arr(children)];
    }
    return prev;
  }, []);
};


const debounce = (fn, delay = 300) => {
  let timerId;
  return function(...args) {
    const context = this;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => fn.apply(context, args), delay);
  };
};

const throttle = (fn, wait = 300) => {
  let lastFn, lastTime, inThrottle = false;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
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


const quickSort = (arr) => {
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

// 技术栈： Vue2 全家桶，小程序
// 1.  负责消费分期业务线的日常需求（需求澄清，任务派发，进度把控），code Review, 核心代码书写
// 2.  负责经营前端组的项目架构，基础建设。
// 3.  前端培训及业务文档编写

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
const binarySort = (arr, target) => {
  if (!Array.isArray(arr) || arr.length === 0 || typeof target !== 'number' || Number.isNaN(target)) {
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

class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    } else {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
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
}

const arr2Tree = (arr = [], options) => {
  const { parentId = 'parentId', id = 'id', rootId = '0' } = options || {};
  const nodeMap = arr.reduce((prev, curr) => ({
    ...prev, [curr.id]: curr,
  }), {});
  return arr.reduce((prev, curr) => {
    const currentId = curr[id];
    const currentParentId = curr[parentId];
    const currentNode = nodeMap[currentId];
    if (currentId !== rootId) {
      const parent = nodeMap[currentParentId];
      if (parent) {
        parent.children.push(currentNode);
      }
    } else {
      prev.push(currentNode);
    }
    return prev;
  }, []);
};

const tree2Arr = (arr) => arr.reduce((prev, curr) => {
  const { children, ...extra } = curr;
  prev = [...prev, extra];
  if (children) {
    prev = [...prev, ...tree2Arr(children)];
  }
  return prev;
}, []);

const cloneDeep = (obj) => {
  if (typeof obj !== 'object' || (typeof obj === 'object' && obj === null)) {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const currentKey = keys[i];
    result[currentKey] = cloneDeep(obj[currentKey]);
  }
  return result;
};


const curring = (fn, ...defaultProps) => (...extraProps) => extraProps.length ? fn(...defaultProps) : curring(fn, ...defaultProps, ...extraProps);

const memoize = (fn) => {
  const resultMap = new Map();
  return function(...args) {
    const context = this;
    const currentKey = args.join('|');
    if (resultMap.has(currentKey)) {
      return resultMap.get(currentKey);
    } else {
      const result = fn.apply(context, args);
      resultMap.set(currentKey, result);
      return result;
    }
  };
};

const pipe = (fns = []) => (args) => fns.reduce((prev, fn) => fn(prev), args);
const compose = (fns = []) => (args) => fns.reduceRight((prev, fn) => fn(prev), args);

const debounce = (fn, delay = 300) => {
  let timerId;
  return function(...args) {
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(context, args), delay);
  };
};

const throttle = (fn, wait = 300) => {
  let lastFun, lastTime, inThrottle = false;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFun);
      lastFun = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
          inThrottle = false;
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

const myNew = (constructor, ...args) => {
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, args);
  return typeof result === 'object' && result !== null ? result : obj;
};


const myInstanceOf = (obj, constructor) => {
  if (typeof obj !== 'object' || (typeof obj === 'object' && obj === null) || typeof constructor !== 'function') {
    throw TypeError('xxx');
  }
  const prototype = constructor.prototype;
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    if (prototype === proto) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};


class MyExampleWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyExampleWebpackPlugin', (compilation, callBack) => {
      callBack();
    });
  }
}


function MyExampleWebpackLoader(source) {
  const handleContent = (source) => {
    // todo
    return source;
  };
  this.callback(null, handleContent);
}


const promiseAll = (fns) => new Promise((resolve, reject) => {
  let result = [];
  let count = 0;
  fns.forEach((fn, i) => Promise.resolve(fn()).then((value) => {
    result[i] = value;
    count++;
    if (fns.length === count) {
      resolve(result);
    }
  }, reject));
});

const promiseAllSettled = (fns) => new Promise((resolve) => {
  let result = [];
  let count = 0;
  fns.forEach((fn, i) => Promise.resolve(fn()).then((value) => {
    result[i] = { status: 'fulfilled', value };
  }).catch((reason) => {
    result[i] = { status: 'rejected', reason };
  }).finally(() => {
    count++;
    if (fns.length === count) {
      resolve(result);
    }
  }));
});

const promiseRace = (fns) => new Promise((resolve, reject) => fns.forEach(fn => Promsie.resolve(fn().then(resolve).catch(reject))));


const getThousand = (number) => {
  const symbol = number >= 0 ? '' : '-';
  let [integer, decimal] = Math.abs(number).toString().split('.');
  decimal = decimal ? `.${decimal}` : '';
  let result = '';
  let count = 0;
  for (let i = integer.length - 1; i >= 0; i--) {
    result = integer[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result;
    }
  }
  return [symbol, result, decimal].join('');
};


var largestAltitude = function(gain) {
  // let dp[0] = 0
  // for (let i = 0; i < gain; i++) {
  // }
};

var isSubsequence = function(s, t) {
  const tMap = new Map();
  for (let i = 0; i < t.length; i++) {
    const current = s[i];
    tMap.set(current, (tMap.has(current) ? tMap.get(current) : 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (tMap.has(current)) {
      if (tMap.get(current) > 1) {
        tMap.set(current, tMap.get(current) - 1);
      } else {
        tMap.delete(current);
      }
    } else {
      return false;
    }
  }
  return true;
};

var maxVowels = function(s, k) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const arr = [];
  for (let i = 0; i < s.length; i++) {
    arr[i] = vowels.includes(s[i]) ? 1 : 0;
  }
  return maxSubArrayOfSizeK(arr, k);
};

const maxSubArrayOfSizeK = (arr = [], k) => {
  if (arr.length < k || k <= 0) return 0;
  let currentSum = arr.slice(0, k).reduce((prev, curr) => prev += curr, 0);
  let maxSum = currentSum;
  for (let end = k; end < arr.length; end++) {
    currentSum += arr[end] - arr[end - k];
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
};


var compress = function(chars) {
  let slow = 0;
  let fast = 1;
  let result = '';
  const { length } = chars;
  while (slow < chars.length) {
    if (chars[slow] === chars[fast]) {
      fast++;
    } else {
      result += chars[slow] + (fast - slow === 1 ? '' : (fast - slow));
      slow = fast;
      fast = slow + 1;
    }
  }
  chars.length = 0;
  chars.push(...result.split(''));
  return result.length;
};

var longestSubarray = function(nums) {
  let maxCount = 0;
  const { length } = nums;
  let slow = 0;
  let fast = 1;
  let canReplace = true;
  while (slow < length && fast < length) {
    if (nums[fast] === 0 && canReplace) {
      fast++;
      canReplace = false;
    } else if (nums[fast] === 0 && !canReplace) {
      maxCount = Math.max(maxCount, (fast - slow));
      if (nums[slow] === 0) {
        canReplace = true;
      }
      slow++;
    } else {
      fast++;
    }
  }
  maxCount = Math.max(maxCount, (fast - slow));
  return maxCount;
};


var pivotIndex = function(nums) {
  const { length } = nums;
  let left = 0;
  let right = length - 1;
  let leftSum = 0;
  let rightSum = 0;
  const totalSum = nums.reduce((prev, cur) => prev += cur, 0);
  while (left <= right) {
    if (left === right && leftSum === (totalSum - leftSum)) {
      return left;
    } else if (leftSum < rightSum) {
      leftSum += nums[left];
      left++;
    } else {
      rightSum += nums[right];
      right--;
    }
  }
  return -1;
};

var findDifference = function(nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  return [[...set1.difference(set2)], [...set2.difference(set1)]];
};

var findDifference = function(nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  const nums = [...new Set([...set1, ...set2])];
  const result = [[], []];
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (set1.has(current) && !set2.has(current)) {
      result[0].push(current);
    }
    if (!set1.has(current) && set2.has(current)) {
      result[1].push(current);
    }
  }
  return result;
};


var uniqueOccurrences = function(arr) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    map.set(current, (map.has(current) ? map.get(current) : 0) + 1);
  }
  return [...map.values()].filter(item => item === 1).length === 1;
};


const str2Map = (arr) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    map.set(current, (map.has(current) ? map.get(current) : 0) + 1);
  }
  return map;
};
var closeStrings = function(word1, word2) {
  if (word1.length !== word2.length) {
    return false;
  }
  const map1 = str2Map(word1);
  const map2 = str2Map(word2);
  for (const key of map1) {
    if (map1.get(key) !== map2.get(key)) {
      return false;
    }
  }
  return true;
};


const quickSort = (arr = []) => {
  const { length } = arr;
  if (length <= 1) {
    return arr;
  }
  let left = [];
  let right = [];
  const pivotIdx = Math.floor(length / 2);
  const pivot = arr[pivotIdx];
  for (let i = 0; i < length; i++) {
    if (i !== pivotIdx) {
      const current = arr[i];
      if (current < pivot) {
        left.push(current);
      } else {
        right.push(current);
      }
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};

const binarySearch = (arr = [], target) => {
  if (!Array.isArray(arr) || arr.length === 0 || typeof target !== 'number' || Number.isNaN(target)) {
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

const bubbleSort = (arr) => {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
};

class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
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

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const { value: oldestKey } = this.cache.keys().next();
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}


const tree2Arr = (tree) => tree.reduce((prev, curr) => {
  const { children, ...extra } = curr;
  prev = [...prev, extra];
  if (children) {
    prev = [...prev, ...tree2Arr(children)];
  }
  return prev;
}, []);


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
    if (currentParentId !== rootId) {
      const parent = nodeMap[currentParentId];
      if (parent) {
        parent.children.push(currentNode);
      }
    } else {
      prev.push(currentNode);
    }
    return prev;
  }, []);
};


const cloneDeep = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  for (const [key, value] of obj) {
    result[key] = cloneDeep(value);
  }
  return result;
};


const currying = (fn, ...defaultProps) => (...extraProps) => extraProps.length
  ? currying(fn, ...defaultProps, ...extraProps)
  : fn(...defaultProps, ...extraProps);

var letterCombinations = function(digits) {
  const mapping = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  };
  const digitsArr = digits.split('');
  let result = [];
  while (digitsArr.length) {
    const currentDigit = digitsArr.shift();
    const currentNumbers = mapping[currentDigit];
    if (result.length) {
      let currentResult = [];
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < currentNumbers.length; j++) {
          currentResult = [...currentResult, result[i] + currentNumbers[j]];
        }
      }
      result = [...currentResult];
    } else {
      result = currentNumbers;
    }
  }
  return result;
};

const binarySearch = (arr, target) => {
  if (!Array.isArray(arr) || arr.length === 0 || typeof target !== 'number' || Number.isNaN(target)) {
    return -1;
  }
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


const search = (arr = [], target) => {
  const { length } = arr;
  let start = 0;
  let end = length - 1;
  let result = -1;
  while (start <= end) {
    const midIdx = Math.floor((start + end) / 2);
    const mid = arr[midIdx];
    if (mid === target) {
      result = midIdx;
    } else if (mid < target) {
      start = midIdx + 1;
    } else {
      end = midIdx - 1;
    }
  }
  return result === -1 ? (result + 1) : (length - result + 1);
};


var successfulPairs = function(spells, potions, success) {
  // return spells.reduce(spell => potions.reduce((prev, potion) => prev += spell * potion >=success ? 1: 0, 0))
  potions.sort((a, b) => a - b);
  return spells.map(spell => search(potions, Math.ceil(success / spell)));
};


function getSingleInstance(fn, ...args) {
  let instance;
  return function() {
    const context = this;
    if (!instance) {
      instance = fn.constructor.apply(context, ...args);
    }
    return instance;
  };
}


function find(word, map) {
  for (const [key, arr] of map) {
    if (arr.includes(word.slice(0, key))) {
      word = word.slice(key);
    }
  }
  return word === '';
}

var longestWord = function(words) {
  words.sort((a, b) => a.length - b.length);
  const { length } = words;
  const map = new Map();
  for (let i = 0; i < length; i++) {
    const current = words[i];
    const key = current.length;
    map.set(key, map.has(key) ? [...map.get(key), current] : [current]);
  }
  let count = length - 1;
  while (count >= 0) {
    const word = words[count];
    if (find(word, map)) {
      return word;
    }
    count--;
  }
  return '';
};


class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

// https://leetcode.cn/problems/lru-cache/solutions/260362/bu-yong-yu-yan-nei-jian-de-map-gua-dang-feng-zhuan
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity;
  this.hash = {};
  this.count = 0;
  this.head = new ListNode();
  this.tail = new ListNode();
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  const node = this.hash[key];
  if (node) {
    const value = node.value;

    node.prev.next = node.next;
    node.next.prev = node.prev;

    const headNode = this.head.next;
    node.next = headNode;
    this.head.next = node;
    node.prev = this.head;
    headNode.prev = node;

    return value;
  }

  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if (this.hash[key] === undefined) {
    // 如果是undefined则需要新增
    const node = new ListNode(key, value);
    this.hash[key] = node;
    if (this.count < this.capacity) {
      // 新增一个链表节点
      const headNext = this.head.next;
      node.next = headNext;
      this.head.next.prev = node;
      this.head.next = node;
      node.prev = this.head;
      headNext.prev = node;
      this.count++;
    } else {
      // 容器已经满了，需要删除一个
      const target = this.tail.prev;
      delete this.hash[target.key];

      target.prev.next = this.tail;
      this.tail.prev = target.prev;

      // this.tail.prev = tailPrev.prev
      // tailPrev.next = this.tail

      // 新增一个
      const headNext = this.head.next;
      this.head.next.prev = node;
      this.head.next = node;
      node.next = headNext;
      node.prev = this.head;

    }

  } else {
    this.hash[key].value = value;
    // 指定的节点，移动到头部
    const node = this.hash[key];
    node.next.prev = node.prev;
    node.prev.next = node.next;
    // 移动
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;

  }

};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
