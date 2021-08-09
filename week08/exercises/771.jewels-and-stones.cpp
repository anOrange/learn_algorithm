// 771. 宝石与石头
class Solution {
public:
    int numJewelsInStones(string jewels, string stones) {
        int flag[100] = {};
        int ans = 0;
        for (unsigned char c : jewels) {
            flag[c - 'A'] = 1;
        }
        for (unsigned char s : stones) {
            if (flag[s - 'A']) {
                ans++;
            }
        }
        return ans;
    }
};
