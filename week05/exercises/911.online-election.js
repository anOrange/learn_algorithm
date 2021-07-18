/**
 * @param {number[]} persons
 * @param {number[]} times
 */
var TopVotedCandidate = function (persons, times) {
	let maxVote = 0
	let maxPersonIndex = -1
	let voteResults = Array(persons.length).fill(0)
	this.timesResult = Array(persons.length)
	for (let i = 0; i < persons.length; i++) {
		const personIndex = persons[i]
		let curPersonVote = voteResults[personIndex]
		curPersonVote++
		voteResults[personIndex] = curPersonVote
		if (curPersonVote >= maxVote) {
			maxVote = curPersonVote
			maxPersonIndex = personIndex
		}
		this.timesResult[i] = {
			vote: maxVote,
			index: maxPersonIndex,
			time: times[i]
		}
	}
};


/** 
 * @param {number} t
 * @return {number}
 */
TopVotedCandidate.prototype.q = function (t) {
	const timesResult = this.timesResult
	let left = 0, right = timesResult.length - 1
	while (left < right) {
		let mid = (left + right + 1) >> 1
		if (timesResult[mid].time <= t) {
			left = mid
		} else {
			right = mid - 1
		}
	}
	return timesResult[right].index
};

/**
 * Your TopVotedCandidate object will be instantiated and called as such:
 * var obj = new TopVotedCandidate(persons, times)
 * var param_1 = obj.q(t)
 */