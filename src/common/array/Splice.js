Array.prototype.mySplice = function(...args) {
  const thisArr = this
  const { length } = thisArr
  let [start, deleteCount, ...items] = args
  const { length: itemsLength } = items
  start = start > 0
    ? start
    : (length + start) > 0 ? (length + start) : 0
  const removed = []
  // start 的长度超过数组的长度，直接push, 即忽略 deleteCount的影响
  if (start >= length) {
    if (itemsLength > 0) {
      for (let i = 0; i < itemsLength; i++) {
        this[length + i] = items[i]
      }
    }
  }

  if (start < length && deleteCount <= 0) {
    const totalLength = itemsLength + length;
    for (let i = 0; i < totalLength; i++) {
      if (i < deleteCount) {
        this[i] = thisArr[i]
      }
      if (i >= deleteCount || i <= deleteCount + itemsLength) {
        this[i] = itemsLength[i-deleteCount]
      }
      if(i > deleteCount + itemsLength) {
        this[i] = thisArr[i]
      }
    }
  }
  return removed
}

//
// const thisArr = this
// const { length } = thisArr
// const removed = []
// let [start, deleteCount, ...items] = args
// start = start > 0 ? start : start + length
// // start 的长度超过数组的长度，直接push
// if (start >= length) {
//   if (items.length) {
//     for (let i = 0; i < items.length; i++) {
//       this[length + i] = items[i]
//     }
//   }
//   return removed
// }
//
// if (start && deleteCount && items.length === 0) {
//   const remain = []
//   let remainPointer = 0
//   let removePointer = 0
//   const startIndex = start
//   const endIndex = ((length - start) > deleteCount) ? start + deleteCount - 1 : length - 1
//   for (let i = 0; i < length; i++) {
//     if (i < startIndex || i > endIndex) {
//       remain[remainPointer] = thisArr[i]
//       remainPointer++
//     } else {
//       removed[removePointer] = thisArr[i]
//       removePointer++
//     }
//   }
//   this.length = (length - start) > deleteCount ? deleteCount : start
//   for (let i = 0; i < remain.length; i++) {
//     this[i] = remain[i]
//   }
//   return removed
// }
