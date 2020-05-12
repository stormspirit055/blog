---
sidebarDepth: 2
---

# 2.3 数据结构

## 面试题3: 数组中重复的数字

##### 题目1:
 在一个长度为n的数组里的所有数字都在 0~n-1的范围内. 数组中某些数字是重复的, 但不知道有几个数字重复以及每个数字重复的次数. 请找出数组中任意一个重复的数字
 * 输入:
  
  > [2, 3 ,1 ,0 ,2 ,5 ,3]
  
 * 输出:

  > 2 或者 3

##### 思路: 

通过映射map来判断重复的值, 但这需要声明额外的对象来占用内存空间. 因为数组本身有自增下标, 所以可以利用数组本身来取代声明的对象.长度为n, 范围会0~n-1的数组, 若没有数字重复, 排序后元素下标等于元素的值, 所以只需从头遍历, 将第i个数字m(```arr[i])``` 与 ```arr[m]```进行比较, 若不一致则换位置, 若一致 则找到了重复的数字


##### 代码
``` js
const list = [1,7,3,4,3,2,6,5]
function findDuplicate(list){
	for(let i = 0;i < list.length; i++) {
		while(i !== list[i]) {
			let cur = list[i]
			let middle = list[cur]			
			if (cur === middle) return cur
			list[i] = middle
			list[cur] = cur
		}		
	}
	return false
}
console.log(findDuplicate(list))   //3
```
##### 性能
* 时间复杂度: O(n)
* 空间复杂度: O(1)

##### 题目2:
 在一个长度为```n + 1```的数组里的所有数字都在 ```1 ~ n```的范围内. 数组中某些数字是重复的, 但不知道有几个数字重复以及每个数字重复的次数. 请找出数组中任意一个重复的数字 (不改变数组)

##### 思路: 

取中间值二分法, 如果```start ~ middle``` 的长度大于```middle - start + 1```, 说明这段中有重复的数字, 循环计算, 直到```start === end```, 再根据其长度判断是否有重复值

##### 缺点

该方法不能找出所有重复的数字

##### 代码: 
``` js
	const list = [1,7,4,3,2,2,6,5]
	function findDuplicate(list){
		let start = 1
		let end = list.length - 1
		while(end >= start) {
			let middle = ((end - start) >> 1) + start
			let count = countNum(list, start, middle)
			console.log(count)
			if (start === end ) {
				if (count > 1) {
					return start
				} else {
					return -1
				}
			}
			if (count > (middle - start + 1)) {
				end = middle
			} else {
				start = middle + 1
			}
		}
		return -1
	}
	function countNum(list, start, end) {
		let count = 0
		for(let i = 0; i < list.length; i++) {
			if (list[i] <= end && list[i] >= start) {
				count++
			}
		}
		return count
	}
	console.log('结果:' + findDuplicate(list))
```
##### 性能
* 时间复杂度: O(nlogn)
> 二分法, 需要执行logn次, 每次需要O(n)的时间
* 空间复杂度: O(1)


## 面试题4: 二维数组中的查找

##### 题目

在一个二维数组中, 每一行都按照从左到右递增的顺序排序, 每一列都按照从上到下递增的顺序排列. 完成一个函数, 输入这样的一个二维数组和一个证书, 判断数组中是否含有该整数

##### 思路

* 从右上角(左边比角小, 下边比角大)或左下角(右边比角大, 上边比角小)切入, 这样每次比较都能过滤一列或一行, 缩小范围
* 边界考虑: 当前值小于目标值, 且在二维数组最右一列时, 返回false,当前值大于目标值, 且在二维数组最底下一列时, 返回false

##### 代码
```js
const arr = [[1, 2,8, 9], [2, 4, 9, 12], [4, 7 ,10, 13], [6 ,8 ,11, 15]]
function find(list, num) {
	if (!list.length) return false
	// 从左下角开始比
	let i = list[0].length - 1
	let j = 0
	let jMax = list.length - 1
	while(true) {
		if (list[i][j] === num) return true
		if (list[i][j] < num) {
			if (j == jMax) return false // 当当前数小于目标数, 且已经在二维数组的最右端时, 返回false
			j++
		}
		if (list[i][j] > num) {
			if (i == 0) return false // 当当前数大于目标数, 且已经在二维数组的最下端时, 返回false
			i--
		}
	}
 return false

}
console.log(find(arr, 7)) // true
```
##### 性能
* 时间复杂度: O(n + m)
* 空间复杂度: O(n*m)


## 树: 前中后序遍历

##### 前序递归遍历

```js
const result = []
function recursionPreorderTraversal(root) {
	if (root) {
		result.push(root.value)
		root.left && recursionPreorderTraversal(root.left)
		root.right && recursionPreorderTraversal(root.right)
	}
} 
```
##### 前序递归非遍历
```js
function preorderTraversal(root) {
	const result = []
	if (root) {
		const stack = []
		while(root || stack.length) {
			result.push(root.value)	 // 先访问根节点
			root.right && stack.push(root.right) // 先存右子树, 后访问
			root.left && stack.push(root.left) // 后存左子树, 先访问
			root = stack.pop()
		}
	}
	return result
} 
```
##### 中序递归遍历

```js
const result = []
function recursionInorderTraversal(root) {
	if (root) {
		root.left && recursionPreorderTraversal(root.left)
		result.push(root.value)
		root.right && recursionPreorderTraversal(root.right)
	}
} 
```
##### 中序非递归遍历
```js
function inorderTraversal(root) {
	const result = []
	if (root) {
		const stack = []
		while(root || stack.length) {
			if (root) {
				stack.push(root)
				root = root.left
			} else {
				root = stack.pop()
				result.push(root.value)
				root = root.right
			}
		}
	}
	return result
} 
```

##### 后序递归遍历

```js
const result = []
function recursionPostorderTraversal(root) {
	if (root) {
		root.left && recursionPreorderTraversal(root.left)
		root.right && recursionPreorderTraversal(root.right)
		result.push(root.value)
	}
} 
```

##### 后序非递归遍历
```js
// 后序非递归的核心逻辑是要确认遍历完左子树和右子树后再输出根节点, 并且在遍历完左子树后, 要将该树删除防止, 反复遍历
// 同时需要声明一个临时变量来保存上一个访问的节点, 当走到判断是否存在root.right的时候, 需要同时判断root.right是不是上一个访问的节点, 已防止反复遍历
function postorderTraversal(root) {
	const result = []
	if (root) {
		const stack = []
		let temp
		while(root || stack.length) {
			if (root.left) {
				stack.push(root)
				root = root.left
			} else if (root.right && root.right !== temp) {
				 stack.push(root)
				 root = root.right
			} else {
				temp = root
				result.push(root.value)
				root = stack.pop()
				root && (root.left = null) 
			}
		}
	}
	return result
}
```

## 面试题7: 重建二叉树

##### 思路:  根据前序遍历序列找到根节点的值, 再根据中序遍历序列找到左右子树, 递归执行, 生成二叉树

```js
function reConstructTree(pre, inorder) {
	if (pre.length === 0 || inorder.length === 0) {
			return null
	}
	let root = pre[0]
	const index = inorder.indexOf(root)
	let left  = inorder.slice(0, index)
	let right = inorder.slice(index + 1)
	return {
		value: root,
		left: reConstructTree(pre.slice(1, index+1), left),
		right: reConstructTree(pre.slice(index+1), right),
	}
}

```