#include<queue>
#include<vector>
#include<iostream>

using namespace std;

static int dirX[8] = {0,  1,  1, 1, 0, -1, -1, -1};
static int dirY[8] = {-1, -1, 0, 1, 1, 1,  0,  -1};
class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int> >& grid) {
        
        n = grid.size();

        gridCopy = vector<vector<int> > (n, vector<int>(n, 0));
        gridDepth = vector<vector<int> >(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                gridCopy[i][j] = grid[i][j];
            }
        }

        targetX = n - 1;
        targetY = n - 1;

        queue<pair<int, int> > queue_front;
        queue<pair<int, int> > queue_tail;
        if (gridCopy[0][0] || gridCopy[targetY][targetX]) {
            return -1;
        }
        gridCopy[0][0] = 2;
        gridCopy[targetY][targetX] = 3;
        queue_front.push(make_pair(0, 1));
        queue_tail.push(make_pair(targetX * 1000 + targetY, 1));
        gridDepth[0][0] = 1;
        gridDepth[targetY][targetX] = 1;
        // 感觉这里应该一边为空，就走不通了
        while(!queue_front.empty() && !queue_tail.empty()) {
            int ans = expand(queue_front, 2, 3);
            if (ans > -1) return ans;
            ans = expand(queue_tail, 3, 2);
            if (ans > -1) return ans;
        }
        return -1;
    }

    vector<vector<int> > gridCopy;
    vector<vector<int> > gridDepth;
    
    int n;
    int targetX;
    int targetY;

    int expand(queue<pair<int, int> >& queue,int visit,int visitOther) {
        pair<int, int> top = queue.front();
        int depth = top.second;
        while(!queue.empty() && queue.front().second == depth) {
            top = queue.front();
            int x = top.first / 1000;
            int y = top.first % 1000;
            // cout << (visit == 2 ? "front" : "tail") << " visit " << x << ',' << y << " " << top.first << endl;
            if (gridCopy[y][x] == visitOther) {
                return depth;
            }
            queue.pop();
            for (int i = 0; i < 8; i++) {
                int nextX = x + dirX[i];
                int nextY = y + dirY[i];
                if (nextX >= 0 && nextX < n && nextY >=0 && nextY < n) {
                    if (gridCopy[nextY][nextX] == 0) {
                        // cout << "push " << nextX << " " << nextY << " " << nextX * 1000 + nextY << endl;
                        queue.push(make_pair(nextX * 1000 + nextY, depth + 1));
                        gridCopy[nextY][nextX] = visit;
                        gridDepth[nextY][nextX] = depth + 1;
                    } else if (gridCopy[nextY][nextX] == visitOther) {
                        // cout<< "depth:" << depth << " " << gridDepth[nextY][nextX] << endl;
                        // for (int i = 0; i < n; i++) {
                        //     cout << "[";
                        //     for (int j = 0; j < n; j++) {
                        //         cout << gridDepth[i][j];
                        //     }
                        //     cout << "]" << endl;
                        // }
                        // cout << "cur:" << x << " " << y << endl;
                        // cout << "next:" << nextX << " " << nextY << endl;
                        return depth + gridDepth[nextY][nextX];
                    }
                }
            }
        }
        return -1;
    }
};

int main() {
  vector<vector<int> > example(4, vector<int >(4, 0));
  int exam[][4] = {
    {0,0,0,0},
    {1,0,0,1},
    {0,1,0,0},
    {0,0,0,0}
  };
  for (size_t i = 0; i < 4; i++)
  {
    for (size_t j = 0; j < 4; j++)
    {
      example[i][j] = exam[i][j];
    }
  }
  Solution solution;
  int ans = solution.shortestPathBinaryMatrix(example);
  cout << ans;
  return 0;
}
