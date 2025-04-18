const extend = (...args) => {
  const [target = {}, ...objs] = args;
  const headToLowerCase = v => v.replace(/(^[A-Z])/g, (m, p1) => p1.toLowerCase());
  // 类型
  const is = (val, compareType) => {
    const type = Object.prototype.toString.call(val)
      .replace(/^(\[object+\s)([\S]+)(\]$)/g, (m, p1, p2) => headToLowerCase(p2));
    // [object, 'Array'] => array
    return compareType
      ? (headToLowerCase(compareType) === type)
      : type;
  };
  const deepClone = value => {
    // 小写驼峰
    const type = is(value);
    // 开始copy
    const actions = {
      // 基本数据类型
      string: val => new String(val).valueOf(),
      number: val => new Number(val).valueOf(),
      boolean: val => new Boolean(val).valueOf(),
      null: val => null,
      undefined: val => undefined,
      // 引用数据类型
      array: val => val.map(item => deepClone(item)),
      object: val => Object.entries(val).reduce((pre, [k, v]) => ({
        ...pre,
        [k]: deepClone(v),
      }), {}),
      // 其它数据类型
      regexp: (val) => new RegExp(val).valueOf(),
      date: (val) => new Date(val).valueOf(),
      htmlBodyElement: val => val.cloneNode(),
      // todo 数据类型没有完全
      default: val => val,
    };
    const action = actions[type] || actions.default;
    return action(value);
  };
  return objs.length
    ? objs.reduce((prev, curr) => is(curr, 'object') ? ({ ...prev, ...deepClone(curr) }) : prev, target)
    : target
}
// test
extend({ a: 1 }, { b: 2, c: { a: 1 } });
