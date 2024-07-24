Array.prototype.myPush = function(...args) {
  const { length: originLength } = this
  const { length: pushLength } = args
  for (let i = 0; i < pushLength; i++) {
    this[originLength + i] = args[i]
  }
  return originLength + pushLength
}



