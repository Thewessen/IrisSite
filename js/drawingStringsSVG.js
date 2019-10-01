(function () {
  // Constants
  // =================================
  // distances (in px)
  const HEADERWIDTH = 768
  const HEADERHEIGHT = window.innerWidth < HEADERWIDTH
    ? 90 : 135
  const FOOTERHEIGHT = window.innerWidth < HEADERWIDTH
    ? 60 : 90
  const STRINGDIST = window.innerWidth < HEADERWIDTH
    ? 20 : 40
  const HEADERMARGIN = window.innerWidth < HEADERWIDTH
    ? 10 : 20
  const X1 = window.innerWidth < HEADERWIDTH
    ? 40 : 60
  const X2 = 0
  const Y1 = 0
  const Y2 = window.innerWidth < HEADERWIDTH
    ? 60 : 90
  const STROKEWIDTH = 1

  // string-colors
  const RED = 'rgb(237,28,36)'
  const BLUE = 'rgb(53,79,162)'
  const WHITE = 'rgb(35,31,32)'

  // timings (in ms)
  const ANIMATE_SLOW = window.innerWidth < HEADERWIDTH
    ? 60 : 200
  const ANIMATE_FAST = window.innerWidth < HEADERWIDTH
    ? 30 : 100

  // All elements needed
  // =================================
  let footer = document.getElementById('footer')
  if (!footer) {
    console.error(`
      drawingLinesSVG.js loaded but no svg with id='footer' found.
      Both a svg with id='header' and id='footer' are necessary,
      for this script to run properly.
      `)
    return
  }
  let header = document.getElementById('header')
  if (!header) {
    console.error(`
      drawingLinesSVG.js loaded but no svg with id='header' found.
      Both a svg with id='header' and id='footer' are necessary,
      for this script to run properly.
      `)
    return
  }
  let harpburger = document.getElementById('harpburger')
  if (!harpburger) {
    console.warn(`No svg with id=${harpburger} detected. Unable to create click event.`)
  }
  let main = document.querySelector('main')
  let nav = document.getElementById('menu')
  if (!main || !nav) {
    console.warn('There are no main and/or nav tags to swap')
  }
  // Set all the proper styles
  main.style.opacity = 1
  main.style.display = 'flex'
  nav.style.opacity = 0
  nav.style.display = 'none'
  let isOpen = true

  // Helper functions
  // =================================
  // Checks if argument is a function
  function isFunction (it) {
    return Object.prototype.toString.call(it) === '[object Function]'
  }
  // Set attributes on element
  function setAttributes (elem, attrs) {
    for (let key in attrs) {
      elem.setAttribute(key, attrs[key])
    }
  }
  // Creating animations
  function animate (obj, prop, end, time, callback) {
    // More error-testcases are needed...
    if (time % 5 !== 0) {
      console.warn('Animation time not dividable by 5. Set different..')
      return
    }
    let reverse = obj[prop] > end
    let id = setInterval(reverse ? revAnimation : animation, 5)
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

  // Main
  // =================================
  function reCreateLines () {
    // Dimensions of strings
    let dims = (index) => ({
      'x1': X1 + HEADERMARGIN + STRINGDIST * index,
      'x2': X2 + HEADERMARGIN + STRINGDIST * index,
      'y1': Y1,
      'y2': Y2,
      'stroke-width': STROKEWIDTH,
      'stroke': strokeColor(index)
    })

    // Dimension of image
    header.parentElement.setAttribute('height', HEADERHEIGHT)
    footer.parentElement.setAttribute('height', FOOTERHEIGHT)

    // Remove all lines that exists
    while (footer.firstChild) {
      footer.firstChild.remove()
    }
    while (header.firstChild) {
      header.firstChild.remove()
    }

    // Create new lines
    for (let i = 0; X1 + STRINGDIST * i + HEADERMARGIN * 2 <= window.innerWidth; i += 1) {
      createNewLine(footer, dims(i))
      createNewLine(header, dims(i))
    }

    // create extra line for header (for burger icon)
    createNewLine(header, dims(header.children.length))

    // create burger icon
    createBurgerIcon(header)
  }

  function strokeColor (stnr) {
    if (stnr % 7 === 0) {
      return RED
    } else if (stnr % 7 === 3) {
      return BLUE
    } else {
      return WHITE
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
    let x1 = X1 + HEADERMARGIN
    let x2 = X2 + HEADERMARGIN
    let y1 = Y1
    let y2 = Y2

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
        'stroke-width': STROKEWIDTH * 2
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
    let delta = X1 - X2
    animate(nav.style, 'opacity', 0, ANIMATE_SLOW)
    animate(sts[2].x2.baseVal, 'value', sts[2].getAttribute('x1') - delta, ANIMATE_SLOW)
    animate(sts[0].x2.baseVal, 'value', sts[0].getAttribute('x1') - delta, ANIMATE_SLOW,
      () => {
        nav.style.display = 'none'
        animate(main.style, 'opacity', 1, ANIMATE_FAST)
        animate(sts[1].style, 'opacity', 1, ANIMATE_FAST)
        main.style.display = 'flex'
        isOpen = true
      })
  }

  function closeMenu () {
    let sts = grabBurgerIcon()
    animate(main.style, 'opacity', 0, ANIMATE_FAST)
    animate(sts[1].style, 'opacity', 0, ANIMATE_FAST,
      () => {
        main.style.display = 'none'
        animate(sts[0].x2.baseVal, 'value', sts[2].getAttribute('x1'), ANIMATE_SLOW)
        animate(sts[2].x2.baseVal, 'value', sts[0].getAttribute('x1'), ANIMATE_SLOW)
        animate(nav.style, 'opacity', 1, ANIMATE_SLOW)
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
})()
