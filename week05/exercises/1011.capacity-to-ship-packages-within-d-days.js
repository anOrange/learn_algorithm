/**
 * 1011. 在 D 天内送达包裹的能力
 * https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days/
 */

/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
	let left = 1, right = 250000000
	while (left < right) {
		let mid = (left + right) >> 1
		if (check(weights, days, mid)) {
			right = mid
		} else {
			left = mid + 1
		}
	}
	return right
};

/**
 * 校验的最大载重 eachWeight 是否满足 days 天内送完
 * 这里每次尽可能装最多，用贪心的解法
 * 满足决策包容性: 前一次不运低i个货物，后面可以继续运该货物，不影响到达这个解
 */
function check(weights, days, eachWeight) {
	let curWeight = 0
	let curDay = 1
	for (let i = 0; i < weights.length; i++) {
		if (weights[i] > eachWeight) {
			return false
		}
		if (curWeight + weights[i] <= eachWeight) {
			curWeight += weights[i]
		} else {
			curDay++
			if (curDay > days) {
				return false
			}
			curWeight = weights[i]
		}
	}
	return true
}
