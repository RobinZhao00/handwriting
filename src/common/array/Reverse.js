Array.prototype.myReverse = function() {
  let thisArr = this
  const { length } = thisArr
  const result = []
  for (let i = 0; i < length; i++) {
    result[length - i - 1] = thisArr[i]
  }
  return result
}

const array1 = ['one', 'two', 'three']
console.log('array1:', array1)
const reversed = array1.myReverse()
console.log('reversed:', reversed)
