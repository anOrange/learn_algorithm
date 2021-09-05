/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
/*
 // 堆的解法
 var mergeKLists = function(lists) {
  let heap = new BinaryHeap()
  let head = new ListNode()
  let p = head
  lists.forEach(link => {
      if (link) {
          heap.push(link)
      }
  })
  while(heap.top()) {
      let node = heap.pop()
      p.next = node
      p = p.next
      if (p.next) {
          heap.push(p.next)
      }
  }
  return head.next
};

class BinaryHeap {
  constructor() {
      this.heap = [0]
  }

  push(node) {
      this.heap.push(node)
      this.heapifyUp(this.heap.length - 1)
  }

  top() {
      return this.heap[1]
  }

  pop() {
      if (this.heap.length == 1) {
          return null
      }
      this.swap(1, this.heap.length - 1)
      let node = this.heap.pop()
      this.heapifyDown(1)
      return node
  }

  swap(i, j) {
      let temp = this.heap[i]
      this.heap[i] = this.heap[j]
      this.heap[j] = temp
  }

  heapifyUp(i) {
      while(i > 1) {
          let p = i >> 1
          if (this.heap[p].val > this.heap[i].val) {
              this.swap(p, i)
              i = p
          } else {
              break
          }
      }
  }

  heapifyDown(i) {
      let len = this.heap.length
      while(i < len) {
          let left = i << 1
          let right = (i << 1) + 1
          let child = left
          if (left > len - 1) break
          if (right < len && this.heap[right].val < this.heap[left].val) {
              child = right
          }
          if (this.heap[i].val > this.heap[child].val) {
              this.swap(i, child)
              i = child
          } else {
              break
          }
      }
  }
}
*/

// 分治的解法
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 var mergeKLists = function(lists) {
  let head = new ListNode()
  let p = head
  lists.unshift(0)
  let list = sort(lists, 1, lists.length - 1)
  return list
};

function sort(lists, l, r) {
  if (l > r) {
    // 处理 length 等于 0 的情况
    return null
  }
  if (l == r) {
      return lists[l]
  }
  if (r - l == 1) {
      // 两个合成一个
      return merge(lists[l], lists[r])
  }
  let mid = l +  ((r - l) >> 1)
  return merge(sort(lists, l, mid), sort(lists, mid + 1, r))
}

function merge(p1, p2) {
  let head = new ListNode()
  let p = head
  while(p1 || p2) {
      // console.log('merge', p1, p2)
      if (!p1 || !p2) {
          p.next = !p1 ? p2 : p1
          // console.log(head.next)
          return head.next
      }
      if (p1.val < p2.val) {
          p.next = p1
          p = p.next
          p1 = p1.next
      } else {
          p.next = p2
          p = p.next
          p2 = p2.next
      }
  }
  return head.next
}
