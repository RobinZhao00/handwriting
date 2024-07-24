let emotion = '😝' // emotion现在是😝
emotion = 1 // emotion现在是1
emotion = true // emotion现在是true

/**
 * @param obj：需要获取类型的数据
 * @param compareType: 比较类型
 * @return {boolean|string}
 */
const getType = (obj, compareType = '') => {
  const TYPE_REG = /([A-Z])\w+/g
  const [type] = Object.prototype.toString.call(obj).match(TYPE_REG, '')
  const typeByLowerCase = type.toLowerCase()
  const compareTypeByLowerCase = compareType.toLowerCase()
  return compareType
    ? typeByLowerCase === compareTypeByLowerCase
    : typeByLowerCase
}
// getType('1')  => string
// getType('1', 'string')  => true


// https://xiumi.us/studio/v5#/paper/for/new/cube/0
