/**
 * 主题思路：
 * 使用两个指针，在数组中标记队头和队尾
 * 在队头添加时，队头指针往前移动，删除队头时往后移动
 * 在队尾操作与队头相反
 * @param {number} k
 */
 var MyCircularDeque = function(k) {
  this.list = Array(k)
  this.maxLength = k
  this.front = 0
  this.tail = 0
  this.count = 0
};

/**
* Adds an item at the front of Deque. Return true if the operation is successful. 
* @param {number} value
* @return {boolean}
*/
MyCircularDeque.prototype.insertFront = function(value) {
  if (this.count === this.maxLength) {
      return false
  }
  if (this.count === 0) {
      this.list[this.front] = value
      this.count++
      return true
  }
  this.front--
  if (this.front < 0) {
      this.front = this.maxLength - 1
  }
  this.list[this.front] = value
  this.count++
  return true
};

/**
* Adds an item at the rear of Deque. Return true if the operation is successful. 
* @param {number} value
* @return {boolean}
*/
MyCircularDeque.prototype.insertLast = function(value) {
  if (this.count === this.maxLength) {
      return false
  }
  // 队列空的时候添加，队头和队尾指针指向同一个值
  if (this.count === 0) {
      this.list[this.tail] = value
      this.count++
      return true
  }
  this.tail++
  if (this.tail > this.maxLength - 1) {
      this.tail = 0
  }
  this.list[this.tail] = value
  this.count++
  return true
};

/**
* Deletes an item from the front of Deque. Return true if the operation is successful.
* @return {boolean}
*/
MyCircularDeque.prototype.deleteFront = function() {
  if (this.count === 0) {
      return false
  }
  if (this.tail !== this.front) {
      this.front++
  }
  
  if (this.front > this.maxLength - 1) {
      this.front = 0
  }
  this.count--
  return true
};

/**
* Deletes an item from the rear of Deque. Return true if the operation is successful.
* @return {boolean}
*/
MyCircularDeque.prototype.deleteLast = function() {
  if (this.count === 0) {
      return false
  }
  if (this.tail !== this.front) {
      this.tail--
  }
  if (this.tail < 0) {
      this.tail = this.maxLength - 1
  }
  this.count--
  return true
};

/**
* Get the front item from the deque.
* @return {number}
*/
MyCircularDeque.prototype.getFront = function() {
  if (this.count === 0) {
      return -1
  }
  return this.list[this.front]
};

/**
* Get the last item from the deque.
* @return {number}
*/
MyCircularDeque.prototype.getRear = function() {
  if (this.count === 0) {
      return -1
  }
  return this.list[this.tail]
};

/**
* Checks whether the circular deque is empty or not.
* @return {boolean}
*/
MyCircularDeque.prototype.isEmpty = function() {
  return this.count === 0
};

/**
* Checks whether the circular deque is full or not.
* @return {boolean}
*/
MyCircularDeque.prototype.isFull = function() {
  return this.count === this.maxLength
};

/**
* Your MyCircularDeque object will be instantiated and called as such:
* var obj = new MyCircularDeque(k)
* var param_1 = obj.insertFront(value)
* var param_2 = obj.insertLast(value)
* var param_3 = obj.deleteFront()
* var param_4 = obj.deleteLast()
* var param_5 = obj.getFront()
* var param_6 = obj.getRear()
* var param_7 = obj.isEmpty()
* var param_8 = obj.isFull()
*/