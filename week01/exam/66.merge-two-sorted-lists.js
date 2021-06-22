/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var mergeTwoLists = function(l1, l2) {
  // 主体思路 遍历链表，哪个小，就插入哪个，为空就插入另一个
  const HeadNode = new ListNode(null, null)
  let p = HeadNode
  while(l1 && l2) {
      if (l1.val > l2.val) {
          p.next = l2
          p = l2
          l2 = l2.next
      } else {
          p.next = l1
          p = l1
          l1 = l1.next
      }
  }
  if (l1) {
      p.next = l1
  }
  if (l2) {
      p.next = l2
  }
  return HeadNode.next
};
