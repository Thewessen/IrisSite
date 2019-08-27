'use strict'

import isFunction from './isFunction'

// Creating animations
export default function animate (obj, prop, end, time, callback) {
  // More error-testcases are needed...
  if (time % 5 !== 0) {
    console.warn('Animation time not dividable by 5. Set different..')
    return
  }
  const reverse = obj[prop] > end
  const id = setInterval(reverse ? revAnimation : animation, 5)
  let incr = (end - parseFloat(obj[prop])) / (time / 5)
  function revAnimation () {
    if (obj[prop] <= end) {
      clearInterval(id)
      if (isFunction(callback)) {
        callback()
      }
    } else {
      obj[prop] = parseFloat(obj[prop]) + incr
    }
  }
  function animation () {
    if (obj[prop] >= end) {
      clearInterval(id)
      if (isFunction(callback)) {
        callback()
      }
    } else {
      obj[prop] = parseFloat(obj[prop]) + incr
    }
  }
}
