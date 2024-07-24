//给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
//你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

const twoSum = (nums, target) => {
  const { length } = nums;
  let result = [];
  for (let i = 0, len = Math.floor(length / 2); i < len; i++) {
    const leftCursor = i;
    const rightCursor = length - i - 1;
    const leftEle = nums[leftCursor];
    const rightEle = nums[rightCursor];
    const leftIndex = nums.indexOf(target - leftEle);
    const rightIndex = nums.indexOf(target - rightEle);
    if (leftIndex > -1 && leftIndex !== leftCursor) {
      result = [leftCursor, leftIndex];
      break;
    }
    if (rightIndex > -1 && rightIndex !== rightCursor) {
      result = [rightIndex, rightCursor];
      break;
    }
    continue;
  }
  return result;
}
