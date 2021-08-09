// 14. 最长公共前缀
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        int len = strs.size();
        int ans = -1;
        bool flag = 1;
        string ansStr = "";
        while(flag) {
            char a = ' ';
            for (string str: strs) {
                if (ans + 1 >= str.size()) {
                    return str;
                }
                if (a == ' ') {
                    a = str[ans + 1];
                }
                if (a != str[ans + 1]) {
                    return ansStr;
                }
            }
            ans++;
            ansStr += a;
        }
        return ansStr;
    }
};
