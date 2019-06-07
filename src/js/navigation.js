export default function navigation () {
  let indices = [
    {
      link: './zaal.html',
      content: 'zaal theater'
    },
    {
      link: './locatie.html',
      content: 'locatie projecten'
    },
    {
      link: './agenda.html',
      content: 'agenda'
    },
    {
      link: './index.html',
      content: 'biografie'
    },
    {
      link: './index.html',
      content: 'contact'
    }
  ]

  // Checks if argument is a function
  function isFunction (it) {
    return Object.prototype.toString.call(it) === '[object Function]'
  }

  // Helps to set attributes on element
  function animate (obj, prop, end, time, callback) {
    // More error-testcases are needed...
    if (time % 5 !== 0) {
      console.warn('Animation time not dividable by 5. Set different..')
      return
    }
    let value = obj[prop]
    let reverse = value > end
    let id = setInterval(reverse ? revAnimation : animation, 5)
    let incr = (end - parseFloat(value)) / (time / 5)
    function revAnimation () {
      if (value <= end) {
        clearInterval(id)
        if (isFunction(callback)) {
          callback()
        }
      } else {
        obj[prop] = parseFloat(value) + incr
      }
    }
    function animation () {
      if (value >= end) {
        clearInterval(id)
        if (isFunction(callback)) {
          callback()
        }
      } else {
        obj[prop] = parseFloat(value) + incr
      }
    }
  }
  // find root elements
  let nav = document.getElementById('menu')
  if (nav) {
    let ulst = document.createElement('ul')
    // Create list items
    for (let indc of indices) {
      let span, link
      let list = document.createElement('li')
      if (!indc.hasOwnProperty('content')) {
        indc.content = ''
      }
      let content = document.createTextNode(indc.content)

      if (indc.hasOwnProperty('link')) {
        link = document.createElement('a')
        link.href = indc.link
        link.appendChild(list)
      }

      span = document.createElement('span')
      list.addEventListener(
        'mouseenter',
        () => { span.style.borderBottom = '1px solid #1C1C1C' }
      )
      list.addEventListener(
        'mouseleave',
        () => { span.style.borderBottom = 'none' }
      )
      list.addEventListener(
        'click',
        () => {
          animate(
            ulst.style,
            'opacity', 0, 100,
            () => {
              ulst.style.display = 'none'
            }
          )
        }
      )
      ulst
        .appendChild(typeof link !== 'undefined' ? link : list)
        .appendChild(span)
        .appendChild(content)
    }
    // add elements to the DOM
    nav.appendChild(ulst)
  }
}
