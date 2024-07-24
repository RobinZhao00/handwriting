Array.prototype.myUnshift = function(...args) {
  const thisArr = JSON.parse(JSON.stringify(this))
  const { length } = thisArr
  const { length: argsLength } = args
  for (let i = 0; i < argsLength + length; i++) {
    this[i] = i < argsLength
      ? args[i]
      : thisArr[argsLength - 1 + i]
  }
  return length + argsLength
}
