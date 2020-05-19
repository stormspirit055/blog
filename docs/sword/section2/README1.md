---
sidebarDepth: 2
---
# 3.3 代码的完整性

## 面试题16 数值的整数次方
##### 题目
实现函数double Power(double base, int exponent)，求base的exponent次方。不得使用库函数，同时不需要考虑大数问题。
##### 思路
斐波那契数列, 求Power(2,4) => Power(2,2) * Power(2, 2), Power(2, 3) = Power(2, 2) * 2

 * 输入:
  
  > Power(2, 3)
  
 * 输出:

  > 8
##### 代码
```js
const myPow = function(base, exponent) {
  if (exponent == 0) return 1
	if (exponent === 1) return base
	let flag = false
	if (exponent < 0) {
		exponent = -exponent
		flag = true
  }
  let result = myPow(base, Math.floor(exponent / 2))
  // 也可以用位运算, 但是位运算要考虑边界问题 2147483648 >> 1 === -1073741824
  let result = myPow(base, exponent === 2147483648 ? 1073741824 : exponent >> 1)
	result *= result
	if(exponent & 0x1 === 1) result *= base
	return flag ? (1 / result) : result
};
// 也可以将 Power(2, 4) => Power(4, 2), Power(2, 3) => Power(2, 2) * 2
const myPow = function(base, exponent) {
    if (exponent === 0) return 1
    if (exponent < 0) return 1 / myPow(base, -exponent)
    if (exponent & 0x1) return base * myPow(base, exponent - 1)
    return myPow(base * base, exponent/2);
};
```

## 面试题17: 打印从1到最大的n位数
##### 思路
需考虑大数问题, 不能简单的做循环加法, 需用字符串模拟加法, 也可以用递归方式,遍历所有的排列组合
##### 代码
```js
const printNumbers = function(n) {
    let str = []
	for(let i = 0; i <= n; i++) {
		str.push(0)
	}
    const res= []
	while(str[0] === 0) {
		let flag = 1
		print(str, n, res)
		for(let i = n; i >= 0; i--) {
			if (str[i] === 9 && flag) {
				str[i] = 0 
				flag = 1
			} else {
				str[i] += flag
				flag = 0
			}
			
		}
	}
    return res
};
function print(arr, n, res) {
	arr = arr.slice()
	for( let i = 0; i <= n ; i++) {
		if (arr[i] !== 0) {
			res.push(+arr.join(''))
			return 
		}
		arr[i] = ''
	}
}
// 也可以用递归
var printNumbers = function(n) {
    let str = []
	for(let i = 0; i <= n; i++) {
		str.push(0)
	}
    const res= []
	for(i = 0; i < 10;i++) {
		str[n] = i
		res.push(str.slice())
		
	}
	const result = []
	recursion(res, 1 ,n).forEach(v => {
		print(v, n, result)
	})
	return result
	
};
function recursion(res, index, n) {
	if (index === n) return res
		let length = res.length
		for(let j = 1; j < 10; j++) {
			for(let i = 0; i < length; i++) {
				let str = res[i].slice()
				str[n-index] = j
				res.push(str)
			}
		}
		return recursion(res, index + 1, n)
}
function print(arr, n, res) {
	arr = arr.slice()
	for( let i = 0; i <= n ; i++) {
		if (arr[i] !== 0) {
			res.push(+arr.join(''))
			return 
		}
		arr[i] = ''
	}
}
```

## 面试题18 删除链表的节点
##### 题目
给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。
 * 输入:
  
  > head = [4,5,1,9], val = 5
  
 * 输出:

  > [4,1,9]

  * 解释:

  > 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.

##### 思路
需删除的节点不是末节点时, 可以用替换法, 及顺序查找到需删除节点后, 将该节点的```next```节点覆盖到该节点上, 当需删除的节点是末节点时, 只能顺序查找到该节点的前一个节点, 并将```next``` 置为```null```
##### 代码
```js
function deleteNode(head, val) {
	let p = head
	while(p) {
		if (p.val === val) {
			if (p.next) {
				p.next = p.next.next
				p.val = p.next.val
			} else {
				let left = null
				p = head
				while(p.next) {
					left = p
					p = p.next
				}
				left.next = null
			}
			break;
		} else {
			p = p.next
		}
	}
}
```


## 面试题18-2 删除链表中重复的节点
##### 题目
给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
##### 思路
重点是排序列表, 所以只要比较前后两个节点是否相同即可, 用双指针的方法做
##### 代码
```js
function deleteDuplicates(head) {
  if (head === null || head.next === null  )return head
  let now = head
  let next = now.next
  while(next) {
    if (now.val === next.val) {
      now.next = next.next
      next = now.next
    } else {
      now = next
      next = next.next
    }
  }
  return head
}
```
## 面试题21 调整数组顺序使奇数位于偶数前面
##### 题目
输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。
##### 思路
熟悉的双指针!
##### 代码
```js
function reorderOddEven(arr) {
	let start = 0
	let end = arr.length - 1
	while(end > start) {
		if ((arr[start] + 1) & 0x1 && arr[end] & 0x1) {
			let num = arr[end]
			arr[end] = arr[start]
			arr[start] = num
			start++ 
			end--
		} else{
			arr[start] & 0x1 && start++
			(arr[end] + 1) & 0x1 && end--
		}
	}
	return arr
}

```
## 面试题22 链表中倒数第k个节点
##### 题目
输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。
 * 输入:
  
  > head = [1, 2, 3, 4, 5], k = 2
  
 * 输出:

  > [4, 5]
##### 思路
用双指针, 单次循环即可搞定
##### 代码
```js
var getKthFromEnd = function(head, k) {
  if (!head || !k) return null
	let index = 0
	let p = head
	let res = head
	while(p) {
        p = p.next
		if (index >= k) {
      res = res.next
		}
        index++
    }
    return res
};
```

## 面试题23: 链表中环的入口节点
##### 题目
给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

##### 思路
1. 快慢双指针来判断该链表中有没有环
2. 根据一个在环中的节点, 能得出环的节点数
3. 双指针得出环的入口节点

##### 代码
```js
var detectCycle = function(head) {
  if (!head) return null
  let fast = head
	let slow = head
	let flag = false
	while(fast && fast.next) {
    // 让一个指针每次跑2格, 另一个指针每次跑一格, 如果跑一格的指针追上了跑两格的指针, 则说明链表中有环
		fast = fast.next.next
    slow = slow.next
    //当fast 与 slow 相遇时, 跳出循环
		if (fast === slow) {
			flag = true
			break;
		} 
	}
	if (!flag) return null
	let count = 1
  let meetNode = fast.next
  // 因为fast是在环内, 所以指针一直next, 最终会回到自身, 就能得出环的长度
	while(meetNode !== fast) {
		meetNode = meetNode.next
		count++
	}
	let index = 1
	fast = head.next
  slow = head
  //因为未知链表总长度, 可以用双指针, 先让fast 跑 count + 1 距离, 然后fast, slow 一起跑, 直到fast和slow相遇, 即环的入口
	while(fast !== slow){
		fast = fast.next
		index++
		if (index >= count + 1){
			slow = slow.next
		}
	}
  return fast
};
  // 还有另外一种方法, 可以通过等式计算
  // 设快指针速度为2, 慢指针速度为1, 环长y, 除环部分为x, 运动次数为t
  // 当快慢指针相遇时, 快指针: 2t, 慢指针1t, 2t = x + y + t - x => t = y, 及循环次数等于环长
  // 所以可以把第二个和第三个while集成到第一个while中去
var detectCycle = function(head) {
  let slow = head, fast = head;
  while(fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (fast === slow) {
          let start = head;
          while (start !== fast) {
              start = start.next;
              fast = fast.next;
          }
          return fast;
      }
  }
  return null;
};

```
## 面试题24: 反转链表
##### 题目
反转一个单链表
##### 思路
递归和迭代两种方案
##### 代码
```js
// 递归
function reverseList(head) {
	if (!head) return null
	recursive(null, head)	
}
function recursive(prev, cur) {
	cur.next = prev
	if (cur.next) {
		return recursive(cur, cur.next)
	} else {
		return cur
	}
}
//迭代
function reverseList(head) {
	if (!head) return null
	let p = head
	let prevNode = null
	let nextNode = head.next
	while(p.next) {
		nextNode = p.next
		p.next = prevNode
		prevNode = p
		p = nextNode
	}
	p.next = prevNode
	return p
}
```
##### 性能
###### 递归
* 时间复杂度: O(n)
* 空间复杂度: O(1)
###### 迭代
* 时间复杂度: O(n)
* 空间复杂度: O(1)

## 面试题25: 合并两个排序的链表
##### 题目: 
输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。
##### 代码: 
```js
function mergeTwoLists(l1, l2) {
  if (!l1) return l2
  if (!l2) return l1
  if (l1.val > l2.val) {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  } else {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  }
} 
```
##### 性能
* 时间复杂度: O(n)
* 空间复杂度: O(1)

## 面试题26: 树的子结构
##### 题目
输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

B是A的子结构， 即 A中有出现和B相同的结构和节点值。
##### 思路
先遍历A树结构, 然后挨个对A的节点与B树的根节点做对比, 如果匹配的上, 则做递归判断
##### 代码
```js
function isSubStructure(A, B) {
  if (!A || !B) return false
  const quque = [A]
  let flag = false
  while(quque.length) {
    const node = quque.pop()
    if (node.val === B.val) {
      flag = AhasB(node, B)
      if (flag) return true
    }
    node.left && quque.push(node.left)
    node.right && quque.push(node.right)
  }
  return false
}
function AhasB(A,B) {
  if (!A && !B) return true
  if (!A) return false
  if (!B) return true
  if (A.val !== B.val) return false
  if (A.val === B.val) {
    return AhasB(A.left, B.left) && AhasB(A.right, B.right)
  }
}
```
##### 性能
* 时间复杂度: 不清楚
* 空间复杂度: 不清楚