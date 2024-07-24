const binaryInsertionSort = (nums) => {
  for (let i = 1; i < nums.length; i++) {
    let current = nums[i]
    let left = 0
    let right = i - 1
    while (left <= right) {
      let mid = Math.floor((left + right) / 2)
      if (current < nums[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    for (let j = i - 1; j >= left; j--) {
      nums[j + 1] = nums[j]
    }
    nums[left] = current
  }
  return nums
}

const testnums = [90, 5, 4, 2, 3, 0, 100]

