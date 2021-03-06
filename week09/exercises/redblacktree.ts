
enum Color {
  Red,
  Black
}


class RBNode {
  constructor(value: number = 0, parent: RBNode = Nil, left: RBNode = Nil, right: RBNode = Nil, color: Color = Color.Black){
    this.parent = parent;
    this.left = left;
    this.right = right;
    this.color = color;
    this.value = value;
  }

  color: Color = Color.Red; // 颜色

  parent: RBNode;
  left: RBNode;
  right: RBNode;
  value: number;

  toString(): string {
    if (this === Nil) {
      return '"nil"'
    }
    return `{"left":${this.left.toString()},"right":${this.right.toString()},"value":${this.value},"color":"${Color[this.color]}"}`
  }

  valueOf() {
    console.log('valueOf', this.value)
    return this.value;
  }
}

// 红黑树
class RBTree {
  /**
   * 
   * @param nil 哨兵
   */
  constructor(nil: RBNode) {
    this.nil = nil;
    this.root = nil;
  }
  root: RBNode;
  nil: RBNode;


  /**
   * 插入
   * @param node 节点
   */
  insert(node: RBNode) {
    const nil = this.nil;
    node.left = nil;
    node.right = nil;
    node.color = Color.Red;
    if (this.root === nil) {
      this.root = node;
      node.parent = nil;
      return node;
    }
    let x = this.root;
    while (1) {
      if (node.value > x.value) {
        if (x.right === nil) {
          x.right = node;
          node.parent = x;
          break;
        } else {
          x = x.right;
        }
      } else {
        if (x.left === nil) {
          x.left = node;
          node.parent = x;
          break;
        } else {
          x = x.left;
        }
      }
    }
    this._fix_insert(node);
    return node
  }

  /**
   * 左旋
   * @param node 
   */
  lRotation(x: RBNode) {
    if (x.right === this.nil){
      return
    }
    let p: RBNode = x.parent; // 父节点
    let y: RBNode = x.right;  // 右孩子
    // y 的左孩子变成 x 的右孩子
    x.right = y.left;
    if (y.left != this.nil) {
      y.left.parent = x;
    }
    // y 挂到原来 x 的位置
    y.parent = p;
    if (p === this.nil) {
      this.root = y;
    } else if (x === p.left) {
      p.left = y;
    } else {
      p.right = y;
    }
    // x 变味 y 的左孩子
    x.parent = y;
    y.left = x;
  }

  rRotation(x: RBNode) {
    if (x.left === this.nil) {
      return;
    }
    let p = x.parent;
    let y = x.left;
    // 挂 y 到 x 的位置
    if (p === this.nil) {
      this.root = y;
    } else if (x === p.left) {
      p.left = y;
    } else {
      p.right = y;
    }
    y.parent = p;
    x.parent = y;
    // y 的左孩子挂到 x 的有孩子
    x.left = y.right;
    if (y.right != this.nil) {
      y.right.parent = x;
    }
    y.right = x;
  }

  /**
   * 插入的修复
   */
  _fix_insert(z: RBNode) {
    // 三种情况
    while (z.parent.color === Color.Red) {
      if (z.parent.parent.left === z.parent) {
        let y = z.parent.parent.right;
        if (y.color === Color.Red) { // 情况1，变颜色
          y.color = Color.Black;
          z.parent.color = Color.Black;
          z = z.parent.parent;
          z.color = Color.Red;
        } else if (z.parent.right === z) {
          z = z.parent
          this.lRotation(z);
        } 
        else {
          z.parent.color = Color.Black;
          z.parent.parent.color = Color.Red;
          this.rRotation(z.parent.parent)
        }
      } else {
        let y = z.parent.parent.left;
        if (y.color === Color.Red) {
          y.color = Color.Black;
          z.parent.color = Color.Black;
          z = z.parent.parent;
          z.color = Color.Red;
        } else if (z.parent.left === z) {
          z = z.parent;
          this.rRotation(z)
        } 
        else {
          z.parent.color = Color.Black;
          z.parent.parent.color = Color.Red;
          this.lRotation(z.parent.parent)
        }
      }
    }
    this.root.color = Color.Black;
  }

  /**
   * 删除单个节点
   * @param z 
   */
  deleteNode(z: RBNode) {
    let y = z;
    let y_origin_color = y.color;
    let x;
    if (z.left === this.nil) {
      x = z.right;
      this._transition(z, z.right);
    } else if (z.right === this.nil) {
      x = z.left
      this._transition(z, z.left);
    } else {
      y = this.getMinimumNode(z.right);
      y_origin_color = y.color;
      x = y.right;
      y.left = z.left;
      y.left.parent = y;
      y.right = z.right;
      if (y === z.right) {
        y.right = x;
      } else {
        this._transition(y, x);
      }
      this._transition(z, y);
      y.color = z.color;
    }
    if (y_origin_color === Color.Black) {
      this._fix_deleteNode(x);
    }
  }

  /**
   * 将 y 替换到 z 的位置
   * @param z 
   * @param y 
   */
  _transition(z: RBNode, y: RBNode) {
    if (z.parent === this.nil) {
      this.root = y;
    } else if (z.parent.left === z) {
      z.parent.left = y
    } else {
      z.parent.right = y
    }
    y.parent = z.parent;
  }

  getMinimumNode(y: RBNode) {
    while (y.left !== this.nil) {
      y = y.left
    }
    return y
  }

  _fix_deleteNode(x: RBNode) {
    while (x.color === Color.Red || x.parent === this.nil) {
      if (x.parent.left === x) {
        let w = x.parent.right;
        if (w.color === Color.Red) {
          w.color = Color.Black;
          x.parent.color = Color.Red;
          this.lRotation(x.parent);
        } else if (w.left.color === Color.Black && w.right.color === Color.Black) {
          w.color = Color.Red;
          x = x.parent;
        } else if (w.left.color === Color.Red) {
          w.color = Color.Red;
          w.left.color = Color.Black;
          this.rRotation(w)
        } else {
          w.right.color = Color.Black;
          w.color = x.parent.color;
          this.lRotation(x.parent);
          x.parent.color = Color.Black;
          x = this.root;
        }
      } else {
        let w = x.parent.left;
        if (w.color === Color.Red) {
          w.color = Color.Black;
          x.parent.color = Color.Red;
          this.rRotation(x.parent);
        } else if (w.left.color === Color.Black && w.right.color === Color.Black) {
          w.color = Color.Red;
          x = x.parent;
        } else if (w.right.color === Color.Red) {
          w.color = Color.Red;
          w.right.color = Color.Black;
          this.lRotation(w)
        } else {
          w.color = w.parent.color;
          w.parent.color = Color.Black;
          w.left.color = Color.Black;
          this.rRotation(x.parent)
          x = this.root;
        }
      }
    }
    x.color = Color.Black;
  }

  

  /**
   * 打印树
   */
  print() {
    PrintFromTopToBottom(this.root, this.nil)
  }
  
}

const Nil: RBNode = new RBNode(); // 哑节点
Nil.left = Nil;
Nil.right = Nil;
Nil.parent = Nil;

const L: RBTree = new RBTree(Nil); // 新建一棵树

const TNode : RBNode = new RBNode();

L.insert(new RBNode(3))
L.insert(new RBNode(10))
L.insert(new RBNode(13))
L.insert(new RBNode(20))
L.insert(new RBNode(20))
L.insert(new RBNode(20))
L.insert(new RBNode(7))
L.insert(new RBNode(28))
L.insert(new RBNode(12))
let temp = L.insert(new RBNode(21))

L.deleteNode(temp);

L.print();
console.log(L.root.toString())

function PrintFromTopToBottom(root: RBNode, nil: RBNode) {
  var queue: RBNode[] = [];
  queue.push(root);
  var result: number[] = [];

  if (root == null) {
      return result;
  }
  while (queue.length) {
    var temp = queue.shift();
    // console.log()
    if (temp) {
      result.push(temp.value);
      if (temp.left !== nil) {
        queue.push(temp.left);
      }
      if (temp.right !== nil) {
        queue.push(temp.right);
      }
    }
  }
  console.log(result);
  return result;
}

