/**
 * @param {number[]} digits
 * @return {number[]}
 */
 var plusOne = function(digits) {
  digits[digits.length - 1] += 1
  for(let i = digits.length - 1; i >= 0; i--) {
      if (digits[i] > 9) {
          digits[i] -= 10
          if (i - 1 >= 0) {
              digits[i - 1] += 1
          } else {
              digits.unshift(1)
          }
      }
  }
  return digits
};
