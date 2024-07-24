Array.prototype.myConcat = function(...args) {
  let thisArr = this
  const { length } = thisArr
  const mergeTwoArray = (arr1, arr2) => {
    const { length: arr1Length } = arr1
    const { length: arr2Length } = arr2
    for (let i = 0; i < arr2Length; i++) {
      arr1[arr1Length + i] = arr2[i]
    }
    return arr1
  }
  for (let i = 0; i < length; i++) {
    thisArr = mergeTwoArray(thisArr, args[i])
  }
  return thisArr
}
// test
const testArr = [1, 2, 3]
testArr.concat([4, 5], [6, 7]) // [1,2,3,4,5,6,7]
