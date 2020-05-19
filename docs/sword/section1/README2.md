---
sidebarDepth: 2
---

# 2.4 算法和数据操作

## 面试题10: 斐波那契数列

##### 题目1: 求斐波那契数列的第n项

##### 思路
* 递归效率过低不是最优解

##### 代码
```js
function fibonacci(n) {
  if (n < 0) return 0
  let target = 0, number1 = 0, number2 = 1;
  if (n === 1) return 0
  if (n === 2) return 1
  for (let i = 2; i <= n; i++) {
    target = number1 + number2
    number1 = number2
    number2 = target
  }
  return target
}
```
##### 性能
* 时间复杂度: O(n)
* 空间复杂度: O(n)

##### 题目2: 青蛙跳台阶问题
一只青蛙一次可以跳上1级台阶, 也可以跳上2级台阶, 求该青蛙跳上一个n级台阶总共有多少种跳法

##### 思路:

n = 1 时, 一种方法, n = 2 时, 两种方法, n > 2 时, 将n 拆成 先走1阶, 再走```n-1```阶 和 先走2阶, 再走 ```n - 2```阶, 即```f(n) = f(n - 1) + f(n - 2)```

##### 代码: 
```js
function fibonacci(n) {
  if (n < 0) return 0
  if (n === 1) return 1
  if (n === 2) return 2
  let target = 0, number1 = 1, number2 = 2;
  for (let i = 3; i <= n; i++) {
    target = number1 + number2
    number1 = number2
    number2 = target
  }
  return target
}
```
##### 性能
* 时间复杂度: O(n)
* 空间复杂度: O(n)

# 2.4.2 查找和排序

## 冒泡排序

##### 代码
```js
function bubbleSort(arr) {
	const { length } = arr
	let isSwap
	for(let i = 0; i < length; i++) {
		isSwap = false
		for(let j = 0; j < length - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				isSwap = true
			}
		}
		if (!isSwap) {
			return arr
		}
	}
	return arr
}
```
##### 性能
* 时间复杂度: O(n^2)
* 空间复杂度: O(1)

## 选择排序

##### 代码
```js
function selectSort(arr) {
	const { length } = arr
	let minIndex = 0
	for (let i = 0; i < length; i++) {
		minIndex = i
		for (let j = i; j < length; j++) {
			if (arr[minIndex] > arr[j]) minIndex = j
		}
		[arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
	}
	return arr
}
```
##### 性能
* 时间复杂度: O(n^2)
* 空间复杂度: O(1)

## 插入排序

##### 代码
```js
function insertSort(arr) {
	const { length } = arr
	for(let i = 1; i < length; i++) {
		let j = i
		let temp = arr[i]
		while(temp < arr[j - 1] && j > 0) {
			arr[j] = arr[j - 1]
			j--
		}
		arr[j] = temp
	}
	return arr
}
```
##### 性能
* 时间复杂度: O(n^2)
* 空间复杂度: O(1)

## 归并排序

##### 代码
```js
function mergeSort(arr) {
	const { length } = arr
	if (length > 1) { 
		const middle = Math.floor(length / 2)
		const left = mergeSort(arr.slice(0, middle))
		const right = mergeSort(arr.slice(middle, length))
		arr = merge(left, right)
	}
	return arr
}
function merge(left, right) {
	const result = []
	let i = 0
	let j = 0
	while(i < left.length && j < right.length) {
		result.push(left[i] < right[j] ? left[i++] : right[j++])
	}
	return result.concat(i < left.length ? left.slice(i) : right.slice(j))
	
}
```
##### 性能
* 时间复杂度: O(nlogn)
* 空间复杂度: O(n) 
> 声明了一个辅助一维数组, 所以空间复杂度O(n)

## 快速排序
##### 代码
```js
function quickSort(arr) {
	return __quickSort(arr, 0, arr.length - 1)
}
function __quickSort(arr, left, right) {
	if (arr.length > 1) {
		let index = partition(arr, left, right)
		if (index - 1 > left) {
			__quickSort(arr, 0, index - 1)
		} 
		if (index < right) {
			__quickSort(arr, index, right)	
		}
	}
	console.log(arr)
	return arr
}
function partition(arr, left, right)  {
	let povit = arr[Math.floor((left + right) / 2)]
	while(left <= right) {
		while(arr[left] < povit) {
			left++
		}
		while(arr[right] > povit) {
			right--
		}
		if (left <= right) { 
			// console.log('arr', arr);
			[arr[left], arr[right]] = [arr[right], arr[left]]
			left++
			right--
		}	
	}
	return left
}
```
##### 性能
* 时间复杂度: O(nlogn)
* 空间复杂度: O(logn) 

## 面试题11: 旋转数组的最小数字
##### 题目
把一个数组最开始的若干个元素搬到数组的末尾, 我们称之为数组的旋转. 输入一个递增排序的数组的一个旋转, 输出旋转数组的最小元素.

 * 输入:
  
  > [3, 4, 5, 1, 2]
  
 * 输出:

  > 1

	* 输入:
  
  > [1, 1, 0 ,1]
  
 * 输出:

  > 0

##### 思路
可以通过遍历的方法(O(n)), 但没必要
可以看出, 最小元素是前后俩子数组的分割线, 所以可以用双指针二分查找来解题, 但是如果碰到类似[1, 0, 1, 1]这样的用例(首,尾, 中间三个数相等), 则无法继续用二分法查找, 需用遍历查找特殊处理

##### 代码
```js
function findMin(arr) {
	let start = 0
	let middle = start
	let end = arr.length - 1
	while(arr[start] >= arr[end]) {
		middle = Math.ceil((start + end) / 2)
		if (arr[start] === arr[middle] && arr[middle] === arr[end]) return minOrder(arr, first, end)
		if (end - start === 1) {
			break;
		}
		if (arr[start] >= arr[middle]) {
			end = middle
		} else {
			start = middle
		}
	}
	return arr[middle]
}
function minOrder(arr, first, end) {
	let min = arr[first]
	for(let i = first + 1; i <= end; i++) {
		if (arr[i] < min) min = arr[i]
	}
	return min
}
```

## 面试题12: 矩阵中的路径
##### 题目:
请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左右上下移动一格。如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。
##### 思路:
第n个字符满足在字符串的第i个位置相等，如果第n个字符的上下左右也就是n+1路径上没有符合与i+1的字符串的字符相等的话，就倒退到n-1位置重新匹配
##### 代码

```js
	var exist = function(arr, str) {
	const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]]
	const rows = arr[0].length
	const cols = arr.length
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			if (arr[i][j] === str[0]) {
				if (dfs(i, j, 0)) return true
			}
		}
	}
	function dfs(i, j, index) {
		if (i < 0 || i >= cols || j < 0 || j >= rows || arr[i][j] !== str[index]) return false
		if (index === str.length - 1) return true
		arr[i][j] = null
		const res = dir.some(([offsetX, offsetY]) => {
			return dfs(i + offsetX, j + offsetY, index + 1)
		})
		arr[i][j] = str[index]
		return res
	}
	return false
};
```
## 面试题13: 机器人的运动
##### 题目
地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？
##### 思路
dfs, bfs
##### 代码
```js
//dfs
var movingCount = function(m, n, k) {
	const res = []
		const arr = []
		for(let i = 0; i < m; i++) {
			arr.push(new Array(n))
		}
		let count = 0
		const dir = [[0, 1], [1, 0], [-1, 0], [0, -1]]
		dfs(0, 0, 0)
		function dfs(x, y, index) {
			if (x < 0 || y < 0 || x >= m || y >= n || arr[x][y] || judge(x, y, k)) {
				return
			}
			arr[x][y] = true
			count++
			dir.forEach(([offsetX, offsetY]) => {
				dfs(x + offsetX, y + offsetY, index + 1)
			})
		}
		return count
	};
	//bfx
	var movingCount = function(m, n, k) {
		const stack = [[0, 0]]
		const arr = []
		let count = 1
		for(let i = 0; i < m; i++) {
			arr.push(new Array(n))
		}
		arr[0][0] = true
		const dir = [[1, 0], [0, 1]]
		while(stack.length) {
			const point = stack.pop()
			const [x, y] = point
			dir.forEach(([offsetX, offsetY]) => {
				let i = x + offsetX
				let j = y + offsetY
				if (i < 0 || j < 0 || i >= m || j >= n || arr[i][j] || judge(i, j, k)) return
				arr[i][j] = 1
				stack.push([i, j])
				count++
			})
		}
		return count
	};
	function judge(x, y, k) {
		let sum = 0
		while(x >= 1) {
			sum += x % 10
			x = Math.floor(x / 10)
		}
		while(y >= 1) {
			sum += y % 10
			y = Math.floor(y / 10)
		}
		return sum > k
	}
```

## 面试题14: 剪绳子
##### 题目
给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 ```k[0],k[1]...k[m-1]``` 。请问 ```k[0]*k[1]*...*k[m-1] ```可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

* 输入:

> 8

* 输出:

> 18

* 输入:

> 4

* 输出:

> 4
##### 思路
动态规划 & 贪心
```js
// 动态规划
var cuttingRope = function(length) {
	if (length === 1) return 0
	if (length === 2) return 1
	if (length === 3) return 2
	const product = [0, 1, 2, 3]
	for(let i = 4; i <= length; i++) {
		let max = 0
		for (let j = 1; j <= Math.ceil(i / 2); j++) {
			let res = product[j] * product[i - j]
			if (res > max) max = res
		}
		product[i] = max
	}
	return product[length]
}
// 贪心
var cuttingRope = function(length) {
	if (length === 1) return 0
	if (length === 2) return 1
	if (length === 3) return 2
	let sum = 1
	let timeof3 = Math.floor(length / 3)
	let left = length - 3 * timeof3
	if (length % 3 === 1) {
		timeof3--
		left = 4
	}
	return (left === 0 ? 1: left) * Math.pow(3, timeof3)
};
```
##### 性能
###### 动态规划
* 时间复杂度: O(n ^ 2)
* 空间复杂度: O(n)
###### 贪婪
* 时间复杂度: O(1)
* 空间复杂度: O(1)

## 面试题15 二进制中1的个数
##### 题目
请实现一个函数，输入一个整数，输出该数二进制表示中 1 的个数。例如，把 9 表示成二进制是 1001，有 2 位是 1。因此，如果输入 9，则该函数输出 2。

##### 思路
一个整数减一, 其二进制表达式转换规则分两种情况, 1. 最右边为1, 那就是最右边的1 => , 如9(1001) => 8(1000), 2. 最右边为0, 那就找到最右边的1转为0, 1后的0转为1 如12(1100) => 11(1011), 可以发现, 让n & n -1 会消掉n的一个1 如, 1001 && 1000 = 1000, 所以只要循环n = n & n - 1, 计算循环次数, 即可得出有多少位1
##### 代码
```js
function numberOf1(n) {
	let count = 0
	while(n) {
		n = n & (n - 1)
		count++
	}
	return count
}
```