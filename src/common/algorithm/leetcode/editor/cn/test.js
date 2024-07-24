/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  return root === null ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}


var isValidBST = function(root) {
  function _isValidBST(_root, min, max) {
    if (!_root) {
      return true
    }
    if (_root.val <= min || _root.val >= max) {
      return false
    }
    return _isValidBST(_root.left, min, _root.val) && _isValidBST(_root.right, _root.val, max)
  }

  return _isValidBST(root, -Infinity, Infinity)
}


class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor() {
    this.root = null
  }

  insert(value) {
    const newNode = new TreeNode(value)
    if (!this.root) {
      this.root = newNode
      return
    }
    let currentNode = this.root
    while (true) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode
          return
        }
        currentNode = currentNode.left
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode
          return
        }
        currentNode = currentNode.right
      }
    }
  }

  search(value) {
    let currentNode = this.root
    while (currentNode) {
      if (value === currentNode.value) {
        return currentNode
      } else if (value < currentNode.value) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }
    return null
  }

  remove(value) {
    // TODO: 实现删除节点的方法
  }

  traversePreOrder() {
    this._traversePreOrderHelper(this.root, (node) => console.log(node.value))
  }

  traverseInOrder() {
    this._traverseInOrderHelper(this.root, (node) => console.log(node.value))
  }

  traversePostOrder() {
    this._traversePostOrderHelper(this.root, (node) => console.log(node.value))
  }

  _traversePreOrderHelper(node, callback) {
    if (node) {
      callback(node)
      this._traversePreOrderHelper(node.left, callback)
      this._traversePreOrderHelper(node.right, callback)
    }
  }

  _traverseInOrderHelper(node, callback) {
    if (node) {
      this._traverseInOrderHelper(node.left, callback)
      callback(node)
      this._traverseInOrderHelper(node.right, callback)
    }
  }

  _traversePostOrderHelper(node, callback) {
    if (node) {
      this._traversePostOrderHelper(node.left, callback)
      this._traversePostOrderHelper(node.right, callback)
      callback(node)
    }
  }
}


var isValidBST = function(root) {
  var traverse = function(node, orderType = '', cb) {
    if (node) {
      orderType === 'prev' && cb(node)
      traverse(node.left, orderType, cb)
      orderType === 'in' && cb(node)
      traverse(node.right, orderType, cb)
      orderType === 'post' && cb(node)
    }
  }
  var arr = []
  traverse(root, 'in', function(node) {
    arr.push(node.val)
  })
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] <= arr[i]) {
      return false
    }
  }
  return true
}


var maxDepth = function(root) {
  var traverse = function(node, orderType = '', cb) {
    if (node) {
      orderType === 'prev' && cb(node)
      traverse(node.left, orderType, cb)
      orderType === 'in' && cb(node)
      traverse(node.right, orderType, cb)
      orderType === 'post' && cb(node)
    }
  }
  if (!root) {
    return 0
  }
  let leftDepth = 0
  let rightDepth = 0
  traverse(root.left, 'in', function(node) {
    if (node.left || node.right) {
      console.log('node left', node.val)
      leftDepth++
    }
  })

  traverse(root.right, 'in', function(node) {
    if (node.left || node.right) {
      console.log('node right', node.val)
      rightDepth++
    }
  })
  return Math.max(leftDepth, rightDepth) + 1
}

var isSymmetric = function(root) {
  if (!root) {
    return true
  }
  var _isSymmetric = function(left, right) {
    if (left === null && right === null) {
      return true
    }
    if (left == null || right == null || left.val !== right.val) {
      return false
    }
    return _isSymmetric(left.left, right.right) && _isSymmetric(left.right, right.left)
  }
  return _isSymmetric(root.left, root.right)
}


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const result = []
  const queue = []
  if (root) {
    queue.push(root)
  }
  while (queue.length > 0) {
    const node = queue.shift()
    result.push(node.val)
    if (node.left) {
      queue.push(node.left)
    }
    if (node.right) {
      queue.push(node.right)
    }
  }
  return result
}


var levelOrder = function(root) {
  const result = []
  if (!root) {
    return result
  }

  const queue = [root]
  while (queue.length !== 0) {
    const currentLevelSize = queue.length
    result.push([])
    for (let i = 1; i <= currentLevelSize; ++i) {
      const node = queue.shift()
      result[result.length - 1].push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }
  return result
}


var isPalindrome = function(head) {
  if (!head) {
    return false
  }
  let current = head
  const arr = []
  while (current) {
    arr.push(current.val)
    current = current.next
  }
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    if (arr[i] !== arr[arr.length - 1 - i]) {
      return false
    }
  }
  return true
}


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  if (!head) {
    return false
  }

  let fastNode = head
  let slowNode = fastNode
  while (fastNode && fastNode.next) {
    slowNode = slowNode.next
    fastNode = fastNode.next.next
    if (slowNode === fastNode) {
      return true
    }
  }
  return false
}


// public TreeNode sortedArrayToBST(int[] num) {
//   if (num.length == 0)
//     return null;
//   return sortedArrayToBST(num, 0, num.length - 1);
// }
//
// public TreeNode sortedArrayToBST(int[] num, int start, int end) {
//   if (start > end)
//     return null;
//   int mid = (start + end) >> 1;
//   TreeNode root = new TreeNode(num[mid]);
//   root.left = sortedArrayToBST(num, start, mid - 1);
//   root.right = sortedArrayToBST(num, mid + 1, end);
//   return root;
// }


var sortedArrayToBST = function(nums) {
  var _sortedArrayToBST = function(arr, start, end) {
    if (start > end) return null
    const mid = (start + end) >> 1
    const root = new TreeNode(nums[mid])
    root.left = sortedArrayToBST(arr, start, mid - 1)
    root.right = sortedArrayToBST(arr, mid + 1, end)
    return root
  }
  if (nums.length === 0) {
    return null
  }
  return _sortedArrayToBST(nums, 0, nums.length - 1)
}


var generate = function(numRows) {
  const result = []
  for (let i = 1; i <= numRows; i++) {
    if (i === 1) {
      result.push([1])
    }
    if (i === 2) {
      result.push([1, 1])
    }
    if (i > 2) {
      const last = result.slice(-1)[0]
      const current = []
      for (let j = 0; j < last.length - 1; j++) {
        current.push(last[j] + last[j + 1])
      }
      result.push([1, ...current, 1])
    }
  }
  return result
}


var isValid = function(s) {
  var length = s.length
  if (length % 2 !== 0) {
    return false
  }
  let count = 0
  while (s && count < length / 2) {
    s = s
      .replace('()', '')
      .replace('[]', '')
      .replace('{}', '')
    count++
  }
  return !s
}


var missingNumber = function(nums) {
  return Array
    .from({ lengt: nums.length })
    .map((_, idx) => idx + 1)
    .find(item => !nums.includes(item))
}


var merge = function(nums1, m, nums2, n) {
  const _mergedArr = [...nums1.slice(0, m), ...nums2.slice(0, n)].sort((a, b) => a - b)
  for (let i = 0; i < m + n; i++) {
    nums1[i] = _mergedArr[i]
  }
  return nums1
}


// var solution = function(isBadVersion) {
//
//   return function(n) {
//     let start = 1, end = n
//     while (start < end) {
//       let mid = (start + end) >> 1
//       if (!isBadVersion(mid)) start = mid + 1 else end = mid
//     }
//     return start
//   }
// }


const random = (start, end) => {
  return Math.floor(start + Math.random() * (end - start + 1))
}


function permute(arr) {
  const result = []
  let count = 0

  function backtrack(temp, remaining) {
    if (remaining.length === 0) {
      result.push(temp)
      console.log('temp', temp, result)
      return
    }
    console.log('count', ++count)
    for (let i = 0; i < remaining.length; i++) {
      console.log(`${count}循环${i}`, temp.concat(remaining[i]), remaining.slice(0, i), remaining.slice(i + 1))
      backtrack(temp.concat(remaining[i]), remaining.slice(0, i).concat(remaining.slice(i + 1)))
    }
  }

  backtrack([], arr)
  return result
}


function permute(nums) {
  const res = []
  const path = []
  const used = new Array(nums.length).fill(false)

  function backtrack() {
    if (path.length === nums.length) {
      res.push([...path])
      return
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue
      path.push(nums[i])
      used[i] = true
      backtrack()
      path.pop()
      used[i] = false
    }
  }

  backtrack()
  return res
}


var fizzBuzz = function(n) {
  var result = []
  for (let i = 1; i <= n; i++) {
    if (i / 3 === 0 && i / 5 === 0) {
      result.push('FizzBuzz')
    } else if (i / 3 === 0) {
      result.push('Fizz')
    } else if (i / 5 === 0) {
      result.push('Buzz')
    } else {
      result.push(i)
    }
  }
  return result
}


var isPowerOfThree = function(n) {
  if (n > (2 ** 31 - 1) || n <= 0) {
    return false
  }
  let count = 0
  const span = 3 ** 1
  while (n !== 1) {
    if (n % span !== 0) {
      return false
    }
    n = n / span
    count++
  }
  return true
}


/**
 * @param {number} n
 * @return {number}
 */



var countPrimes = function(n) {
  const isPrime = new Array(n).fill(1)
  let ans = 0
  for (let i = 2; i < n; ++i) {
    if (isPrime[i]) {
      ans += 1
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = 0
      }
    }
  }
  return ans
}

// 优优优优优
var countPrimes02 = function(n) {
  // 奇数筛
  let isComposite = new Int8Array(n)
  let count = n > 2 ? 1 : 0
  for (let i = 3; i < n; i += 2) {
    if (!isComposite[i]) {
      count++
      for (let j = i * i; j < n; j += 2 * i) {
        isComposite[j] = 1
      }
    }
  }
  return count
}


const race = (promises = []) => new Promise((resolve, reject) => promises.forEach(promise => Promise.resolve(promise).then(resolve, reject)))

const allSettled = (promises = []) => new Promise(resolve => {
  let result = []
  let count = 0
  for (let i = 0; i < promises.length; i++) {
    Promise.resolve(promises[i]).then((value) => {
      result[i] = { status: 'fulfilled', value }
    }).catch((reason) => {
      result[i] = { status: 'rejected', reason }
    }).finally(() => {
      count++
      if (count === promises.length) {
        resolve(result)
      }
    })
  }
})

const all = (promises = []) => new Promise((resolve, reject) => {
  let result = []
  let count = 0
  for (let i = 0; i < promises.length; i++) {
    Promise.resolve(promises[i]).then((value) => {
      result[i] = value
      count++
      if (count === promises.length) {
        resolve(result)
      }
    }).catch(reject)
  }
})

const getThousands = (number, mode = 'normal') => {
  number = number.toString()
  if (mode === 'normal') {
    const parseVal = parseFloat(number.toString())
    const [intPart, decimalPart] = parseVal.split('.')
    let count = 0
    let result = ''
    for (let i = intPart.length - 1; i >= 0; i--) {
      count++
      result = intPart[i] + result
      if (count % 3 === 0 && i !== 0) {
        result = ',' + result
      }
    }
    return [result, decimalPart].filter(item => item).join('.')
  }
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


const curry = (fn, ...arg1) => (...arg2) => arg2.length ? curry.call(null, fn, ...arg1, ...arg2) : fn(...arg1)

const add = (...arg) => arg.reduce((prev, curr) => curr += prev, 0)


const curryingAdd = curry(add)
curryingAdd(1)(2)(3)()


const throttle = (fn, delay = 1000) => {
  let timer = null
  let startTime = Date.now()
  return (...args) => {
    const currentTime = Date.now() // 当前时间
    const remaining = delay - (currentTime - startTime)  // 从上一次到现在，还剩下多少多余时间
    clearTimeout(timer)
    if (remaining <= 0) {
      fn.apply(this, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(fn, remaining)
    }
  }
}

const debounce = (func, delay = 1000) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

const getType = (data, typeToCompare) => {
  const [type] = Object.prototype.toString.call(data).match(/[A-Z]\w+/)
  return typeToCompare ? type.toLowerCase() === typeToCompare.toLowerCase() : type.toLowerCase()
}

const cloneDeep = (data) => {
  const type = getType(data)
  if ([undefined, null].includes(data)) {
    return data
  }
  if (typeof data !== 'object') {
    return data
  }
  if (type === 'array') {
    return data.map(item => cloneDeep(item))
  }
  if (type === 'object') {
    return Object.entries(data).reduce((prev, [key, value]) => ({
      ...prev, [key]: cloneDeep(value),
    }), {})
  }
  if (['regexp', 'date'].includes(type)) {
    const { constructor } = Object.getPrototypeOf(data)
    return new constructor(data.valueOf())
  }
  // todo
}


const flat = (arr = [], depth = 1) => {
  if (depth === 0) {
    return arr
  }
  return arr.reduce((prev, curr) => Array.isArray(curr) ? [...prev, ...flat(curr, depth - 1)] : [...prev, curr], [])
}


const intersection = (arr01, arr02) => arr01.filter(item => arr02.includes(item))
const union = (arr01, arr02) => [...new Set([...arr01, ...arr02])]

const quickSort = () => {

}

const getType = (data, typeToCompare) => {
  const [type] = Object.prototype.toString.call(data).match(/[A-Z]\w+/)
  return typeToCompare ? type.toLowerCase() === typeToCompare.toLowerCase() : type.toLowerCase()
}
const filerNull = (data, defaultValue = undefined) => {
  const type = getType(data)
  if ([undefined, null].includes(data)) {
    return defaultValue
  }
  if (type === 'array') {
    return data.map(item => filerNull(item))
  }
  if (type === 'object') {
    return Object.entries(data).reduce((prev, [key, value]) => ({
      ...prev, [key]: filerNull(value),
    }), {})
  }
  return data
}


const searchRange = (nums, target) => {
  const copy = nums.slice()
  const { length } = copy
  if (length === 0 || (nums[0] > target) || (nums[length - 1] < target)) {
    return [-1, -1]
  }
  const obj = {}
  for (let i = 0; i < nums.length; i++) {
    const currentValue = copy[i]
    obj[currentValue] = obj[currentValue] ? [...obj[currentValue], i] : [i]
  }
  return obj[target] ? [obj[target][0], obj[target][obj[target].length - 1]] : [-1, -1]
}


const binarySearch = (nums, target, isStart = false) => {
  let start = 0
  let end = nums.length - 1
  let result = -1

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)

    if (nums[mid] > target || (isStart && nums[mid] === target)) {
      end = mid - 1
    } else {
      start = mid + 1
    }

    if (nums[mid] === target) {
      result = mid
    }
  }

  return result
}


const searchRange = (nums, target)=> {
  const start = binarySearch(nums, target, true);
  const end = binarySearch(nums, target, false);
  return [start, end];
}


class TrafficLight {
  constructor() {
    this.colors = ['red', 'yellow', 'green'];
    this.times = [3000, 1000, 2000]; // 默认红、黄、绿灯时间
    this.currentIndex = 0;
    this.isRunning = false;
  }

  setLightTime(color, time) {
    const index = this.colors.indexOf(color);
    if (index !== -1) {
      this.times[index] = time;
    }
  }

  setLightColor(color) {
    const index = this.colors.indexOf(color);
    if (index !== -1) {
      this.currentIndex = index;
    }
  }

  start() {
    this.isRunning = true;
    this.changeLight();
  }

  pause() {
    this.isRunning = false;
  }

  async changeLight() {
    while (this.isRunning) {
      const color = this.colors[this.currentIndex];
      const time = this.times[this.currentIndex];
      console.log(`${color} light`);

      await new Promise(resolve => setTimeout(resolve, time));

      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
    }
  }
}

// 使用示例
const trafficLight = new TrafficLight();
trafficLight.start();

// 模拟修改红绿灯时间和颜色
setTimeout(() => {
  trafficLight.setLightTime('red', 5000); // 修改红灯时间为5秒
  trafficLight.setLightColor('green'); // 切换到绿灯
}, 10000);

// 模拟暂停
setTimeout(() => {
  trafficLight.pause(); // 暂停红绿灯
}, 20000);

class TrafficLights {
  constructor() {
    this.lights = [
      {
        color: 'red',
        duration: 3000,
        idx: 1
      },
      {
        color: 'yellow',
        duration: 1000,
        idx: 2
      },
      {
        color: 'green',
        duration:  2000,
        idx: 3
      }
    ]
    this.isRunning = false;
  }
  pause() {
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    this.run()
  }


  async run() {
    const { length } = this.lights
    if (!this.isRunning || !length) {
      return
    }
    const { color, duration, idx } = this.lights.find(light => light.selected) || this.lights[0]
    const count = duration / 1000
    const sleep = (duration = 1000) => new Promise(resolve => setTimeout(resolve, duration))
    for (let i = 0; i < count; i++) {
      await sleep()
      console.log(`${color}:${i+1}`)
    }
    const nextIdx = idx +1
    this.lights = this.lights.map(light => ({
      ...light,
      selected: light.idx === (nextIdx > length ? nextIdx % length : nextIdx),
    }))
    await this.run()
  }

  setLight({ color, duration }) {
    const isColorExist = this.lights.find(light => light.color === color)
    this.lights = isColorExist ? this.lights.map(light => ({
      ...light, duration: light.color === color ? duration : light.duration,
    })) : [...this.lights, { color, duration }]
    return this
  }
}

const trafficLights = new TrafficLights()
trafficLights.start()




var climbStairs = function(n) {
  let prev1 = 1, prev2 = 1, sum
  for (let i = 2; i < n; i++) {
    sum = prev1 + prev2
    prev1 = prev2
    prev2 = sum
  }
  return sum
}


var searchInsert = function(nums, target) {
  let result = -1
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const midValue = nums[mid]
    if (target === midValue) {
      return mid
    }
    if (midValue < target) {
      left = mid + 1
    }
    if (midValue > target) {
      right = mid - 1
    }
  }
  return right + 1
}

var findMissingRanges = function(nums, lower, upper) {
  const res = []
  nums.push(upper + 1)
  nums.unshift(lower - 1)
  for (const num of nums) {
    if (num === lower + 2) {
      res.push([lower + 1, lower + 1])
    } else if (num > lower + 2) {
      res.push([lower + 1, num - 1])
    }
    lower = num
  }
  return res
}


function combinations(nums) {
  // 开头加一个空组合，即不选择任何数字的情况
  const result = [[]]
  // 1. 遍历这些数字
  for (let n of nums) {
    // 获取当前结果一共有多少，作为子循环的次数
    const length = result.length
    // 2. 子循环
    for (let i = 0; i < length; i++) {
      // 3. 重要点：把上一个结果和下一个数字组合成一个新的结果
      result.push([...result[i], n])
    }
  }
  return result
}


var shortestDistance = function(wordsDict, word1, word2) {
  const length = wordsDict.length
  let ans = length
  let index1 = -1, index2 = -1
  for (let i = 0; i < length; i++) {
    const word = wordsDict[i]
    if (word === word1) {
      index1 = i
    } else if (word === word2) {
      index2 = i
    }
    if (index1 >= 0 && index2 >= 0) {
      ans = Math.min(ans, Math.abs(index1 - index2))
    }
  }
  return ans
}


var canAttendMeetings = function(intervals) {
  intervals.sort((a, b) => a[0] - b[0])
  let result = true
  for (let i = 0; i < intervals.length - 1; i++) {
    result = result && intervals[i][1] <= intervals[i + 1][0]
  }
  return result
}


/**
 * @param {number} size
 */
var MovingAverage = function(size) {
  this.size = size
  this.vals = []
};

/**
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function(val) {
  this.vals.push(val)
  let sum= 0
  let currentWindow = this.vals.slice(-this.size)
  for (let i = 0; i < this.size; i++) {
    sum += currentWindow[i]
  }
  return sum / this.size
};


var validWordSquare = function(words) {
  let doubleWords = words.map(word => word.split(''))
  let maxLength = Math.max(...words.map(item => item.length))
  let length = words.length
  let result = true
  if(maxLength!==length) {
    return false
  }
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      result = result && doubleWords[i][j] === doubleWords[j][i]
    }
  }
  return result
};



/**
 * @param {string} compressedString
 */
var StringIterator = function(compressedString) {
  let result = []
  const strs = compressedString.match(/[a-z]/gi)
  const nums = compressedString.match(/\d+/gi)
  for (let i = 0; i < strs.length / 2; i++) {
    result.push(...Array.from({ length: nums[i]}, () => strs[i]))
  }
  this.result = result
  this.maxCount = result.length -1
  this.count = 0
};

/**
 * @return {character}
 */
StringIterator.prototype.next = function() {
  const count = this.count
  this.count++
  return count < this.maxCount ? this.result[count]: null
};

/**
 * @return {boolean}
 */
StringIterator.prototype.hasNext = function() {
  return this.count <= this.result.length -1
};

/**
 * Your StringIterator object will be instantiated and called as such:
 * var obj = new StringIterator(compressedString)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */



var maxSubArray = function(nums) {
  let pre = 0, maxAns = nums[0];
  nums.forEach((x) => {
    pre = Math.max(pre + x, x);
    maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
};


function permuteString(str) {
  const result = [];

  function backtrack(tempList, remainingChars) {
    if (remainingChars.length === 0) {
      result.push(tempList.join(''));
    } else {
      for (let i = 0; i < remainingChars.length; i++) {
        const char = remainingChars[i];
        tempList.push(char);
        const newChars = remainingChars.slice(0, i) + remainingChars.slice(i + 1);
        backtrack(tempList, newChars);
        tempList.pop();
      }
    }
  }

  backtrack([], str);
  return result;
}

var groupAnagrams = function(strs) {
  let result= []
  const copy = strs.slice()
  while (copy.length) {
    const current = strs[0]
    const possibles = permuteString(current)
    for (let i = 0; i < strs.length; i++) {
      if(possibles.includes(strs[i])) {

      }
    }
    // result.push(strs.filter(str => possibles.includes(str)))
    // strs = strs.filter(str => !possibles.includes(str))
  }
  return result
};

const str2StrCount = (str) => {
  const map = new Map()
  for (let i = 0; i < str.length; i++) {
    map.set(str[i], (map.get(str[i]) || 0) + 1)
  }
  return [...map].sort().reduce((prev,[key,value]) => prev+=`${key}${value}`,'')
}

var groupAnagrams = function(strs) {
  const result = new Map()
  for (let i = 0; i < strs.length; i++) {
    const key = str2StrCount(strs[i])
    const value = result.get(key) ? [...result.get(key), strs[i]] : [strs[i]]
    result.set(key, value)
  }
  return [...result.values()]
}


var longestConsecutive = function(nums = []) {
  if (nums.length === 0) {
    return 0
  }
  let maxLength = 1
  let count = 1
  nums = [...new Set(nums)].sort((a, b) => a - b)
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] - nums[i] === 1) {
      count++
    } else {
      count = 1
    }
    maxLength = Math.max(maxLength, count)
  }
  return maxLength
}

var longestConsecutive = function(nums = []) {
  const set = new Set(nums)
  let maxLength = 0
  let count = 1
  for (let num of set) {
    console.log('num', num)
    if (set.has(num + 1)) {
      count++
    } else {
      count = 1
    }
    maxLength = Math.max(maxLength, count)
  }
  return maxLength
}


// var longestConsecutive = function(nums = []) {
//   const set = new Set(nums);
//   let maxLength = 0;
//
//   for (let num of set) {
//     if (!set.has(num - 1)) { // 检查当前数字是否为连续序列的起点
//       let currentNum = num;
//       let currentLength = 1;
//
//       while (set.has(currentNum + 1)) { // 统计连续序列的长度
//         currentNum++;
//         currentLength++;
//       }
//
//       maxLength = Math.max(maxLength, currentLength); // 更新最大长度
//     }
//   }
//
//   return maxLength;
// };


var longestConsecutive = function(nums = []) {
  const set = new Set(nums)
  let maxLength = 0
  for (const num of set) {
    if (!set.has(num - 1)) {
      let currentNum = num
      let currentLength = 1
      while (set.has(currentNum + 1)) {
        currentNum++
        currentLength++
      }
      maxLength =Math.max(maxLength, currentLength)
    }
  }
  return maxLength
}


var moveZeroes = function(nums) {
  const { length } = nums
  let count = length
  while(count) {
    for (let i = 0; i < length-1; i++) {
      if (nums[i] === 0) {
        [nums[i], nums[i+1]] = [nums[i+1], nums[i]] // 左右交换
      }
    }
    count --
  }
};



var moveZeroes = function (nums) {
  let a = 0
  nums.forEach((n, idx) => {
    // 非0时，交换 a 和 idx的值
    if (n) {
      // 处于同一位置时，无需自己和自己换，跳过
      if (idx === a) {
        a++
      } else {
        // 已知被交换的一定时0，直接赋值即可，并让a前进一格
        nums[a++] = n
        nums[idx] = 0
      }
    }
  })
};


var moveZeroes = function(nums) {
  let idx = 0
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i]
    if(current) {
      if (i === idx) {
        idx ++
      } else {
        nums[idx++] = current
        nums[i] = 0
      }
    }
  }
}


var moveZeroes02 = function(nums) {
  let left = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      // 需要和左边的交换顺序,
      nums[left] = nums[i]
      if (left !== i) {
        nums[i] = 0
      }
      left++
    }
  }
}



/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let prevIndex
  let maxArea = 0
  for (let i = 1; i < height.length; i++) {
    prevIndex = i - 1
    while (prevIndex >= 0) {
      maxArea = Math.max(maxArea, Math.min(height[i], height[prevIndex]) * (i-prevIndex))
      prevIndex--
    }
  }
  return maxArea
};



var maxArea = function(height) {
  let leftIdx = 0
  let rightIdx = height.length -1
  let area = 0
  while (leftIdx < rightIdx) {
    area = Math.max(area, (rightIdx - leftIdx) * Math.min(height[rightIdx], height[leftIdx]));
    if (height[leftIdx] < height[rightIdx]) {
      leftIdx++;
    } else {
      rightIdx--;
    }
  }
  return area
};


var maxArea = function(height) {
  let max = 0;
  let i = 0;
  let j = height.length - 1;

  while (i < j) {
    let area = Math.min(height[i], height[j]) * (j - i);
    max = area > max ? area : max;

    height[i] <= height[j] ? i++ : j--;
  }

  return max;
};


var threeSum = function(nums) {
  nums.sort((a, b) => a - b)
  const map1 = new Map()
  const map2 = new Map()
  const map3 = new Map()
  const result = []
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i]
    if (current > 0) {
      map1.set(current, (map1.get(current) || 0) + 1)
    }
    if (current < 0) {
      map2.set(current, (map2.get(current) || 0) + 1)
    }
    if (current === 0) {
      map3.set(current, (map3.get(current) || 0) + 1)
    }
  }
  // 三个 0
  if (map3.get(0) >= 3) {
    result.push([0, 0, 0])
  }
  for (let [key1] of map1) {
    if (map2.get(-key1) && map3.get(0) > 0) {
      result.push([-key1, 0, key1])
    }
    for (let [key2, value] of map2) {
      if ((key2 === (0 - key1 - key2) && value >= 2) || (key2 !== (0 - key1 - key2) && map2.has(0 - key1 - key2))) {
        result.push([key1, key2, 0 - key1 - key2])
      }
    }
  }

  for (let [key2] of map2) {
    for (let [key1, value] of map1) {
      if((key1 === (0 - key1 - key2) && value >= 2) ||(key1 !== (0 - key1 - key2) && map1.has(0 - key1 - key2))) {
        result.push([key2, key1, 0 - key1 - key2])
      }
    }
  }


  return result
}


// var threeSum = function(nums) {
//   nums.sort((a, b) => a - b)
//   let result = []
//   let map = new Map()
//   for (let i = 0; i < nums.length; i++) {
//     const current = nums[i]
//     map.set(current, (map.get(current) || 0) + 1)
//   }
//   for (let [key, value] of map) {
//     if (map.has(-key) && map.has(0)) {
//       result.push([key, 0, -key])
//     }
//     if (key === 0 && value >= 3) {
//       result.push([0, 0, 0])
//     }
//     if (map.get(-key / 2) >= 2) {
//       result.push([key, -key / 2, -key / 2])
//     }
//   }
// }


//   let map = new Map()
//   for (let i = 0; i < nums.length; i++) {
//     const current = nums[i]
//     map.set(current, (map.get(current) || 0) + 1)
//   }


const str2StrCount = (str) => {
  const map = new Map()
  for (let i = 0; i < str.length; i++) {
    map.set(str[i], (map.get(str[i]) || 0) + 1)
  }
  return [...map].sort().reduce((prev,[key,value]) => prev+=`${key}${value}`,'')
}


var findAnagrams = function(s, p) {
  const sLength = s.length
  const pLength = p.length
  let result = []
  if (pLength > sLength) {
    return result
  }
  for (let i = 0; i < sLength - pLength + 1; i++) {
    const current = s.slice(i, i + pLength)
    if(str2StrCount(p) === str2StrCount(current)) {
      result.push(i)
    }
  }
  return result
}




var maxDistance = function (arrays) {
  const { maxArr, minArr } = arrays.reduce((prev, curr) => ({
    maxArr: [...prev.maxArr, curr[curr.length - 1]],
    minArr: [...prev.minArr, curr[0]]
  }), { maxArr: [], minArr: [] })
  const max = Math.max(...maxArr)
  const min = Math.min(...minArr)
  return max - min
};


var maxDistance = function(arrays = []) {
  let res = 0
  let min = arrays[0][0]
  let max = arrays[0][arrays[0].length - 1]
  for (let i = 1; i < arrays.length; i++) {
    const now = arrays[i]
    const first = now[0]
    const last = now[now.length - 1]

    res = Math.max(res, Math.max(last - min, max - first))
    min = Math.min(min, first)
    max = Math.max(max, last)
  }
  return res
}


const groupBy = (arr = [], fn) => arr.reduce((prev, cur) => {
  const key = fn(cur)
  prev[key] = prev[key] ? [...prev[key], cur] : [cur]
  return prev
}, {})



const str2Map = (str,length) => {
  const map = new Map();
  for (let i = 0; i < length; i++) {
    map.set(str[i], (map.get(str[i]) || 0) + 1);
  }
  return map;
}

// 检查两个哈希表是否相等
const isSameMap = (map1, map2) => {
  if (map1.size !== map2.size) {
    return false
  }
  for (let [key, value] of map1) {
    if (map2.get(key) !== value) {
      return false
    }
  }
  return true
}

var findAnagrams = function(s, p) {
  const sLength = s.length;
  const pLength = p.length;
  const result = [];

  if (pLength > sLength) {
    return result;
  }

  const pMap = str2Map(p, p.length)
  // 初始化滑动窗口的哈希表
  const windowMap = str2Map(s, p.length)

  // 滑动窗口遍历
  for (let i = pLength; i <= sLength; i++) {
    // 检查窗口哈希表和目标哈希表是否相等
    if (isSameMap(windowMap, pMap)) {
      result.push(i - pLength);
    }

    // 移动窗口，更新哈希表
    if (i < sLength) {
      windowMap.set(s[i], (windowMap.get(s[i]) || 0) + 1);
      const leftChar = s[i - pLength];
      const leftCharCount = windowMap.get(leftChar)
      if(leftCharCount=== 1) {
        windowMap.delete(leftChar);
      } else {
        windowMap.set(leftChar, leftCharCount - 1);
      }
    }
  }

  return result;
};


var uniquePaths = function(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  // 初始化第一行和第一列的值为1
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
  }
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};
