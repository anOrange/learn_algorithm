/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  let dp = Array(2);
  const height = triangle.length;
  dp[0] = Array(triangle[height - 1].length).fill(Number.MAX_VALUE);
  dp[1] = Array(triangle[height - 1].length).fill(Number.MAX_VALUE);
  dp[0][0] = triangle[0][0];
  for (let k = 1; k < height; k++) {
    let arr = triangle[k];
    for (let i = 0; i < arr.length; i++) {
      dp[k % 2][i] =
        Math.min(
          dp[(k - 1) % 2][i],
          i == 0 ? Number.MAX_VALUE : dp[(k - 1) % 2][i - 1]
        ) + arr[i];
    }
    // console.log(k ,':', dp[k % 2])
  }
  let minSum = Number.MAX_VALUE;
  let index = (height - 1) % 2;
  // console.log(dp[0])
  // console.log(dp[1])
  for (let i = 0; i < dp[index].length; i++) {
    if (dp[index][i] < minSum) {
      minSum = dp[index][i];
    }
  }
  return minSum;
};
