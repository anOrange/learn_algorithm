/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
 var buildTree = function(inorder, postorder) {
  return build(inorder, 0, inorder.length - 1, postorder, 0, postorder.length - 1)    
};

function build(inorder, l1, r1,
             postorder, l2, r2) {
  // console.log(l1, r1, l2,r2)
  if (r2 < l2) return null
  let node = new TreeNode(postorder[r2])
  let mid = 0
  while(postorder[r2] != inorder[mid]) mid++
  const leftLen = mid - l1
  node.left = build(inorder, l1, mid - 1, postorder, l2, l2 + leftLen - 1)
  node.right = build(inorder, mid + 1, r1, postorder, l2 + leftLen, r2 - 1)
  return node
}
