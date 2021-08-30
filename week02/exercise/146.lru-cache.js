class Node {
  constructor(value, key, pre, next) {
      this.value = value
      this.pre = pre
      this.next = next
      this.key = key
  }
}


/**
* @param {number} capacity
*/
var LRUCache = function(capacity) {
  const L = new Node(0, '', null, null)
  this.capacity = capacity
  this.size = 0
  this.head = L
  this.tail = new Node(0, '', this.head, this.head)
  L.next = this.tail
  L.pre = this.tail
  this.table = Object.create(null)
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  const node = this.table[key]
  if (node) {
      removeNode(node)
      addNode(this.head, node)
      return node.value
  }
  return -1
};

function removeNode(node) {
  node.pre.next = node.next
  node.next.pre = node.pre
}

function addNode(head, node) {
  node.next = head.next
  head.next.pre = node
  head.next = node
  node.pre = head
}

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  let node = this.table[key]
  if (node) {
      node.value = value
      removeNode(node)
      addNode(this.head, node)
  } else {
      if (this.size + 1 > this.capacity) {
          delete this.table[this.tail.pre.key]
          removeNode(this.tail.pre)
      }
      node = new Node(value, key)
      this.table[key] = node
      addNode(this.head, node)
      this.size++
  }
};

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/