Array.prototype.myToString = function(...args) {
  const thisArr = this
  const { length } = thisArr
  let result = ''
  if (length < 2) {
    return length ? thisArr.toString() : ''
  }
  for (let i = 0; i < length; i++) {
    result += `${i === 0 ? '' : ','}${thisArr[i].toString()}`
  }
  return result
}
