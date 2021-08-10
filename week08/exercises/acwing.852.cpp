#include<iostream>
#include<algorithm>
#include<vector>
#include<queue>

using namespace std;

int main() {
    int n = 0;
    int m = 0;
    cin >> n;
    cin >> m;
    vector<vector<int> > edges(m, vector<int>(3, 0)); // 记录边
    vector<vector<pair<int, int> > > edge(n + 1, vector<pair<int, int> >(0)); // 出边数组
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < 3; j++) {
            cin >> edges[i][j];
        }
        edge[edges[i][0]].push_back(make_pair(edges[i][2], edges[i][1]));
    }



    vector<int> dist(n + 1, 1e9);
    vector<bool> visited(n + 1, false);
    dist[1] = 0;
    priority_queue<pair<int, int> > q;
    q.push(make_pair(0, 1)); // 第一个点，到自身的权重为0
    while (!q.empty())
    {   
        int i = q.top().second;  // 点
        q.pop();
        if (visited[i]) {
            continue;
        }
        int size = edge[i].size();
        // 遍历 i 可达的点
        for (int j = 0; j < size; j++) {
            int g = edge[i][j].second; // 可达点
            // cout << i << " -> " << g << endl;
            int weight = edge[i][j].first; // 距离
            if (dist[g] > dist[i] + weight) {
                dist[g] = dist[i] + weight;
                q.push(make_pair(-dist[g], g));
            }
        }
        visited[i] = true;
    }
    
    int ans = dist[n];
    if (dist[n] == 1e9) {
        ans = -1;
    }
    cout << ans;
    return 0;
}
