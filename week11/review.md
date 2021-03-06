#课程总结

## 课程内容回顾

### 数组
线性连续的内存空间，支持随机访问  
时间复杂度:  
* 查询  O(1)
* 插入  O(n)
* 删除  O(n)
* 追加  O(1)
* 头部追加  O(n)

#### 边长数组
支持索引与随机访问，长度改变时会自动申请和释放空间，申请和释放空间需要拷贝数组    
空间申请: 空间不足是，申请一倍的空间
空间释放: 空间使用不足25%(阈值)时，释放一半

### 链表
#### 单链表
内存上不连续的内存空间，插入和删除的时间复杂度是O(1)  
相比数组，需要额外的节点存储空间，记录next节点  

#### 双向链表
在单链表基础上，节点还记录了 pre 节点

#### 时间复杂度:  
* 查询  O(n)
* 插入  O(1)
* 删除  O(1)
* 追加  O(1)
* 头部追加  O(1)

#### 保护节点
值为空的固定节点作为 Head 和 Tail，可以省去一些边界条件判断，简化代码实现

### 栈
内存连续，先进后出的数据结构，单不支持随机访问，只能从结构的顶部访问。  
支持操作:  push、pop、top  
时间复杂度均为 O(1)

### 队列
先进先出的数据结构，一般为连续的内存，单不支持随机访问，只能从结构的头部和尾部访问。  
支持操作:  push、pop、top  
时间复杂度均为 O(1)

#### 优先队列
相比普通数组，出队顺序按优先级排序。一般实现有： 二叉队、二叉平衡树等。  
时间复杂度:
* 访问 O(1)
* 插入 根据实现不同，一般为O(logN) 到 O(1)
* 出队  O(logN)

### 差分和前缀数组
前缀数组: 数据项为原数组累加和  
差分数组：数据项为原数组与前项的差

    元素组 A，前后嘴 S，差分数组B
    S[i] = S[i - 1] + A[i]  
    B[i] = A[i] - A[i -1]
    
    A[i] = S[i] - S[i - 1]  // 对前缀数组求差分
    A[i] = A[i - 1] + B[i]  // 对差分数组求前缀

    
前缀和与差分数组互为逆运算  
应用：  
* 前缀和可以用来计算区间和
    > sum[l ~ r] = S[r] - S[l - 1]

* 差分数组可以用来反映影响范围，合并多次区间操作
    > (B1 + B2 + B3) 求前缀

### 双指针扫描

### 单调栈
### 单调队列

### 哈希表

### 递归

### 分治

### 树
#### 二叉树 
* 满二叉树 
* 完全二叉树 
* 二叉搜素树
* 二叉队

##### 树的遍历
* 深度优先: 前序、中序、后续
* 广度优先: 层次遍历

#### 基环树
给树添加一条边，行程一个换，整个结构称为基环树

### 图
节点和边的集合
#### 图的存储
* 邻接矩阵
* 出边数组
* 邻接表

#### 图的遍历
* 深度优先(DFS)
* 广度优先(BFS)

#### 单源最短路径
* Bellman-Ford 算法:  
  扫描所有边迭代，用最短距离替换，直到没有变化为止  
  时间复杂度: O(nm)
* Dijkstra 算法:   
  基于贪心的扫描，每次扫描最小的  
  时间复杂度: O(m*log(n))  
  只能处理距离非负数的图

#### 所有节点最短路径
* Floyd 基于动态规划来求每一对节点的最短路径

dp[k, i, j] 表示经过编号不超过k的点位中继，从 i 到 j 的最短路径  
决策:  是否经过 k 这个中继节点

    dp[k, i, j] = min(dp[k-1, i, j], dp[k-1, i, k] + dp[k - 1, k, j])
    
初态: d 为邻接矩阵  
时间复杂度: O(n^3)



#### 最小生成树
* Kruskal算法  

### 二分
##### 查询前提:  

    * 目标函数具有单调性
    * 存在上下边界
    * 能通过索引访问

##### 二分写法:   
* 普通模板，mid = left + 1 or mid = right, stop: left == right
* 双侧不包含: mid = left + 1 or mid = right - 1, stop: left > right
* 双侧包含: mid = left or mid = right, stop: left + 1 == right

#### 三分查找

### 排序
* 比较排序算法：通过比较大小排序，证明时间复杂度下届为O(logN)
* 非比较类培训：不通过比大小来决定元素间的相对次序

#### 比较类排序
交换排序: 冒泡排序、快速排序
插入排序: 简单插入排序、希尔排序
选择排序: 简单选择排序、堆排序
归并排序: 二路归并排序、多路归并排序

#### 非比较排序
计数排序
桶排序
计数排序

### 贪心算法
* 每一步选择局部最优  
* 最终结果能达到全局最优

贪心算法不回头计算  
需要证明局部最优能最终达到全局最优  
能用贪心求解的题目，都能用搜索或动态规划求解

### 动态规划
* 重叠子问题
* 最优子结构
* 无后效性 —— 问题的状态空间是有向无环图  

动态规划一般采用地推的方式实现，也可以写成递归或搜索的形式，因为每个状态值遍历一次，也称之为记忆化搜索  

动态规划三要素: 阶段、状态、决策  

#### 动态规划的优化
* 分离 i 和 j，两者不同时影响，分别计算
* 观察内层循环j与外层循环i的取值有什么关系，减少 j 的遍历  


### 字符串处理
#### Rabin-karp 算法
基于hash的搞笑字符串搜索算法  
时间复杂度: O(n + m)  
计算hash值的时候可以利用前值计算  

hash计算: 
b = 131, 13331等大质数，减少冲突概率
p = 2^64，
把字符串看做是一个 b 进制的数，计算以p为模的值  

#### KMP 模式匹配
根据字串的性质，减少重复的对比  
根据模式串计算出 next 数组  
next[i] 数组表示模式串第i项结尾的字串与 模式串的前缀能匹配的最长长度

匹配过程: 在朴素的基础上，根据 next 来移动 j 的值

### 高级搜索
#### 搜素剪枝

#### 折半搜素

#### 双向搜索
从起点和目标两端搜索，减少不必要的叶子节点搜索。适用于节点分支数较大的问题。

#### 启发式搜索: A* 算法
借助估价函数来优先搜素最可能的路径

### 平衡二叉树
叶子节点深度相近的二叉搜索树  
#### 二叉搜索树
满足:
* 树中任何节点的左子树的所有节点小于该节点
* 树中任何节点的右子树的所有节点大于该节点

#### AVL 树

#### 红黑树

### 跳表
带有多层索引的链表，可以做到查询时间复杂度是 O(logn)

### 树堆 （Treap = Tree + Heap)
满足二叉搜索树，关键码满足： 左 <= 根 <= 右  
各项操作时间复杂度均为 O(logN)

### 树状数组
维护数组前缀和、区间和的数据结构  
通过 lowbit 作为索引来维护数组  

#### lowbit
lowbit(x) 二进制下最低位 1 和后面 0 组成的数值  
lowbit求值: lowbit(x) = x & -x  

#### 结构
树桩数组 c 的 c[x] 存储着前 lowbit(x) 个数据和  

    lowbit(7) = lowbit(111b) = 1  
    lowbit(12) = lowbit(1100b) = 100b = 4  

c[7] = a[7]
c[12] = a[9] + a[10] + a[11] + a[12]

#### 局限性
* 无法做区间修改
* 无法直接求最值

### 线段树
基于分支思想的二叉树结构，用于在区间上进行信息统计。
* 线段树每个点都代表一个闭区间
* 线段树具有唯一根节点，代表整个区间的统计范围，如[1, N]
* 线段树每个叶子节点都表示长度为1的区间[x, x]
* 对于每个内部节点[l, r]， 他的左子节点[l, mid]，右子节点是 [mid + 1, r]，其中 mid = (l + r) / 2 （向下取整）

去除树的最后一层，整棵树一定是完全二叉树  

由于最后一层不是连续的，保存线段树的数组长度不要小于 4N

#### 离散化
离散化就是把无穷集合中的若干个元素映射为有限集合以便于维护的方法

----

## 学习心得
### 要把知识归类
各种概念是很散乱的东西，链表、数组、前缀、单调、双指针、递归、分治、搜索、动态规划…… 上课之后，要自己消化吸收，要把这些概念整理好，区分各个概念所代表的是什么。比如链表、树这些都是数据结构；单调、分治这些是算法思想；递归、动态规划这些都是算法思想的实现方式。

### 不能拉下课程
只要有一次，说先缓一缓，等一等。就很容易松懈或者停止了，难再回到之前的状态。而且后面赶的时候会觉得很累。

### 笔记是很重要的
笔记还是很有用的，做笔记可以帮助整理知识点和理清思路。
做笔记的时候，都还记得笔记清楚，觉得不用记，但是过了一段时间，在看这块，就比较陌生。如果看到做笔记的那部分，就能很快唤起记忆。

### 要多刷题
“一看就会，一写就错”。经常在看的时候，以为懂了，但是有些细节，或者比关键的是没注意到了。在写的时候，问题就都暴露出来了。  
特别是视频里面没有发现

### 算法学习是持之以恒的
一段时间的学习，还是只能学到一部分，理解可能也不够深入，这是很容易忘记的。需要经常的复习，加深理解和记忆。  
另外，如果没有经过比较长一段时间的反复练习，很难训练出手感。  
坚持不懈的学习，才能不断的巩固提高。
