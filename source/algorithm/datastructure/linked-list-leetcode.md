# 常见面试问题

## 1.删除排序链表中的重复元素

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

## 2.合并两个有序链表

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

## 3. 合并K个升序链表

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


## 4. 反转链表
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
- 顺序算法的话，找到前一个prev的节点，并将当前的节点与之替换


## 5. K 个一组翻转链表

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

- 按照顺序算法，定一个指针数字，然后空的数组保存链表值，同时新建一个空的反转链表
- 链表移动到下一个，指针加1，当指针=k的时候，将数组从尾到头输出到反转链表中
- 


## 数学常识——对数 

$$ log K $$, 指的是对数k，百度百科定义如下：

> 在数学中，对数是对求幂的逆运算，正如除法是乘法的逆运算，反之亦然。  这意味着一个数字的对数是必须产生另一个固定数字（基数）的指数。
>
> 如果a的x次方等于N（a>0，且a≠1），那么数x叫做以a为底N的对数（logarithm），记作$$ x=log_aN $$。其中，a叫做对数的底数，N叫做真数。 


简单用公式来描述： $$a^x=N$$, 如果为了得出x的值，可以用表达式 $$ x=\log_aN $$， a是对数的底数， N是真数， 通常我们定义当a=2的时候，忽略不写底数a，比如$$2^x=N$$，可以简写为 $$log N$$

还有一些其他对数简写：

- log以e为底，以x为真数， 可以写作：$$ log_ex = ln x $$
- log以10位底，以x为真数， $$ log_{10}x =lg x $$


## 数学常识——常数e

> `e`代表是数学常数e, 是自然对数的底数
> 自然对数是以e为底的对数函数，e是一个无理数，约等于2.718281828

更加简单的说，假如你有1块钱，银行抽风了一年利率100%，如果一年结算一次，

- 一年后就能得到1×(1+1)=2块钱
- 如果半年结算一次，上半年的计息计入下半年的本金，一年后就能得到1×(1+0.5)×(1+0.5)=1×(1+0.5)=2.25块钱。这样就多出了两毛五。
- 如果像余额宝一样，每天都结算利息，那么一年后你就能得到 $$ 1*(1+1/365)^365=2.7145674550 $$
- 比一年结算一次多了 七毛多
- 那么，如果每一秒结算一次，或者每一毫秒结算一次，或者每过无穷短的时间结算一次。那么钱岂不是可以一直加下去？x代表结算次数， 计算公式： $$ {lim_{x \to \infty} (1+1/x)^x}$$

答案是否定，最终一年后我们能得到的钱最多只能是约等于2.71828182845904523536，也就是`e`。

综上，e的含义可以理解为增长的极限，“自然常数”的“自然”也可以理解为它是非人为的，我们只是发现了它。就像圆周率π一样，它也存在于生活的很多地方。
