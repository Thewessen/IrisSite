'use strict'

// Checks if object is a number
export default function isNumber (it) {
  return Object.prototype.toString.call(it) === '[object Number]'
}
