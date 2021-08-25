/**
 * @param {number[][]} positions
 * @return {number[]}
 */
 var fallingSquares = function(positions) {
  const pointsSet = new Set()
  positions.forEach(item => {
      pointsSet.add(item[0]);
      pointsSet.add(item[0] + item[1]);
  })
  const points = Array.from(pointsSet).sort((a, b) => a - b)
  const pointTable = Object.create(null)
  points.forEach((point, index) => {
      pointTable[point] = index + 1
  })
  const nums = Array(points.length + 1).fill(0)
  const tree = new SegmentTree(nums)
  const ans = []
  for (let i = 0; i < positions.length; i++) {
      const left = pointTable[positions[i][0]]
      const right = pointTable[positions[i][0] + positions[i][1]] - 1
      const height = positions[i][1] + tree.Query(left, right)
      if (left == right) {
          tree.Change(left, height)
      } else {
          tree.changeRange(1, left, right, height)
      }
      
      ans.push(tree.a[1].max)
  }
  return ans
};

function SegmentTree (nums) {
let n = nums.length;
this.a = Array(nums * 4);
this.build(1, 0, n - 1, nums);
};

SegmentTree.prototype.Change = function (index, val) {
this.change(1, index, val);
};

SegmentTree.prototype.Query = function (left, right) {
return this.query(1, left, right);
}; // 递归建树

SegmentTree.prototype.build = function (curr, l, r, nums) {
this.a[curr] = { 
  l: l, 
  r: r, 
  mark: 0, 
  max: 0 
}; // 递归边界：叶子
if (l == r) {
  this.a[curr].max = nums[l];
  return;
}
let mid = (l + r) >> 1; // 分两半，递归
this.build(curr * 2, l, mid, nums);
this.build(curr * 2 + 1, mid + 1, r, nums); // 回溯时，自底向上统计信息
this.a[curr].max = Math.max(this.a[curr * 2].max, this.a[curr * 2 + 1].max);
}; // 单点修改：先递归找到，然后自底向上统计信息

SegmentTree.prototype.change = function (curr, index, val) {
// 递归边界：叶子[index, index]
if (this.a[curr].l == this.a[curr].r) {
  this.a[curr].max = val;
  return;
}
this.spread(curr);
let mid = (this.a[curr].l + this.a[curr].r) >> 1;
if (index <= mid) this.change(curr * 2, index, val);
else this.change(curr * 2 + 1, index, val);
this.a[curr].max = Math.max(this.a[curr * 2].max, this.a[curr * 2 + 1].max);
}; // 递归求区间和

// 完全包含：直接返回
// 否则：左右划分
SegmentTree.prototype.query = function (curr, l, r) {
// 查询的是  [l     ,     r]
// curr结点是[a[curr].l, a[curr].r]
// l  a[curr].l  a[curr].r  r
if (l <= this.a[curr].l && r >= this.a[curr].r) return this.a[curr].max;
this.spread(curr);
let mid = (this.a[curr].l + this.a[curr].r) >> 1;
let ans = 0;
if (l <= mid) ans = this.query(curr * 2, l, r);
if (r > mid) ans = Math.max(this.query(curr * 2 + 1, l, r), ans);
return ans;
}; // 区间修改

SegmentTree.prototype.changeRange = function (curr, l, r, value) {
// 完全包含
if (l <= this.a[curr].l && r >= this.a[curr].r) {
  // 修改这个被完全包含的区间的信息
  this.a[curr].max = value; // 子树不改了，有bug，标记一下
  this.a[curr].mark = value;
  return;
}
this.spread(curr);
let mid = (this.a[curr].l + this.a[curr].r) >> 1;
if (l <= mid) this.changeRange(curr * 2, l, r, value);
if (r > mid) this.changeRange(curr * 2 + 1, l, r, value);
this.a[curr].max = Math.max(this.a[curr * 2].max, this.a[curr * 2 + 1].max);
};

// 用到子树时，修复mark
SegmentTree.prototype.spread = function (curr) {
if (this.a[curr].mark != 0) {
  // 有bug标记
  this.a[curr * 2].max = this.a[curr].mark;
  this.a[curr * 2].mark = this.a[curr].mark;
  this.a[curr * 2 + 1].max = this.a[curr].mark;
  this.a[curr * 2 + 1].mark = this.a[curr].mark;
  this.a[curr].mark = 0;
}
};

