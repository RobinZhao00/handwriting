// 参考链接【https://github.com/brickspert/blog/issues/26】
// 参考链接【https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e】
const memorizedState = [];
let cursor = 0;

const useState = (initialState) => {
  const currentCursor = cursor;
  memorizedState[cursor] = memorizedState[cursor] || initialState;
  const setState = newState => {
    memorizedState[currentCursor] = newState;
    render();
  }
  return [memorizedState[cursor++], setState];
}


const useEffect = (callback, depArray) => {
  const hasNoDeps = !depArray;
  const deps = memorizedState[cursor];
  const hasChangeDeps = deps ?
    !depArray.every((ele, i) => ele === deps[i])
    : true;
  if (hasNoDeps || hasChangeDeps) {
    callback();
    memorizedState[cursor] = depArray;
  }
  cursor++;
}
