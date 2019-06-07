import isFunction from './isFunction'
import setAttributes from './setAttributes'
import animate from './animate'

export default function drawingStrings () {
  // Constants
  // =================================
  const headerWidthBreakpoint = 768
  const headerHeight = window.innerWidth < headerWidthBreakpoint
    ? 90 : 135
  const footerHeight = window.innerWidth < headerWidthBreakpoint
    ? 60 : 90
  const stringDistance = window.innerWidth < headerWidthBreakpoint
    ? 20 : 40
  const headerMargin = window.innerWidth < headerWidthBreakpoint
    ? 10 : 20
  const stringX1 = window.innerWidth < headerWidthBreakpoint
    ? 40 : 60
  const stringX2 = 0
  const stringY1 = 0
  const stringY2 = window.innerWidth < headerWidthBreakpoint
    ? 60 : 90
  const strokeWidth = 1
  const redStringColor = 'rgb(237,28,36)'
  const blueStringColor = 'rgb(53,79,162)'
  const whiteStringColor = 'rgb(35,31,32)'
  const antimeSlow = window.innerWidth < headerWidthBreakpoint
    ? 60 : 200
  const antimeFast = window.innerWidth < headerWidthBreakpoint
    ? 30 : 100

  // All elements needed
  // =================================
  const footer = document.getElementById('footer')
  if (!footer) {
    console.err(`
      drawingLinesSVG.js loaded but no svg with id='footer' found.
      Both a svg with id='header' and id='footer' are necessary,
      for this script to run properly.
      `)
    return
  }
  const header = document.getElementById('header')
  if (!header) {
    console.err(`
      drawingLinesSVG.js loaded but no svg with id='header' found.
      Both a svg with id='header' and id='footer' are necessary,
      for this script to run properly.
      `)
    return
  }
  const harpburger = document.getElementById('harpburger')
  if (!harpburger) {
    console.warn(`No svg with id=${harpburger} detected. Unable to create click event.`)
  }
  const main = document.querySelector('main')
  const nav = document.getElementById('menu')
  if (!main || !nav) {
    console.warn('There are no main and/or nav tags to swap')
  }
  // Set all the proper styles
  main.style.opacity = 1
  main.style.display = 'flex'
  nav.style.opacity = 0
  nav.style.display = 'none'
  let isOpen = true

  // Main
  // =================================
  function reCreateLines () {
    // Dimensions of strings
    let dims = {
      'x1': stringX1 + headerMargin,
      'x2': stringX2 + headerMargin,
      'y1': stringY1,
      'y2': stringY2,
      'stroke-width': strokeWidth,
      'stroke': ''
    }

    // Dimension of image
    header.parentElement.setAttribute('height', headerHeight)
    footer.parentElement.setAttribute('height', footerHeight)

    // Remove all lines that exists
    while (footer.firstChild) {
      footer.firstChild.remove()
    }
    while (header.firstChild) {
      header.firstChild.remove()
    }

    // Create new lines
    for (let i = 0; dims.x1 + headerMargin <= window.innerWidth; i += 1) {
      dims.stroke = strokeColor(i)
      createNewLine(footer, dims)
      createNewLine(header, dims)
      dims.x1 += stringDistance
      dims.x2 += stringDistance
    }

    // create extra line for header (for burger icon)
    dims.stroke = strokeColor(header.children.length)
    createNewLine(header, dims)

    // create burger icon
    createBurgerIcon(header)
  }

  function strokeColor (stnr) {
    if (stnr % 7 === 0) {
      return redStringColor
    } else if (stnr % 7 === 3) {
      return blueStringColor
    } else {
      return whiteStringColor
    }
  }

  function createNewLine (container, dims) {
    // Creates a 'normal' string
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    setAttributes(line, dims)
    container.appendChild(line)
  }

  function grabBurgerIcon () {
    // The burger strings
    let sts = Array.from(header.children)
    return sts.slice(sts.length - 3)
  }

  function createBurgerIcon (elem) {
    let x1 = stringX1 + headerMargin
    let x2 = stringX2 + headerMargin
    let y1 = stringY1
    let y2 = stringY2

    let diffx = (x1 - x2) / 2
    let diffy = (y2 - y1) / 2

    let sts = grabBurgerIcon()
    // Correct last three strings
    for (let st of sts) {
      let dims = {
        'x1': parseInt(st.getAttribute('x1')) - diffx,
        'x2': parseInt(st.getAttribute('x2')) - diffx,
        'y1': parseInt(st.getAttribute('y1')) + diffy,
        'y2': parseInt(st.getAttribute('y2')) + diffy,
        'stroke-width': strokeWidth * 2
      }
      setAttributes(st, dims)
    }
    sts[1].style.opacity = 1
    if (!isOpen) {
      sts[1].style.opacity = 0
      sts[0].setAttribute('x2', sts[2].getAttribute('x1'))
      sts[2].setAttribute('x2', sts[0].getAttribute('x1'))
    }
  }

  function openMenu () {
    let sts = grabBurgerIcon()
    let delta = stringX1 - stringX2
    animate(nav.style, 'opacity', 0, antimeSlow)
    animate(sts[2].x2.baseVal, 'value', sts[2].getAttribute('x1') - delta, antimeSlow)
    animate(sts[0].x2.baseVal, 'value', sts[0].getAttribute('x1') - delta, antimeSlow,
      () => {
        nav.style.display = 'none'
        animate(main.style, 'opacity', 1, antimeFast)
        animate(sts[1].style, 'opacity', 1, antimeFast)
        main.style.display = 'flex'
        isOpen = true
      })
  }

  function closeMenu () {
    let sts = grabBurgerIcon()
    animate(main.style, 'opacity', 0, antimeFast)
    animate(sts[1].style, 'opacity', 0, antimeFast,
      () => {
        main.style.display = 'none'
        animate(sts[0].x2.baseVal, 'value', sts[2].getAttribute('x1'), antimeSlow)
        animate(sts[2].x2.baseVal, 'value', sts[0].getAttribute('x1'), antimeSlow)
        animate(nav.style, 'opacity', 1, antimeSlow)
        nav.style.display = 'block'
        isOpen = false
      })
  }

  // Eventlisteners
  // =================================
  let onceSupported = false
  try {
    let options = {
      get once () { onceSupported = true }
    }
    window.addEventListener('test', options, options)
    window.removeEventListener('test', options, options)
  } catch (err) {
    onceSupported = false
  }
  window.addEventListener(
    'DOMContentLoaded', reCreateLines,
    onceSupported ? { once: true } : false
  )
  if (harpburger) {
    document.getElementById('harpburger').addEventListener(
      'click', () => { isOpen ? closeMenu() : openMenu() }
    )
  }
  window.addEventListener('resize', reCreateLines, false)
  window.addEventListener('orientationchange', reCreateLines, false)
}
