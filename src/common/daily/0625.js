const quickSort = (arr) => {
  const { length } = arr;
  if (length <= 1) {
    return arr;
  }
  const left = [];
  const right = [];
  const pivotIdx = Math.floor(length / 2);
  const pivot = arr[pivotIdx];
  for (let i = 0; i < length; i++) {
    if (i !== pivotIdx) {
      const current = arr[i];
      if (current <= pivot) {
        left.push(current);
      } else {
        right.push(current);
      }
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};

const arrToTree = (arr, options = {}) => {
  const { id = 'id', rootId = '0', parentId = 'parentId' } = options;
  const nodeMap = arr.reduce((prev, curr) => {
    const key = curr[id];
    prev.set(key, { ...curr, children: [] });
    return prev;
  }, new Map());
  const tree = arr.reduce((prev, curr) => {
    const currId = curr[id];
    const currParentId = curr[parentId];
    const currNode = nodeMap.get(currId);
    if (currParentId === rootId) {
      prev.push(currNode);
    } else {
      const parentNode = nodeMap.get(currParentId);
      parentNode.children.push(currNode);
    }
    return prev;
  }, []);
  return [{ id: rootId, children: tree }];
};

const tree2Arr = (tree) => tree.reduce((prev, curr) => {
  const { children, ...extra } = curr;
  prev.push(extra);
  if (children) {
    prev.push(...tree2Arr(children));
  }
  return prev;
}, []);


const getThousand = (num, separator = ',') => {
  const symbol = num >= 0 ? '' : '-';
  let [integer, decimal] = Math.abs(num).toString().split('.');
  decimal = decimal ? `.${decimal}` : '';
  let count = 0;
  let result = '';
  for (let i = integer.length - 1; i >= 0; i--) {
    result = integer[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) {
      result = separator + result;
    }
  }
  return [symbol, result, decimal].join('');
};
