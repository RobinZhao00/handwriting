class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // 用于存储缓存数据
    this.frequency = new Map(); // 用于存储缓存数据的访问频率
    this.expiration = new Map(); // 用于存储缓存数据的过期时间
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      if (this.isExpired(key)) {
        this.cache.delete(key);
        this.frequency.delete(key);
        this.expiration.delete(key);
        return -1;
      }
      this.updateFrequency(key);
      return value;
    }
    return -1;
  }

  put(key, value, expirationTime) {
    if (this.capacity === 0) {
      return;
    }

    if (this.cache.has(key)) {
      this.cache.set(key, value);
      this.updateFrequency(key);
    } else {
      if (this.cache.size >= this.capacity) {
        this.evict(); // 如果缓存已满，则先淘汰访问频率最低的数据
      }
      this.cache.set(key, value);
      this.frequency.set(key, 1); // 新增缓存数据的访问频率为1
      this.expiration.set(key, expirationTime); // 设置缓存数据的过期时间
    }
  }

  updateFrequency(key) {
    const freq = this.frequency.get(key);
    this.frequency.set(key, freq + 1);
  }

  isExpired(key) {
    const expirationTime = this.expiration.get(key);
    return expirationTime !== undefined && expirationTime < new Date().getTime();
  }

  evict() {
    let minFreq = Infinity;
    let evictKey = null;

    for (const [key, freq] of this.frequency) {
      if (freq < minFreq) {
        minFreq = freq;
        evictKey = key;
      }
    }

    this.cache.delete(evictKey);
    this.frequency.delete(evictKey);
    this.expiration.delete(evictKey);
  }
}

// 示例用法
const cache = new LFUCache(3);
cache.put("key1", "value1", new Date().getTime() + 5000); // 设置过期时间为 5 秒后
cache.put("key2", "value2", new Date().getTime() + 10000); // 设置过期时间为 10 秒后
cache.put("key3", "value3");

console.log(cache.get("key1")); // 输出: "value1"

setTimeout(() => {
  console.log(cache.get("key2")); // 输出: -1，"key2"已过期
}, 6000);

