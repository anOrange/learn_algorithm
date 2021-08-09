class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<int> dist(n + 1, 1e9);
        dist[k] = 0;
        for(int i = 1; i <= n; i++) {
            int flag = 0;
            for (vector<int> time : times) {
                int x = time[0];
                int y = time[1];
                int z = time[2];
                if (dist[y] > dist[x] + z) {
                    dist[y] = dist[x] + z;
                    flag = 1;
                }
            }
            if (flag == 0) {
                break;
            }
        }
        int ans = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == 1e9) {
                return -1;
            }
            if (ans < dist[i]) {
                ans = dist[i];
            }
        }
        return ans;
    }
};
