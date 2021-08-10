// 1334. 阈值距离内邻居最少的城市
class Solution {
public:
    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 1e9));
        for (int i = 0; i < n; i++) {
            // 记得自身连同的要设置权重为 0
            /*
                不过这题不加这个好像也没有影响
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])
                i = 1, j = 3, k = 1 时
                d[1][3] = min(d[1][3], d[1][1] + dp[1][3]) =  d[1][3]
            */
            dp[i][i] = 0;
        }
        for (auto& edge : edges) {
            int x = edge[0];
            int y = edge[1];
            // 注意，无向图要双向边，两边都是通的
            dp[x][y] = edge[2];
            dp[y][x] = edge[2];
        }
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]);
                }
            }
        }
        
        int arrivedCount = 1e9;
        int ans = -1;
        for (int i = 0; i < n; i++) {
            int arriveTemp = 0;
            for (int j = 0; j < n; j++) {
                if (i == j) continue;
                if (dp[i][j] <= distanceThreshold) {
                    arriveTemp++;
                }
            }
            if (arriveTemp <= arrivedCount) {
                arrivedCount = arriveTemp;
                ans = i;
            }
        }

        return ans;
    }
};
