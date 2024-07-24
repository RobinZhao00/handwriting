const getThousand = (number) => {
  const symbol = number >= 0 ? '' : '-';
  let [integer, decimal] = Math.abs(number).toString().split('.');
  decimal = decimal ? `.${decimal}` : '';
  let count = 0;
  let result = '';
  for (let i = integer.length - 1; i >= 0; i--) {
    result = integer[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result;
    }
  }
  return [symbol, result, decimal].join('');
};

console.log(getThousand(-123456))