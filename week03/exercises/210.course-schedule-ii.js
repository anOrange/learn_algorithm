/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
 var findOrder = function(numCourses, prerequisites) {
  const inDeg = []
  const edges = []
  for (let i = 0; i < numCourses; i++) {
      inDeg[i] = 0
      edges[i] = []
  }
  
  prerequisites.forEach(item => {
      // if (!edges[item[0]]) edges[item[0]] = []
      edges[item[0]].push(item[1])
      inDeg[item[1]]++
  })
  const queue = []
  const learns = []
      for(let i = 0; i < numCourses; i++) {
          if (inDeg[i] === 0) {
              queue.push(i)
          }
      }
      
      while(queue.length) {
          const i = queue.shift()
          learns.push(i)
          if (learns.length == numCourses) {
              return learns.reverse()
          }
          edges[i].forEach(n => {
              inDeg[n]--
              if (inDeg[n] == 0) {
                  queue.push(n)
              }
          })
      }
  return []
  
};