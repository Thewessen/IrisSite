'use strict'

// Checks if argument is a function
export default function isFunction (it) {
  return Object.prototype.toString.call(it) === '[object Function]'
}
