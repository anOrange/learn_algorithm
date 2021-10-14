/**
 * @param {number} n
 * @return {number}
 */
 var findIntegers = function(n) {
  const dp0 = [0, 1]
  const dp1 = [0, 1]
  let len = 1
  for (let i = 2; (n >> (i - 1)) > 0; i++) {
      len = i
      dp1[i] = dp0[i - 1]
      dp0[i] = dp1[i - 1] + dp0[i - 1]
  }

  console.log(len)
  console.log('dp0', dp0)
  console.log('dp1', dp1)
  let pre = 0;
  let ans = 0
  for (let i = len; i > 0; i--) {
      const num = (n >> (i - 1)) & 1
      if (num) {
        ans += dp0[i]
      }
      if (i == 1) {
        ans++
      }
      if (num === pre && pre === 1) {
        break
      }
      pre = num
  }
  return ans

};

let n = 5
const ans = findIntegers(n)
console.log('ans', ans)