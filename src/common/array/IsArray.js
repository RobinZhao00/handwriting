Array.myIsArray = (...args) => {
  const [target] = args
  return Object.prototype.toString.call(target) === '[object Array]'
}
