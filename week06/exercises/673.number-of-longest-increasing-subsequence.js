/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
	let dp = Array(nums.length).fill(0)
	
	let maxLens = Array(nums.length).fill(1)
	dp[0] = 1
	let totalMaxLen = 1
	for (let i = 1; i < nums.length; i++) {
		let maxLen = 1
		for (let j = i - 1; j >= 0; j--) {
			if (nums[j] < nums[i] && maxLens[j] + 1 > maxLen) {
				maxLen = maxLens[j] + 1
			}
		}
		maxLens[i] = maxLen
		if (totalMaxLen < maxLen) {
			totalMaxLen = maxLen
		}
		let count = 0
		for (let j = i - 1; j >= 0; j--) {
			if (nums[j] < nums[i] && maxLens[j] + 1 == maxLen) {
				count += dp[j]
			}
		}
		dp[i] = count || 1
	}
	// console.log(maxLens)
	// console.log(dp)
	// console.log(' - ')
	let ans = 0
	for (let i = 0; i < dp.length; i++) {
		if (maxLens[i] == totalMaxLen) {
			ans += dp[i]
		}
	}
	return ans
};