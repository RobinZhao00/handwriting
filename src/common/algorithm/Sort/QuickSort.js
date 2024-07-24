const quickSort = (arr) => {
  const copy = arr.slice()
  const { length } = copy
  if (length <= 1) {
    return copy
  }
  const pivotIndex = Math.floor(length / 2)
  const pivot = copy[pivotIndex]
  let left = []
  let right = []
  for (let i = 0; i < length; i++) {
    if (copy[i] < pivot || (copy[i] === pivot && i !== pivotIndex)) {
      left.push(copy[i])
    }
    if (copy[i] > pivot) {
      right.push(copy[i])
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}

const testArr = [90, 5, 4, 2, 3, 0, 100, -1, 2]

console.log('**test**', '', quickSort(testArr))
