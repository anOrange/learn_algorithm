/**
 * initialize your data structure here.
 */
 var MedianFinder = function() {
  this.bigHeap = new BinaryHeap(true)
  this.smallHeap = new BinaryHeap(false)
  this.leftNum = 0
  this.rightNum = 0
  this.mid = -Infinity
};

/** 
* @param {number} num
* @return {void}
*/
MedianFinder.prototype.addNum = function(num) {
  console.log('addNum', num)
  if (this.mid === -Infinity) {
      this.mid = num
  }
  if (num < this.mid) { // 小于中间值，放左边
      this.bigHeap.push(num)
      this.leftNum++
  } else {     // 大于等于放右边  
      this.smallHeap.push(num)
      this.rightNum++
  }
  console.log('a left: ', this.bigHeap.heap)
  console.log('a right: ', this.smallHeap.heap)
};

/**
* @return {number}
*/
MedianFinder.prototype.findMedian = function() {
  // console.log(this.leftNum, this.rightNum)
  if ((this.leftNum + this.rightNum) % 2 === 0) { // 偶数个
      while(this.rightNum !== this.leftNum) {
          if (this.rightNum > this.leftNum) {
              let num = this.smallHeap.pop()
              this.bigHeap.push(num)
              this.rightNum--
              this.leftNum++
          } else {
              let num = this.bigHeap.pop()
              this.smallHeap.push(num)
              this.rightNum++
              this.leftNum--
          }
      }
      this.mid = (this.bigHeap.top() + this.smallHeap.top()) / 2
      // console.log('mid', this.mid, this.bigHeap.top(), this.smallHeap.top())
      console.log(this.mid + 'm left: ', this.bigHeap.heap)
      console.log(this.mid + 'm right: ', this.smallHeap.heap)
      return this.mid
  } else { // 奇数个
      while(Math.abs(this.rightNum - this.leftNum) > 1) {
          if (this.rightNum > this.leftNum) {
              let num = this.smallHeap.pop()
              this.bigHeap.push(num)
              this.rightNum--
              this.leftNum++
          } else {
              let num = this.bigHeap.pop()
              this.smallHeap.push(num)
              this.rightNum++
              this.leftNum--
          }
      }
      console.log(this.mid + 'm left: ', this.bigHeap.heap)
      console.log(this.mid + 'm right: ', this.smallHeap.heap)
      if (this.rightNum > this.leftNum) {
          this.mid = this.smallHeap.top()
          return this.mid
      } else {
          this.mid = this.bigHeap.top()
          return this.mid
      }
  }
};

function BinaryHeap(isBig) {
  this.heap = [0]
  this.isBig = isBig
}

BinaryHeap.prototype.size = function() {
  return this.heap[0]
}

BinaryHeap.prototype.push = function(num) {
  this.heap[0]++
  this.heap[this.heap[0]] = num
  this.heapifyUp(this.heap[0])
}

BinaryHeap.prototype.pop = function() {
  if (this.heap[0] == 0) return -999999
  const top = this.heap[1]
  this.heap[1] = this.heap[this.heap[0]]
  this.heap[0]--
  this.heap.length = this.heap.length - 1
  console.log('be pop ', this.heap)
  this.heapifyDown(1)
  return top
}

BinaryHeap.prototype.top = function() {
  return this.heap[1]
}

BinaryHeap.prototype.heapifyUp = function(index) {
  while(index > 1) {
      const p = this.heap[index >> 1]
      let diff = p - this.heap[index]
      if (this.isBig) diff = -diff
      if (diff < 0) break
      this.heap[index >> 1] = this.heap[index]
      this.heap[index] = p
      index = index >> 1 
  }
}

BinaryHeap.prototype.heapifyDown = function(index) {
  while((index << 1) <= this.heap[0]) {
      let cur = this.heap[index]
      let left = this.heap[index << 1]
      let right = this.heap[(index << 1) + 1]
      let childIndex = index << 1
      if (this.isBig ? right > this.heap[1] : right < this.heap[1]) {
          let diff = left - right
          if (this.isBig) diff = -diff
          if (diff > 0) childIndex = (index << 1) + 1 
      }
      let diff = cur - this.heap[childIndex]
      if (this.isBig) diff = -diff
      if (diff < 0) break
      this.heap[index] = this.heap[childIndex]
      this.heap[childIndex] = cur
      index = childIndex
  }
}

/**
* Your MedianFinder object will be instantiated and called as such:
* var obj = new MedianFinder()
* obj.addNum(num)
* var param_2 = obj.findMedian()
*/