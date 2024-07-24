Array.myOf = function() {
  const array = []
  for (let i = 0; i < arguments.length; i++) {
    array[i] = arguments[i]
  }
  return array
}
//test

Array.of(7)       // [7]
Array.of(1, 2, 3) // [1, 2, 3]
