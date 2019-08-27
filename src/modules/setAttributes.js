'use strict'

// Set attributes on element
export default function setAttributes (elem, attrs) {
  for (const key in attrs) {
    elem.setAttribute(key, attrs[key])
  }
}
