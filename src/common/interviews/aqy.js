// Async/Await 如何通过同步的方式实现异步

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');

// 1. script start
// 2. async1 start
// 3. async2
// 4.   promise1
// 5.  script end
// 6. async1 end
// 7.  promise2
// 8.   setTimeout


// 1. 给定一个8x8的棋盘, 上面有若干个车, 写一个函数检查这些车有没有互相攻击的情况.  输入参数是一个由0和1组成的二维数组
// 说明：
// 1. 数字1为车
// 2. 同一方向（横向/竖向）有2个车，则存在互相攻击的情况
// 3. 存在互相攻击的情况返回true，不存在返回false

// 输入参数示例：
let arr = [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0]
]

const add = array => array.reduce((prev, curr) => prev += curr, 0);
const transfer = array => Array
  .from({ length: array.length })
  .map((col, i) => array.map(row => row[i]));






