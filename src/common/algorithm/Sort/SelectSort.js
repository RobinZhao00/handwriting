const selectionSort = (arr) => {
  const { length } = arr
  const cursor = length - 1
  let miniIdx
  for (let i = 0; i < cursor; i++) {
    miniIdx = i
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[miniIdx]) {
        miniIdx = j // 切换最小的索引
      }
    }
    [arr[miniIdx], arr[i]] = [arr[i], arr[miniIdx]]
  }
  return arr
}

const testArr = [90, 5, 4, 2, 3, 0, 100]

selectionSort(testArr)


const selectSort02 = (arr = []) => {
  const copy = arr.slice()
  const { length } = copy
  let minIdx = 0
  for (let i = 0; i < length - 1; i++) {
    minIdx = i
    for (let j = i + 1; j < length; j++) {
       if(arr[j] < arr[minIdx]) {
         minIdx = j
       }
    }
    [copy[minIdx], copy[i]] = [copy[i],copy[minIdx]]
  }
  return copy
}

console.log('selectionSort(testArr)02', selectSort02(testArr))


const selection02 = (arr = []) => {
  const copy = arr.slice()
  const { length } = copy
  let minIdx = 0
  for (let i = 0; i < length-1; i++) {
    minIdx = i
    for (let j =  i + 1; j < length; j++) {
      if(copy[j] < copy[minIdx]) {
        minIdx = j
      }
    }
    [copy[i], copy[minIdx]] = [copy[minIdx], copy[i]]
  }
  return copy
}

// 选择排序，选择最小的索引再交换
