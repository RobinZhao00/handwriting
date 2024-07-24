const throttle = (fn, delay = 1000) => {
  let timer = null;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}
// 固定函数执行的速率
// demo https://codepen.io/DrivingFatigue/pen/XWKmdqB
