const create = (proto, propertiesObject) => {
  // 小写驼峰
  const headToLowerCase = v => v.replace(/(^[A-Z])/g, (m, p1) => p1.toLowerCase());
  // 类型
  const is = (val, compareType) => {
    const type = Object.prototype.toString.call(val)
      .replace(/^(\[object+\s)([\S]+)(]$)/g, (m, p1, p2) => headToLowerCase(p2));
    // [object, 'Array'] => array
    return compareType
      ? (headToLowerCase(compareType) === type)
      : type;
  };
  const generateObj = prototype => {
    const obj = {};
    obj.__proto__ = prototype;
    // setProperty to obj
    Object.entries(propertiesObject).forEach(([key, value]) => is(value, 'object') && Object.defineProperty(obj, key, value));
    return obj;
  }
  const type = is(proto);
  const actions = {
    object: () => generateObj(proto),
    function: () => generateObj(proto),
    null: () => new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."),
    default: () => new TypeError('Object prototype may only be an Object: ' + proto),
  }
  return actions[type]();
}

const testObj = create({ a: 1, b: 2 }, {
  c: {
    value: 3,
    enumerable: true,
    configurable: true,
    writable: true,
  }
});
console.log('testObj', testObj);
