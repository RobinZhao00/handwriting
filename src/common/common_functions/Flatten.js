const flatten = arr => arr.reduce((prev, curr) => Array.isArray(curr)
  ? [...prev, ...flatten(curr)]
  : [...prev, curr],
  []);


const flattenV2 = (array, depth = 1) => {
  if (depth === 0) return array;
  return array.reduce((acc, curr) => [
    ...acc,
    ...Array.isArray(curr) && depth > 1
      ? flattenV2(curr, depth - 1)
      : [curr],
  ], []);
};


const getType = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
