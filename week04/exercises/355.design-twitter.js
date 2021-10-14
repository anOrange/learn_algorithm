/**
 * Initialize your data structure here.
 */
let timeCount = 1;
var Twitter = function () {
  this.tweetMap = Object.create(null);
  this.followMap = Object.create(null);
};

/**
 * Compose a new tweet.
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function (userId, tweetId) {
  if (!this.tweetMap[userId]) {
    this.tweetMap[userId] = Object.create(null);
  }
  this.tweetMap[userId][tweetId] = timeCount++;
};

/**
 * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function (userId) {
  const userList = [userId];
  const tweetList = [];
  const followList = this.followMap[userId];
  if (followList) {
    userList.push(...Object.keys(followList));
  }
  userList.forEach((uid) => {
    if (this.tweetMap[uid]) {
      Object.keys(this.tweetMap[uid]).forEach((tweetId) => {
        tweetList.push([tweetId, this.tweetMap[uid][tweetId]]);
      });
    }
  });

  // 方法1 用二分分出前十的列表，然后在对前10排序

  // 方法2 用大小是10的大顶堆
  const heap = new BinaryHeap();
  tweetList.forEach((tweet) => {
    heap.push(tweet)
    if (heap.size() > 10) heap.pop()
  });
  tweetList.length = 0
  while(heap.size()) {
    tweetList.push(heap.pop()[0])
  }
  return tweetList.reverse()

  //方法3 先排序看看其他代码的正确性
  // return tweetList
  //   .sort((itemA, itemB) => itemB[1] - itemA[1])
  //   .slice(0, 10)
  //   .map((item) => item[0]);
};

/**
 * Follower follows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function (followerId, followeeId) {
  if (!this.followMap[followerId]) {
    this.followMap[followerId] = Object.create(null);
  }
  this.followMap[followerId][followeeId] = 1;
};

/**
 * Follower unfollows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function (followerId, followeeId) {
  if (this.followMap[followerId]) {
    // this.followMap[followerId][followeeId] = 0
    delete this.followMap[followerId][followeeId];
  }
};

function BinaryHeap() {
  this.heap = [];
}

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
