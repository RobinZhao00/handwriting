const my_instanceof = (left, right) => {
  const rightPrototype = right.prototype
  let leftProto = left.__proto__
  if (leftProto === null) {
    return false
  }
  if (leftProto === rightPrototype) {
    return true
  }
  return my_instanceof(leftProto, right)
}

// test
// function Foo() {}
// my_instanceof(Object, Object); // true
// my_instanceof(Function, Function); // true
// my_instanceof(Function, Object); // true
// my_instanceof(Foo, Foo); // false
// my_instanceof(Foo, Object);// true
// my_instanceof(Foo, Function);// true

// instanceof：利用原型链判断“父级”的原型（prototype）对象是否在“实例”的原型链上；
// typeof：直接根据变量值得内存标识符进行判断；
// typeof 一般用来判断 number、string、boolean、undefined、object、function、symbol这七中类型。
// js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息：
//
// 000：对象
//
// 010：浮点数
//
// 100：字符串
//
// 110：布尔
//
// 1：整数

// 参考链接  https://juejin.im/post/6844903613584654344
