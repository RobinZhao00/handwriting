const shellSort = (arr) => {
  const { length } = arr
  let gap = 1
  while (gap < length / 3) {
    gap = gap * 3 + 1
  }
  while (gap > 0) {
    for (let i = gap; i < length; i++) {
      let j = i - gap
      let temp = arr[i]
      while (j >= 0 && arr[j] > temp) {
        arr[j + gap] = arr[j]
        j -= gap
      }
      arr[j + gap] = temp
    }
    gap = Math.floor(gap / 3)
  }
  return arr
}

const testArr = [90, 5, 4, 2, 3, 0, 100]

console.log('shellSort', shellSort(testArr))


const shellSort02 = (arr = []) => {
  const copy = arr.slice()
  const { length } = copy
  let gap = 1
  while (gap < length / 3) {
    gap = gap * 3 + 1
  }

  while (gap > 0) {
    for (let i = gap; i < length; i++) {
      let current = copy[i]
      let prevIndex = i - gap
      while (prevIndex >= 0 && copy[prevIndex] > current) {
        copy[prevIndex + gap] = copy[prevIndex]
        prevIndex -= gap
      }
      copy[prevIndex + gap] = current
    }
    gap = Math.floor(gap / 3)
  }
  return copy
}


console.log('shellSort02', shellSort02(testArr))
