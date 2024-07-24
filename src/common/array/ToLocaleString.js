Array.prototype.myLocaleString = function(locales, options = {}) {
  const thisArr = this
  const { length } = thisArr
  let result = ''
  if (length < 2) {
    return length ? thisArr.toLocaleString(locales, options) : ''
  }
  for (let i = 0; i < length; i++) {
    result += `${i === 0 ? '' : ','}${thisArr[i].toLocaleString(locales, options)}`
  }
  return result
}
