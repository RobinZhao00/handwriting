const insertionSort = (arr = []) => {
  const copy = arr.slice()
  const { length } = copy
  let prevIndex
  let current
  for (let i = 1; i < length; i++) {
    prevIndex = i - 1
    current = copy[i]
    while (prevIndex >= 0 && copy[prevIndex] > current) {
      copy[prevIndex + 1] = copy[prevIndex]
      prevIndex--
    }
    copy[prevIndex + 1] = current
  }
  return copy
}

const testArr = [90, 5, 4, 2, 3, 0, 100]

insertionSort(testArr)
console.log('**test**', 'insertSort(testArr)', insertionSort(testArr))
