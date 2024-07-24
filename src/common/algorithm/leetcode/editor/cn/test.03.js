function testWeightBagProblem(weight, value, size) {
  // 定义 dp 数组
  const len = weight.length;
  const dp = Array(len).fill().map(() => Array(size + 1).fill(0));
  console.table(dp);

  // 初始化
  for (let j = weight[0]; j <= size; j++) {
    dp[0][j] = value[0];
  }
  console.table(dp);

  // weight 数组的长度len 就是物品个数
  for (let i = 1; i < len; i++) { // 遍历物品
    for (let j = 0; j <= size; j++) { // 遍历背包容量
      if (j < weight[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
      }
    }
  }

  console.table(dp);

  return dp[len - 1][size];
}

testWeightBagProblem([1, 3, 4, 5], [15, 20, 30, 55], 6);


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


console.log(binarySearch([5, 7, 7, 8, 8, 10], 10));


var mySqrt = function(x) {
  let start = 0;
  let end = x;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const sqrt = mid * mid;
    if (sqrt === x) {
      return mid;
    } else if (sqrt < x) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return end;
};


var removeElement = function(nums, val) {
  const length = nums.length;
  if (length === 0) {
    return 0;
  }
  let slowIdx = 0;
  for (let fastIndex = 0; fastIndex < length; fastIndex++) {
    if (nums[fastIndex] !== val) {
      nums[slowIdx++] = nums[fastIndex];
    }
  }
  return slowIdx;
};


var removeDuplicates = function(nums) {
  const length = nums.length;
  if (length === 0) {
    return 0;
  }
  let slow = 1;
  for (let fast = 1; fast < length; fast++) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow++] = nums[fast];
    }
  }
  return slow;
};
const testArr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

console.log('removeDuplicates', removeDuplicates(testArr), testArr.length, testArr);


var moveZeroes = function(nums) {
  const length = nums.length;
  if (length === 0) {
    return 0;
  }
  let slow = 0;
  for (let fast = 0; fast < length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow++] = nums[fast];
    }
  }
  nums.fill(0, slow);
};


var moveZeroes = function(nums) {
  const length = nums.length;
  if (length === 0) {
    return nums;
  }
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast]) {
      if (fast !== slow) {
        nums[slow++] = nums[fast];
        nums[fast] = 0;
      } else {
        slow++;
      }
    }
  }
  return nums;
};

console.log('moveZeroes', moveZeroes([0, 1, 0, 3, 12]));


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var deleteStr = function(s) {
  const length = s.length;
  if (length === 0) {
    return s;
  }
  let result = '';
  for (let i = 0; i < length; i++) {
    if (s[i] !== '#') {
      result += s[i];
    } else {
      result = result.slice(0, -1);
    }
  }
  return result;
};
var backspaceCompare = function(s, t) {
  const deletedS = deleteStr(s);
  const deletedT = deleteStr(t);
  return deletedS === deletedT;
};
console.log('deleteStr', backspaceCompare('ab#c', 'ad#c'));


var sortedSquares = function(nums) {
  const length = nums.length;
  let leftIdx = 0;
  let rightIdx = length - 1;
  const res = [];

  for (let i = 0; i < length; i++) {
    const left = nums[leftIdx] ** 2;
    const right = nums[rightIdx] ** 2;
    if (left > right) {
      res[i] = left;
      leftIdx++;
    } else {
      res[i] = right;
      rightIdx--;
    }
  }
  return res;
};


const sortedSquares = (arr = []) => {
  const length = arr.length;
  let result = [];
  let start = 0;
  let end = length - 1;
  let count = length - 1
  while (start <= end) {
    const squaredStart= arr[start] ** 2
    const squaredEnd = arr[end] ** 2;
    if (squaredStart < squaredEnd) {
      result[count--] = squaredEnd;
      end --
    } else {
      result[count--] = squaredStart;
      start ++
    }
  }
  return result
};

const removeElement = (nums, val) => {
  let count = -1
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[count++] = nums[i];
    }
  }
  return count
}


var removeDuplicates = function(nums) {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  let slow = 0;
  for (let fast = 0; fast < n; fast++) {
    if (nums[fast] !== nums[fast + 1]) {
      nums[slow++] = nums[fast];
    }
  }
  return slow;
};

var moveZeroes = function(nums) {
  const length = nums.length;
  if (length === 0) {
    return nums;
  }
  let slow = 0;
  for (let fast = 0; fast < length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow++] = nums[fast];
    }
  }
  nums.fill(0,slow)
}



