let testArr = [90, 5, 4, 2, 2, 3, 0, 100]

countingSort(testArr)


function countingSort(arr = []) {
  const copy = arr.slice()
  const { length } = copy
  const maxVal = Math.max(...copy)
  const bucketsLength = maxVal + 1
  const buckets = new Array(bucketsLength)
  let sortedIdx = 0
  for (let i = 0; i < length; i++) {
    const current = copy[i]
    buckets[current] = buckets[current] || 0
    buckets[current]++
  }
  for (let j = 0; j < bucketsLength; j++) {
    while (buckets[j] > 0) {
      copy[sortedIdx++] = j
      buckets[j]--
    }
  }
  return copy
}


function countingSort02(arr = []) {
  const copy = arr.slice()
  const { length } = copy
  const buckets = []
  let sortedIdx = 0
  for (let i = 0; i < length; i++) {
    const current = copy[i]
    buckets[current] = buckets[current] || 0
    buckets[current]++
  }
  for (let j = 0; j < buckets.length; j++) {
    while (buckets[j] > 0) {
      copy[sortedIdx++] = j
      buckets[j]--
    }
  }
  return copy
}

