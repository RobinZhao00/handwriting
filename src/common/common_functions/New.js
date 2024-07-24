const create = (...args) => {
  const obj = {};
  const [constructor, ...params] = args;
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, params);
  return result instanceof Object ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
  return this;
}

const testPerson = create(Person, 'neo', '23');

console.log('testPerson', testPerson);
