// const convertArray2Tree = (list, parentId = 'parentId', id = 'id', rootId = '0') => {
//   const root = [{ [`${id}`]: rootId, children: [] }]
//   const walkTree = (lst, result) => {
//     if (!lst.length) {
//       return result
//     }
//     return result.reduce((prev, curr) => [
//         ...prev,
//         {
//           ...curr,
//           children: walkTree(
//             lst.filter((itm) => itm[parentId] !== curr[id]),
//             lst.filter((itm) => itm[parentId] === curr[id]),
//           ),
//         },
//       ],
//       [],
//     )
//   }
//   return walkTree(list, root)
// }

const testList = [
  {
    id: '19',
    parentId: '0',
  },
  {
    id: '18',
    parentId: '16',
  },
  {
    id: '17',
    parentId: '16',
  },
  {
    id: '16',
    parentId: '0',
  },
]


const testTree = [
  {
    id: '0',
    children: [
      { id: '19', parentId: '0', children: [] },
      {
        id: '16',
        parentId: '0',
        children: [
          { id: '18', parentId: '16' },
          { id: '17', parentId: '16' },
        ],
      },
    ],
  },
]

// const convertTree2Array = data => {
//   const walkTree = (items, res) => {
//     res = res ? [res] : []
//     if (!items || !items.length) {
//       return res
//     }
//     return items.reduce(
//       (prev, curr) => [
//         ...prev,
//         ...res,
//         ...walkTree(curr.children, {
//           id: curr.id,
//           parentId: curr.parentId || null,
//         }),
//       ],
//       [],
//     )
//   }
//   return [...new Set(walkTree(data))]
// }
// convertTree2Array(testTree)

const convertArray2Tree = (list, parentId = 'parentId', id = 'id', rootId = '0') => {
  // 使用 Map 来存储节点，key 为节点的 id
  const nodeMap = new Map();
  // 存储根节点
  const root = [{ [id]: rootId, children: [] }];

  // 遍历列表，将每个节点放入 nodeMap 中
  for (const item of list) {
    const itemId = item[id];
    const parentNode = nodeMap.get(item[parentId]) || root[0];
    // 初始化节点的 children 属性
    item.children = [];
    // 将当前节点添加到父节点的 children 数组中
    parentNode.children.push(item);
    // 将当前节点添加到 nodeMap 中
    nodeMap.set(itemId, item);
  }

  return root;
}


function convertTree2Array(tree) {
  const result = [];

  // 递归遍历树节点
  function traverse(node, parentId = null) {
    // 将当前节点添加到结果数组中
    result.push({ id: node.id, parentId });

    // 如果当前节点有子节点，则继续递归遍历子节点
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        traverse(child, node.id); // 传递当前节点的 id 作为父节点的 parentId
      }
    }
  }

  // 从根节点开始递归遍历
  traverse(tree);

  return result;
}



let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
]

console.log('**test**', 'aaa', convertTree2Array(testTree[0]))




