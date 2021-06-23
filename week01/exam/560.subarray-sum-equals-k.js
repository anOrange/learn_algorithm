/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var subarraySum = function(nums, k) {
  let length = nums.length;
  let sums = Array(length + 1)
  sums[0] = 0
  for (let i = 1; i <= length; i++) {
      sums[i] = sums[i - 1] + nums[i - 1];
  }
  let ans = 0
  /*
  // 暴力解法
  for (let i = 1; i <= length; i++) {
      for (let j = 1; j <= i; j++) {
          if (sums[i] - sums[j - 1] === k) {
             ans++ 
          }
      }
  }
  */
  /*
      当i不变时
      sums[i] - sums[j - 1] === k
      等价于 sums[j - 1] === sums[i] - k
      则 i 一定时，只要得到 j 在 1 ~ i 之间， sums[j - 1] 的于 sums[i] - k 的个数
  */
  let counts = Object.create(null)
  for (let i = 1; i <= length; i++) {
      const value = sums[i - 1]
      const key = '' + value
      if (counts[key]) {
          counts[key]++
      } else {
          counts[key] = 1
      }
      const curKey = '' + (sums[i] - k)
      ans += counts[curKey] ? counts[curKey] : 0
  }
  
  return ans
};
