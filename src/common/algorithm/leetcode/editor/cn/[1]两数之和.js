//给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。
//
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
//
// 你可以按任意顺序返回答案。
//
//
//
// 示例 1：
//
//
//输入：nums = [2,7,11,15], target = 9
//输出：[0,1]
//解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
//
//
// 示例 2：
//
//
//输入：nums = [3,2,4], target = 6
//输出：[1,2]
//
//
// 示例 3：
//
//
//输入：nums = [3,3], target = 6
//输出：[0,1]
//
//
//
//
// 提示：
//
//
// 2 <= nums.length <= 103
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// 只会存在一个有效答案
//
// Related Topics 数组 哈希表
// 👍 10482 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let result
  for (let i = 0; i < nums.length; i++) {
    for (let j = i+1; j < nums.length; j++) {
      if (target - nums[i] - nums[j] === 0) {
        result = [i,j]
        break
      }
    }
  }
  return result
};
//leetcode submit region end(Prohibit modification and deletion)


// const res = target - nums[i]
// const idx = nums.indexOf(res)
// if (idx > -1 && i !== idx) {
//   result = [i, idx]
//   break;
// }


// const twoSum = (nums, target) => {
//   const map = new Map()
//   let result = []
//   for (let i = 0; i < nums.length; i++) {
//     const current = nums[i]
//     map.set(current, map.has(current) ? [...map.get(current), i] : [i])
//   }
//   for (const [key, value] of map) {
//     if (target - key === key) {
//       if (value.length >= 2) {
//         result = value.slice(0, 2)
//       }
//     } else if (map.get(target - key)) {
//       result = [value[0], map.get(target - key)[0]]
//     }
//   }
//   return result
// }


const twoSum = (nums, target) => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return []; // 如果找不到结果，返回空数组
};


console.log('twoSum01', twoSum01([2,7,11,15], 9))
console.log('twoSum03', twoSum01([3,2,4], 6))
console.log('twoSum02', twoSum01([3,3], 6))
