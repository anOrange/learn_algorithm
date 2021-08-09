/**
*  字符串中的第一个唯一字符
*/
class Solution {
public:
    int firstUniqChar(string s) {
        char flags[26] = {0};
        for (unsigned char c : s) {
            int index = c - 'a';
            if (flags[index]) {
                flags[index] = 2;
            } else {
                flags[index] = 1; 
            }
        }
        int len = s.length();
        for (int index = 0; index < len; index++) {
            if (flags[s[index] - 'a'] == 1) {
                return index;
            }
        }
        return -1;
    }
};
