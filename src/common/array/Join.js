Array.prototype.myJoin = function(separator = ',') {
  const thisArr = this
  const { length } = thisArr
  let result = ''
  if (length < 2) {
    return length ? thisArr.toString() : ''
  }
  for (let i = 0; i < length; i++) {
    result += `${i === 0 ? '' : separator}${thisArr[i].toString()}`
  }
  return result
}
// test
const test = [].myJoin('-') // ''
const test02 = [1].myJoin('-') // 1
const test03 = [1, 2, 3].myJoin('-') // 1-2-3
const test04 = [{}, {}].myJoin('-') // [object Object]-[object Object]
