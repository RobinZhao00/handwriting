class LinkedNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}


class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }


  append(value) {
    const node = new LinkedNode(value)
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head
      while(current.next) {
        current = current.next
      }
      current.next = node
    }
    this.size++
  }

  delete(value) {
    let previous = null;
    let current = this.head;
    while (current !== null && current.value !== value) {
      previous = current;
      current = current.next;
    }
    if (current === null) {
      return;
    }
    if (previous === null) {
      this.head = current.next;
    } else {
      previous.next = current.next;
    }
    this.size--;
  }

  upload(oldValue, newValue) {
    let current = this.head
    while(current !== null) {
      if (current.value === oldValue) {
        current.value = newValue
        return true
      }
      current = current.next;
    }
    return false
  }

  find(value) {
    let current = this.head
    let index = 0
    while(current !== null) {
      if (current.value === value) {
        return index
      }
      index ++
      current = current.next;
    }
    return -1
  }

  copy() {
    const copyList = new LinkedList();
    let current = this.head
    while(current !== null) {
      copyList.append(current.value);
      current = current.next
    }
    return copyList
  }
}


const getCount = (str, target) => {
  str = str.toLowerCase();
  const map = new Map();
  for (let i = 0; i < str.length; i++) {
    const current = str[i];
    map.set(current, (map.has(current) ? map.get(current) : 0) + 1);
  }
  return map.has(target) ? map.get(target) : -1;
};


const str2Arr = (str) => {
  const { length } = str;
  let arr = [];
  let count = 0;
  if (length === 0) {
    return ['0'.repeat(8)];
  }
  for (let i = 0; i < length; i++) {
    ++count;
    if (count % 8 === 0) {
      arr.push(str.substring(count - 8, count));
    } else if (count === length) {
      arr.push(str.substring(count - count % 8, count) + '0'.repeat(8 - count % 8));
    }
  }
  return arr;
};

const line = await readline()
const tokens = line.split('');
let result = 0
let count = 0
const map = {
  'A': 10,
  'B' : 11,
  'C' : 12,
  'D' : 13,
  'E' : 14,
  'F' : 15,
}
for (let i = tokens.length - 1; i > 1; i--) {
  count ++
  const current = tokens[i]
  result += (map[current] || current ) * (16 ** count)
}

const arrange = (str) => {
  const numbers = str.split(' ').sort((a, b) => a - b);
  const arr5 = []
  const arr3 = []
  const res = []
  for (let i = 0; i < numbers.length; i++) {
    const current = numbers[i]
    if(current % 5 == 0 && current % 3 != 0 ) {
      arr5.push(current)
    }
    if(current % 5 != 0 && current % 3 == 0 ) {
      arr3.push(current)
    }
    if(current % 5 != 0 && current % 3 != 0) {
      res.push(current)
    }
  }
};
