// 4. 寻找两个正序数组的中位数
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = (nums1, nums2) => {
  const totalArr = [...nums1, ...nums2];
  const length = nums1.length + nums2.length;
  const mergeArr = totalArr.sort((a, b) => a - b);
  const isUnique = length % 2;
  const middleLength = isUnique ? Math.ceil(length / 2) : Math.floor(length / 2);
  return isUnique ? mergeArr[middleLength - 1] : (mergeArr[middleLength - 1] + mergeArr[middleLength]) / 2;
};


// const findMedianSortedArrays = (nums1, nums2) => {
//   const { length: nums1Length } = nums1;
//   const { length: nums2Length } = nums2;
//   const getMidNum = (arr) => {
//     const { length } = arr;
//     const isUnique = length % 2;
//     const middleLength = isUnique ? Math.ceil(length / 2) : Math.floor(length / 2);
//     return isUnique ? arr[middleLength - 1] : (arr[middleLength - 1] + arr[middleLength]) / 2;
//   }
//   if(!nums1Length) {
//     return getMidNum(nums2);
//   }
//   if(!nums2Length) {
//     return getMidNum(nums1);
//   }
//   return (getMidNum(nums1) + getMidNum(nums2)) / 2;
// };
