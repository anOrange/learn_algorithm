/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
 var strStr = function(haystack, needle) {
	if (needle.length == 0) {
			return 0
	}
	if (haystack.length == 0) {
			return -1
	}
	const baseCode = 'a'.charCodeAt(0)
	const preArr = [0]
	const p = 1e9 + 7
	const modNum = 131
	const needleLen = needle.length
	haystack = ' ' + haystack
	for (let i = 1; i < haystack.length; i++) {
			const code = haystack.charCodeAt(i) - baseCode
			preArr[i] = (preArr[i - 1] * modNum + code) % p 
	}
	let needleHash = 0
	for (let i = 0; i < needleLen; i++) {
			const code = needle.charCodeAt(i) - baseCode
			needleHash = (needleHash * modNum + code) % p 
	}
	const powArr = [1]
	for (let i = 1; i <= needleLen; i++) {
			powArr[i] = powArr[i - 1] * modNum % p
	}
	console.log(preArr)
	console.log(powArr)
	console.log(needleHash)
	// 取区间 hash
	for (let r = needleLen; r < haystack.length; r++) {
			const curHash = ((preArr[r] - preArr[r - needleLen] * powArr[needleLen]) % p + p) % p
			console.log(curHash)
			if (curHash === needleHash) {
					return r - needleLen
			}
	}
	return -1
};

/**
 * 这里在用例
 * "mississippi"
 * "issip"
 * 中没通过。
 * 发现是 js 的数据类型超了，就移出了
 * 改成 p=9999991, mod=13331，就通过了
 */
