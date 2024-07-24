const bubbleSort = function(arr) {
  const { length } = arr
  const cursor = length - 1
  for (let i = 0; i < cursor; i++) {
    for (let j = 0; j < cursor - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]] // 左右交换
      }
    }
  }
  return arr
}

const testArr = [90, 5, 4, 2, 3, 0, 100]

console.log('**test**', '', bubbleSort(testArr))


const bubbleSort02 = (arr = []) => {
  const length = arr.length
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

console.log('bubbleSort02(testArr)', bubbleSort02(testArr))







