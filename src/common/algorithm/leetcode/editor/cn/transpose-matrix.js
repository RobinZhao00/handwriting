const matrix = [
  [1, 2, 3],
  [4, 5, 6],
]
const output = [
  [1, 4],
  [2, 5],
  [3, 6],
]

const transpose01 = (matrix) => {
  const { length: rowLength } = matrix // 2
  const { length: columnLength } = matrix[0] // 3
  const result = []
  for (let i = 0; i < columnLength; i++) { // 3
    result[i] = []
    for (let j = 0; j < rowLength; j++) { // 2
      result[i].push(matrix[j][i])
    }
  }
  return result
}

const transpose02 = (matrix) => {
  const { length: rowLength } = matrix // 2
  const { length: columnLength } = matrix[0] // 3
  const result = new Array(columnLength)
    .fill(0)
    .map(() => new Array(rowLength).fill(0))
  for (let i = 0; i < columnLength; i++) {
    for (let j = 0; j < rowLength; j++) {
      result[i][j] = matrix[j][i]
    }
  }
  return result
}

const transpose = matrix => Array
  .from({ length: matrix[0].length })
  .map((_, idx) => matrix.map(row => row[idx]))

console.log('**test**', '', transpose(matrix))
