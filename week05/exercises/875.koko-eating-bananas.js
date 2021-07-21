/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  let left = -1,
    right = 1000000000;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (check(piles, h, mid)) right = mid;
    else left = mid + 1;
  }
  return right;
};

function check(piles, h, k) {
  let hour = 0;
  for (let i = 0; i < piles.length; i++) {
    if (piles[i] <= k) {
      hour++;
    } else {
      hour += Math.ceil(piles[i] / k);
    }
    if (hour > h) return false;
  }
  return true;
}
