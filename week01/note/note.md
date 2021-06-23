# 笔记

## 做题方法
1. 总体思路和细节分开
2. 不要用算法套题
3. 从朴素发开始分析，然后去除冗余
4. 链表开头先新建一个空的头结点
5. 计算前要边界条件判断

## 数据结构
### 数组
    内存中连续的空间  

* 普通数组

    随机存取 O(1)  
    插入删除 O(n)  

* 变长数组

    可动态扩容  
    超过50%动态扩容  
    使用空间小于25%时自动回收50%  
    50%和25%不是准确值，两者相差是为了防止临界状态下多次扩容和释放


### 链表  
    可以在内存中不连续存储的节点序列，由指针进行链接  
    * 性能  
        存取 O(n)
        插入删除 O(1)
### 栈
    实现先进后出的数据结构，实现了pop() 和 push() 方法  
    只能存取栈顶元素

### 队列
    先进先出的数据结构

## 解题模板
1. 前缀数组  
    前缀数组是长度等于原数组，元素每前一项累加的结果  
    如：
    > 原数组 :   [1, 1, 1, 3, 2]
    > 前缀数组 : [1, 2, 3, 6, 8] 

    可以用来解决区间求和的问题
    模板:

    ```javascript
    var n = nums.length;
    nums.unshift(0);
    var s = new Array(n + 1).fill(0); // 下标0~n    
    for(let i = 0; i < n; i++) {
      s[i] = s[i - 1] + nums[i];
    }
    ```
2. 差分
    差分数组长度也等于原数组，每一项为元素组与前一项的差值  
    差分和前缀互为逆运算
    如:
    > 差分数组 :   [1, 0, 0, 2, -1]
    > 原素组 :     [1, 1, 1, 3 ,2]
    > 前缀数组 :   [1, 2, 3, 6, 8]
    
    对差分数组进行前缀计算，可以生成原数组
    前缀数组差分计算，可以得到原数组。  
    差分数组的元素值可以理解为对后续的影响，前缀为影响的结果。

    差分数组可以用来处理对区间的多次操作，多次操作只需计算操作两端，最后合并为一次前缀计算得出原数组

    ```javascript
    // LeetCode 1109 航班预订统计
    /** 
    * @param {number[][]} bookings 
    * @param {number} n 
    * @return {number[]} 
    * */
    var corpFlightBookings = function(bookings, n) {
      var delta = new Array(n + 2).fill(0);  // 差分要开0~n+1
      for (const booking of bookings) {
        let fir = booking[0];
        let last = booking[1];
        let seats = booking[2];   // 差分模板 
        // 可以理解为差分的值只代表影响，影响从first开始，last结束
        delta[fir] += seats;
        delta[last + 1] -= seats;
      }
      var a = new Array(n + 1).fill(0); // 0~n
      // 前缀计算得到原数组
      // 1~n
      for (let i = 1; i <= n; i++) a[i] = a[i - 1] + delta[i];
      // 0~n-1
      a.shift();
      return a;
    };
    ```

3. 单调栈
4. 双指针
