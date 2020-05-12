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