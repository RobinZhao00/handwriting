const merge = (left, right) => {
  const result = []

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length)
    result.push(left.shift())

  while (right.length)
    result.push(right.shift())

  return result
}

const mergeSort = arr => {
  const { length } = arr
  if (length < 2) {
    return arr
  }
  const middle = Math.floor(length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}


const testArr = [90, 5, 4, 2, 3, -1, 0, 100]

mergeSort(testArr)


const mergeSort02 = (arr = []) => {
  const copy = arr.slice()
  const { length } = copy
  if (length <= 1) {
    return copy
  }
  const mid = Math.floor(length / 2)
  const left = mergeSort02(copy.slice(0, mid))
  const right = mergeSort02(copy.slice(mid, length))
  return Array.from({ length: left.length + right.length }, () => {
    if (!left.length) return right.shift()
    else if (!right.length) return left.shift()
    else return left[0] > right[0] ? right.shift() : left.shift()
  })
}


console.log('mergeSort02', mergeSort02(testArr))
































