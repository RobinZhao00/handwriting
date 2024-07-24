Array.prototype.myIncludes = function (searchElement, fromIndex) {
  let result = false
  const thisArr = this
  const { length } = thisArr
  for (let i = 0; i < length; i++) {
    if (thisArr[i] === searchElement) {
      if (fromIndex < 0) {
        fromIndex = 0
      }
      if (fromIndex >=length) {
        break
      }
      result = fromIndex ? fromIndex === i : true
      break
    }
  }
  return result
}
