# leetcod算法题

## 1. 环形链表

给你一个链表的头节点 head ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。

如果链表中存在环 ，则返回 true 。 否则，返回 false 。

```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

```
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```

```
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```

思路：

- 这道题好像有点简单，就是循环判断链表，直到节点被重复出现
- 这道题坑点在于pos，pos可以指定从链表的某个节点开始，链表不再是从0开始遍历，所以这里不要通过判断最后一节点.next不为空判断是否为循环，因为你压根不知道哪个节点是最后一个节点

```javascript
var hasCycle = function(head) {
    let current = head;
    const set = new Set();
    while(current){
        if(set.has(current)){
            return true;
        }
        set.add(current);
        current = current.next;
    }
    return false;
};
```

优化占有空间，借鉴官方解答，使用快慢指针，当快指针等于慢指针，就是循环链表

```javascript
var hasCycle = function(head) {
    if(head === null || head.next === null){
        return false;
    }
    let current = head; //慢指针
    let next = head.next; // 快指针
    while(current != next){
        if(next === null || next.next == null){
            return false;
        }
        current = current.next;// 慢指针走一步
        next = next.next.next; // 快指针走两步
    }
    return true;
};

```

个人觉得肯定还有更加奇葩的实现方式，主要是leetcode这个题目描述太过玄幻了，pos我看了好久都没有明白是什么意思。我建议可以这么描述：

```
我们会从链表中从第pos个节点开始遍历验证你的算法是否能够验证head链表是环形链表，如：真实的head[1,2,3,4] 传入, pos=1，那么此时函数 传入的head为[2,3,4], 你需要判断head是否为环形链表。

```

## 2.删除排序链表中的重复元素

> 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回已排序的链表 。
> 
> 示例 1：
> 
> 输入：head = [1,1,2]
> 
> 输出：[1,2]
> 
> 示例 2：
> 
> 输入：head = [1,1,2,3,3]
> 
> 输出：[1,2,3]
>

思路：

1. 有序链表，那么只要有一个重复，那么直接`next`节点指向下一个即可


```typescript

class Solution {
    deleteDuplicate(head: LinkNode) : LinkNode{
        current = head
        if(head === null || current.next === null){
            return head;
        }

        while(current.next !== null){
            const nextNode = current.next;
            while(current.value === nextNode.value){
                current = nextNode;
                nextNode = current.next;
            }
            current = nextNode;
        }

        return head;
    }
}

```

## 3.合并两个有序链表

> 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例 1：
```
输入：l1 = [1,2,4], l2 = [1,3,4]

输出：[1,1,2,3,4,4]
```
示例 2：

```
输入：l1 = [], l2 = []
输出：[]
```
示例 3：
```
输入：l1 = [], l2 = [0]
输出：[0]
 ```

提示：

- 两个链表的节点数目范围是 [0, 50]
- -100 <= Node.val <= 100
- l1 和 l2 均按 非递减顺序 排列

思路：

** 递归思路 **
- 链表有序的，确定谁是第一个head节点
- 然后重复比较 剩余的链表 与 非第一个节点的链表，返回的节点 作为上一次比较得出节点的next
- 当然需要退出循环比较，就是当其中一个链表为null时候 直接返回非null的链表

** 循环思路 **
- 新建一个空链表，新建一个临时节点 = 空链表
- 将临时节点next节点指向比较两个链表较小节点，
- 同时将临时节点指向自身的next节点，形成链表结构
- 然后将较小链接节点下移到下一个next节点，直到其中一个链表为null
- 最后将临时节点的next节点指向非null的链表
- 返回空链接的next节点就是排序好的合并链表

```javascript
/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 var mergeTwoLists = function(list1, list2) {
    if(list1 === null || list2 === null){
        return list1 || list2;
    }
    // 判断谁是第一个节点，然后做递归比较，将下一个节点作为第一个节点比较
    if(list1.val > list2.val){
        const nextNode = list2.next;
        list2.next = mergeTwoLists(list1, nextNode);
        return list2;
    }else {
        const nextNode = list1.next;
        list1.next = mergeTwoLists(nextNode, list2);
        return list1;
    }
};
// @lc code=end


// 第二种解题思路 循环
var mergeTwoLists = function(list1, list2) {
    // 新建一个空链表
    let head = new ListNode(-1);

    // 空链表当前节点
    let current = head;
    while(list1 != null && list2 != null){
        // 比较大小，较小者移动到下个位置直到不为空,将空链表的下一个节点指向较小者链表节点
        if(list1.val > list2.val){
            current.next = list2;
            list2 = list2.next;
        }else{
            current.next = list1;
            list1 = list1.next;
        }
        // 将当前节点指向下一个节点，形成指向链表
        current = current.next;
    }

    current.next = list1 ===  null ? list2: list1;

    return head.next;
};
```

## 4. 合并K个升序链表

> Category	Difficulty	Likes	Dislikes
algorithms	Hard (55.85%)	2287	-
Tags
Companies
给你一个链表数组，每个链表都已经按升序排列。
请你将所有链表合并到一个升序链表中，返回合并后的链表。

> 示例 1：
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
```
[
  1->4->5,
  1->3->4,
  2->6
]
```
将它们合并到一个有序链表中得到。
`1->1->2->3->4->4->5->6`

> 示例 2：
> 
> 输入：`lists = []`
> 
> 输出：`[]`
> 
> 示例 3：
> 
> 输入：`lists = [[]]`
> 
> 输出：`[]`
> 提示：
- k == lists.length
- 0 <= k <= 10^4
- 0 <= lists[i].length <= 500
- -10^4 <= lists[i][j] <= 10^4
- lists[i] 按 升序 排列
- lists[i].length 的总和不超过 10^4

思路：
- 有了上一题的思路，就是通过循环计算出两个有序链表的合并
- 那么这一题的思路很简单，就是将当前数组链表拆分成两个为一组进行循环合并成一个链表，然后添加到一个新的链表数组中
- 接着继续对新的链表数组进行合并计算，直到数组的长度等于1
- 直接返回数组[0]，即可获得有序链表数组合并结果链表

假设每个链表的最长长度是 n，数组的长度是k,  那么第一次合并链表的， 合并动作k/2次， 合并两个链表时间代价为 O(n)， 那么第一次合并时间代价为O(k/2 * n ),
第二次合并动作次数为k/4, 合并两个链表时间代价为 O(n)， 第二次合并时间代价为O(k/4 * n )， 到了最后k次合并代价动作次数为1， 合并时间代价为O(1 * n )。

所以计算总时间代价为： O(k/2 * n ) + O(k/4 * n ) + ... O(1*n) = O(nk* (1/2 + 1 /4 + ... + 1)) = O(nk * log k)


时间复杂度为：`O(nk * log k)` 



```javascript
/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个升序链表
 */

// @lc code=start
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
    const len = lists.length;
    // 如果长度为0 直接返回null
    if(len <= 0){
        return null;
    }
    // 如果长度为1 直接返回第一个链表 即可结束递归
    if(len === 1){
        return lists[0];
    }
    const newList = []
    for(let i = 0;i<len;i+=2){
        // 拆成两个比较链表，按照21提的循环算法比较，构造新的合并有序链表
        const head = new ListNode(-1);
        let current = lists[i];
        let next = lists[i+1];
        let prev = head;
        while(current != null && next != null){
            if(current.val > next.val){
               prev.next = next
               next = next.next;
            }else{
                prev.next = current;
                current =current.next;
            }
            prev = prev.next;
        }
        prev.next = current === null ? next : current;
        // 取得两个合并升序链表 加到新的链表中, 如果是空链表不加入
        if(head.next){
            newList.push(head.next);
        }
    }
    // 采用递归方式继续比较合并 直到长度=1 返回
    return mergeKLists(newList);
};
// @lc code=end
```


## 5. 反转链表
给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

```
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
```

```
输入：head = [1,2]
输出：[2,1]
```

```
输入：head = []
输出：[]
```

提示：

- 链表中节点的数目范围是 [0, 5000]
- -5000 <= Node.val <= 5000

------

思路：
- 按照顺序思路，`[1,2,3]`中，将`1`节点作为，假设`current`前有个`prev`空节点
- 第一步，将`prev`节点`null`设置为`current`节点`1`的`next`节点
- 第二步，将`1`节点作为`next`节点`2`的`prev`节点
- 第三步，将`next`节点`2`赋值给为`current`节点
- 重复步骤1/2/3步骤，直到`current`节点为空
- 最终`prev`节点保存的就是反转后的链表了

```javascript
var reverseList = function(head) {
    if(!head || !head.next){
        return head;
    }

    // 当前节点
    let current = head;
    // 当前节点的前一个节点
    let prev = null;
    while(current){
        const next = current.next;
        // 将当前节点的下一个节点指向上一个节点
        current.next = prev;
        // 将当前节点作为下一个节点
        prev = current;
        // 将下一个节点作为当前节点
        current = next;
    }
    // 将反转后的节点返回
    return prev;
};
```

还有一种递归的思路，就是将最后移动到第一个，然后将原有链表最后一个删除，重复遍历链表。


```
// 这个复杂度很高 O(n^2) 应该还有优化的空间
var reverseList = function(head) {
    let current = head;
    let prevNode = null;
    let lastNode = null;
    while(current){
        const next = current.next; 
        if(!next){
            lastNode = current;
        }else{
            if(!next.next){
                prevNode = current;
            }
        }
        current =current.next;
    }
    if(!prevNode && !lastNode){
        return null;
    }
    if(!prevNode && lastNode){
        return lastNode;
    }
    // 删除掉最后一个节点
    prevNode.next = null;
    // 已经删除掉最后一个节点的链表
    lastNode.next = reverseList(head);
    
    return lastNode;
};
// @lc code=end

```

优化递归思路：
- 上一个递归算法主要拆分子问题的时候，还需要对剩余链表遍历
- 那么如果递归的时候不需要对链表遍历，只需要将子问题归纳到2个节点互换顺序，是不是可以解决了

```javascript
var reverseList = function(head) {
    // 遍历到只剩下一个节点 直接返回
    if(head === null || head.next === null){
        return head;
    }
    // 第1次回归 head = 5 ， newList = [5]
    // 第2次回归 head = [4, 5], 我们需要将反转两者的顺序，把4节点挪到5的后面，就是head.next.next = head, newList = [5,4 ]
    // 第3次回归 head = [3, 4], 因为在上一次回归中已经把4挪到最后一个节点了，所以这次只需要把3挪到4的后面 newList = [5,4, 3]
    // 第4次回归 head = [2 ,3], 同理3挪到2的后面 newList = [5,4, 3, 2]
    // 第5次回归 head = [1, 2], 同理2挪到1的后面，newList = [5,4, 3, 2, 1]
    const newList = reverseList(head.next);
    // 获取下一个节点
    const next = head.next;
    // 将head挪到下个节点后面
    next.next = head;
    // 同事将head的next置空
    head.next = null;

    return newList;
};

```


## 6. K 个一组翻转链表

给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

```
输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]
```

```
输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]
```

提示：
- 链表中的节点数目为 n
- 1 <= k <= n <= 5000
- 0 <= Node.val <= 1000

------

思路：

- 先将链表拆成K个子链表，建个指针，当等于K，拆出一个临时子链表`tempList`进行反转
- 新建新链表的第一个节点`firstNode`，以及临时链表最后一个节点`lastNode`
- 最后判断临时子链表是否为空，不为空则将最后一个节点`lastNode`的next节点指向`tempList`

PS：这样子设计代码比较冗余很多变量，看看优化方案

```javascript
var reverseKGroup = function (head, k) {
    if (head === null || head.next === null) {
        return head;
    }
    let current = head;
    let index = 1;
    let tempList = null;
    let lastNode = null;
    let firstNode = null;
    while (current) {
        if (index === 1) {
            tempList = current;
        }
        let next = current.next;
        if (index === k) {
            // 开始反转 切断链表
            current.next = null;
            let returncurrent = tempList;
            let prev = null;
            // 需要把prev的当成current的下个节点
            while (returncurrent) {
                const next = returncurrent.next;
                // 把前一个节点挪到当前节点后面
                returncurrent.next = prev;
                // 把当前节点当成前一个节点
                prev = returncurrent;
                // 把下个节点作为当前节点
                returncurrent = next;
            }
            if(lastNode !== null){
                lastNode.next = prev;
            }
            if (firstNode === null) {
                firstNode = prev;
            }
            // 反转完的节点为prev
            index = 0;
            tempList = null;
            // lastNode指向最后一个节点
            while (prev.next) {
                prev = prev.next;
            }
            lastNode = prev;
        }
        index++;
        current = next;
    }
    if (tempList) {
        lastNode.next = tempList;
    }

    return firstNode;

};

```

优化代码设计方案思路：

- 上面解决答案，新建很多变量，看起来比较难懂，将代码重新设计一下会比较简洁
  
```javascript

```

## 7. 旋转链表

给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。

```
输入：head = [1,2,3,4,5], k = 2
输出：[4,5,1,2,3]

输入：head = [0,1,2], k = 4
输出：[2,0,1]
```

思路：

1. 拆分两个问题，一个是将链表右移动，一个移动K次
2. 抽出链表像右移动函数，很简单，只需要将最后一节点放到第一个即可
3. 移动K次，可以简单计算一下，如果移动次数大于链表长度Len，即是移动链表的长度倍数，其实只需要移动 `K%Len` 次数

代码实现：

```javascript

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
旋转链表, 从第i个位置开始旋转
 */
var rotateNode = function (head) {
    if (head === null || head.next === null) {
        return head;
    }

    
    let current = head;
    let prevNode = null;
    while (current.next) {
        if(!current.next.next){
            prevNode = current;
        }
        current = current.next;
    }
    if(prevNode === current){
        current.next = head;
        head.next = null;
    }else{
        current.next = head;
        prevNode.next = null;
    }
    
    return current;
}
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

var rotateRight = function (head, k) {
    // 如果链表的长度小于k 那么只需要取k%len的余数旋转即可
    if (head === null || head.next === null ) {
        return head;
    }

    let current = head;
    let len = 0;
    while (current) {
        len++;
        current = current.next;
    }

    let minRotate = k;
    if (k > len) {
        minRotate = k % len;
    }
    let result = head;
    for (let i = 0; i < minRotate; i++) {
        result = rotateNode(result);
    }

    return result;
};
```

换一种思路，可以减少循环次数：

1. 如果是将链表向右移动K次，其实就是将链表倒数的第K个节点放到head节点，其余放到按照顺序衔接
2. 抽象的说，截取倒数第K个节点为temp，同时将head节点最后一个节点的next

```javascript
var rotateRight = function (head, k) {
    // 如果链表的长度小于k 那么只需要取k%len的余数旋转即可
    if (head === null || head.next === null || k === 0) {
        return head;
    }

    let current = head;
    let len = 0;
    while (current) {
        len++;
        current = current.next;
    }

    let minRotate = k;
    if (k > len) {
        minRotate = k % len;
    }
    const splitIndex = len - minRotate;
    if(splitIndex === 0 || minRotate === 0){
        return head;
    }
    current = head;
    let tempIndex = 0;
    let prevNode = null;
    let startNode = null;
    let lastNode = null;
    while(current){
        if(tempIndex === splitIndex - 1){
            prevNode = current;
        }
        if(tempIndex === splitIndex){
            startNode = current
        }
        tempIndex++;
        current = current.next;
        if(current && current.next === null){
            lastNode = current
        }
    }

    prevNode.next = null;
    lastNode.next = head;

    return startNode;
};
```

## 8.分隔链表
给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。

你应当 保留 两个分区中每个节点的初始相对位置。

```
输入：head = [1,4,3,2,5,2], x = 3
输出：[1,2,2,4,3,5]
```

```
输入：head = [2,1], x = 2
输出：[1,2]
```

思路：

1. 首先是要找出所有小于x值的节点，其次是按照原有的节点顺序进行依次插入到新的链表中并返回
2. 其实链表就两个操作，确定head，已经将节点插入准确的位置
3. 从现有的链表按照要求制造新的两个链表，符合要求和不符合要求
4. 同时将符合要求的链表的next节点指向不符合要求的链表


> PS： 如何快速构建一个新的链表？
> - 新建一个空节点 `current`，将空节点赋予给`head`节点, `let current = new ListNode(-1); const head = current;`
> - 如果新增一个节点，只需要操作： `current.next = newNode; current = current.next;`
> - 最终返回`head.next`就是一个新的链表


实现代码：

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */

var partition = function (head, x) {
    if (head === null || head.next === null) {
        return head;
    }

    let current = head;
    let rightNode = new ListNode(-1);
    const rightHead = rightNode;
    let notRightNode = new ListNode(-1);
    const notRightHead = notRightNode;
    while (current) {
        if (current.val < x) {
            rightNode.next = new ListNode(current.val);
            rightNode = rightNode.next;
        } else {
            notRightNode.next = new ListNode(current.val);
            notRightNode = notRightNode.next;
        }
        current = current.next;
    }
    if (rightHead.next === null) {
        return head;
    }
    if(notRightHead.next === null){
        return rightHead.next;
    }
    // 拼凑两个链表
    rightNode.next = notRightHead.next;
    return rightHead.next;
};
```



<!--  end -->