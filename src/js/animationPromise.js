'use strict'

// Creating animations promised based
export default function animatePromise (obj, prop, end, time) {
  // More error-testcases are needed...
  return new Promise((resolve, reject) => {
    if (time % 5 !== 0) {
      reject(new Error('Animation time not dividable by 5. Set different..'))
    }
    const id = setInterval(obj[prop] > end ? revAnimation : animation, 5)
    let incr = (end - parseFloat(obj[prop])) / (time / 5)
    function revAnimation () {
      if (obj[prop] <= end) {
        clearInterval(id)
        resolve()
      } else {
        obj[prop] = parseFloat(obj[prop]) + incr
      }
    }
    function animation () {
      if (obj[prop] >= end) {
        clearInterval(id)
        resolve()
      } else {
        obj[prop] = parseFloat(obj[prop]) + incr
      }
    }
  })
}
