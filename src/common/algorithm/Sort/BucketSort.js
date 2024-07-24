import { insertSort } from './InsertSort'

function bucketSort(arr, bucketSize) {
  if (arr.length === 0) {
    return arr
  }

  var i
  var minValue = arr[0]
  var maxValue = arr[0]
  for (i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i]                // 输入数据的最小值
    } else if (arr[i] > maxValue) {
      maxValue = arr[i]                // 输入数据的最大值
    }
  }

  //桶的初始化
  var DEFAULT_BUCKET_SIZE = 5            // 设置桶的默认数量为5
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE
  var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  var buckets = new Array(bucketCount)
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = []
  }

  //利用映射函数将数据分配到各个桶中
  for (i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i])
  }

  arr.length = 0
  for (i = 0; i < buckets.length; i++) {
    insertSort(buckets[i])                      // 对每个桶进行排序，这里使用了插入排序
    for (var j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j])
    }
  }

  return arr
}

// 分而治之
const bucketSort = (arr, size = 5) => {
  const copy = arr.slice()
  if (copy.length <= 1) {
    return copy
  }
  const min = Math.min(...copy)
  const max = Math.max(...copy)
  // 获取桶的个数
  const buckets = Array.from({ length: Math.floor((max - min) / size) + 1 }, () => [])
  //  利用映射函数将数据分配到各个桶中
  copy.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val)
  })
  // 对每个桶进行排序
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], [])
}




const insertionSort = (arr = []) => {
  const copy = arr.slice()
  const { length } = copy
  let prevIdx, current
  for (let i = 1; i < length; i++) {
    current = copy[i]
    prevIdx = i - 1
    while (prevIdx >= 0 && copy[prevIdx] > current) {
      copy[prevIdx + 1] = copy[prevIdx]
      prevIdx--
    }
    copy[prevIdx + 1] = current
  }
  return copy
}
const bucketSort = (arr, size = 5) => {
  const copy = arr.slice()
  if (copy.length <= 1) {
    return copy
  }
  const min = Math.min(...copy)
  const buckets = []
  copy.forEach(val => {
    const current = Math.floor((val - min) / size)
    buckets[current] = buckets[current] || []
    buckets[current].push(val)
  })
  // 对每个桶进行排序
  return buckets.reduce((acc, curr) => [...acc, ...insertionSort(curr)], [])
}
