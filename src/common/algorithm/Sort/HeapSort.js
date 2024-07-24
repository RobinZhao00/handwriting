const swap = (arr, idxI, idxJ) => [arr[idxJ], arr[idxI]] = [arr[idxI], arr[idxJ]]

const heapify = (arr, i, length) => {
  let left = 2 * i + 1
  let right = 2 * i + 2
  let largest = i

  if (left < length && arr[left] > arr[largest]) {
    largest = left
  }

  if (right < length && arr[right] > arr[largest]) {
    largest = right
  }

  if (largest !== i) {
    swap(arr, i, largest)
    heapify(arr, largest, length)
  }
}

const buildMaxHeap = (arr, length) => {
  for (let i = Math.floor(length / 2); i >= 0; i--) {
    heapify(arr, i, length)
  }
}

const heapSort = (arr) => {
  let { length: step } = arr
  buildMaxHeap(arr, step)
  for (let i = step - 1; i > 0; i--) {
    swap(arr, 0, i)
    step--
    heapify(arr, 0, step)
  }
  return arr
}


const testArr = [90, 5, 4, 2, 3, 0, 100]

heapSort(testArr)

































