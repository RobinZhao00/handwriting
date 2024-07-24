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
  return nums
}

console.log('moveZeroes', moveZeroes([0,1,0,3,12]))


var missingNumber = function(arr) {
  const length = arr.length;
  if (length === 0) {
    return;
  }
  const gap = (arr[length - 1] - arr[0]) / length;
  for (let fast = 1; fast < length; fast++) {
    if (arr[fast] - arr[fast - 1] !== gap) {
      return fast;
    }
  }
};

/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
  const length = s.length
  const target = ['a', 'e', 'i', 'o', 'u'];
  const matched = new Map()
  for (let i = 0; i < length; i++) {
    const current = s[i];
    if (target.includes(current.toLowerCase())) {
      matched.set(i, current)
    }
  }
  const size = matched.size
  const keys = [...matched.keys()]
  const values = [...matched.values()]
  const result = s.split('')
  for (let i = 0; i < size; i++) {
    result[keys[i]] = values[size - 1 - i];
  }
  return result.join('')
};

console.log('aa', reverseVowels('leetcode'))


const mutiply = (nums) => nums.reduce((prev,curr) => prev *= curr, 1)



var minCostClimbingStairs = function(cost) {
  const dp = [0,0]
  for (let i = 2; i < cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[dp.length-1]
};


const getCount = (count) => {
  if (count === 0) {
    return [];
  }
  if (count < 9) {
    return [`${count + 1}`];
  }
  return (count + 1).toString().split('')
};

var compress = function(chars) {
  let count = 0;
  const length = chars.length;
  let slow = 0
  for (let fast = 0; fast < length; fast++) {
    if (chars[fast] === chars[slow]) {var compress = function(chars) {
      let count = 0;
      const length = chars.length;
      let slow = 0
      for (let fast = 0; fast < length; fast++) {
        if (chars[fast] === chars[slow]) {
          count++;
        } else {
          chars[slow++] = count
          chars[slow-1] = chars[fast-1]
          count = 0
        }
      }
      return slow
    };
      count++;
    } else {
      chars[slow++] = count
      chars[slow-1] = chars[fast-1]
      count = 0
    }
  }
  return slow
};
