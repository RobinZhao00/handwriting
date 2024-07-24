// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
//
// 注意：答案中不可以包含重复的三元组。


// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
//
// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  const newNums = nums.sort((a, b) => a - b);
  const { length } = newNums;
  const result = [];
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      const item1 = newNums[i];
      const item2 = newNums[j];
      const res = 0 - item1 - item2;
      const reverseArr = [...newNums].reverse();
      const idx = reverseArr.indexOf(res);
      console.log('**test**', 'idx', idx, j, res);
      if ((idx > -1) && ((length - idx) > j)) {
        result.push([item1, item2, res]);
      }
    }
  }
  return result.filter((item, index, arr) => arr.map(itm => JSON.stringify(itm)).indexOf(JSON.stringify(item), 0) === index)
};
