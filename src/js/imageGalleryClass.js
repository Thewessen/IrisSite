// This javascript will make an image-gallery,
// with slideshow and scroll-snap,
// and bullet-points for reference
//
// Add too the end of a html-page:
//  <script src='imageGallery.js'></script>
// </body>
//
// Add an image-gallery-tag where you want
// inside the html-page, containing all the images,
// example:
//
// <image-gallery>
//   <img src='flower.jpg' alt='...' />
//   <img src='dog.jpg' alt='...' />
//   <img src='kitten.jpg' alt='...' />
// </image-gallery>
//
// Note:
// 'width: fit-content & -moz-fit-content'
// might not be supported on all browsers

import isFunction from './isFunction'
import isNumber from './isNumber'

class GalleryImage {
  constructor(url) {
    const figureStyle = `
      display: inline-block;
      margin: 0;
      padding: 0;
      width: 100%;
      position: relative;
      overflow: hidden;
      background-color: transparent;
      background-color: rgba(0,0,0,0.3);
    `
    const imageStyle = `
      display: inline-block;
      margin: 0 auto;
      padding: 0;
      max-width: 34rem;
      width: 100%;
      z-index: 3;
      position: relative;
    `
    let image = document.createElement('img')
    image.src = url
    image.style.cssText = imageStyle

    // Create image container
    this.container = document.createElement('figure')
    this.container.style.cssText = figureStyle
    this.container.appendChild(image)
  }
}

class ImageGallery {
  constructor (urls) {
    urls.map((url) => {
      new GalleryImage(url)
    })
    const currentColor = 'rgb(205,182,82)'
    const intervalTiming = 5000 // In milliseconds
    const containerStyle = `
      margin: 0;
      overflow: hidden;
      padding: 0;
      white-space: nowrap;
      scroll-behavior: smooth;
      line-height: 0;
      background-position: center top;
      background-size: 500%;
      background-repeat: no-repeat;
    `
    const bulletContainerStyle = `
      display: block;
      list-style-type: none;
      margin: 0 auto;
      overflow: hidden;
      padding: 0;
      width: fit-content;
      width: -moz-fit-content;
      width: -webkit-fit-content;
    `
    const bulletListStyle = `
      cursor: pointer;
      float: left;
      font-size: 4rem;
      line-height: .33em;
      margin: .1em;
    `
    this._current = null
    // Create container (needed for scroll)
    const container = document.createElement('div')
    container.style.cssText = containerStyle
    container.style.backgroundImage = `url(${urls[0]})`

    // Create clickable bullet-list
    const list = document.createElement('ul')
    list.style.cssText = bulletContainerStyle

    // Necessary for IE ref (see bottom script)
    let index = 0

    urls.forEach((img, index) => {
      let bul = document.createElement('li')
      let bulText = document.createTextNode('•')
      bul.style.cssText = bulletListStyle
      bul.appendChild(bulText)
      bul.nr = index

      bul.scrollTo = function () {
        let dist = this.img.getBoundingClientRect().x - container.getBoundingClientRect().x
        g.current = this
        this.style.color = currentColor
        /* IE fix: no scroll or scrollBy */
        if (isFunction(container.scrollBy)) {
          container.scrollBy({
            left: dist,
            behavior: 'smooth'
          })
        } else if (isNumber(container.scrollLeft)) {
          dist = container.scrollWidth
          let total = container.children.length
          container.scrollLeft = bul.nr * dist / total
        }
        setTimeout(() => {
          container.style.backgroundImage = `url(${this.img.querySelector('img').src})`
        }, 300)
      }

      // Add click event too bullet
      bul.addEventListener('click',
        () => {
          clearInterval(interval)
          interval = null
          g.current.style.color = 'black'
          bul.scrollTo()
        }
      )

    })
  }

  set current (index) {
    this._current = index
    this.urls.forEach((img, i) => {
      i === this.current
        ? img.style.color = 'black'
        : img.style.color = currentColor
    })
  }

  scrollTo (index) {
    this.current = index

  }

  scrollToNext () {
    this.current.style.color = 'black'
    if (this.current.nextElementSibling) {
      this.current
        .nextElementSibling
        .scrollTo()
    } else {
      this.container
        .firstElementChild
        .scrollTo()
    }
  }

  scrollToPrev () {
    this.current.style.color = 'black'
    if (this.current.previousElementSibling) {
      this.current
        .previousElementSibling
        .scrollTo()
    } else {
      this.container
        .lastElementChild
        .scrollTo()
    }
  }
}

export default function imageGallery () {
  // Use tags called <image-gallery> to initiate
  let gal = document.querySelectorAll('image-gallery')
  if (!gal[0]) {
    console.warn('imageGallery.js loaded, but no <image-gallery> tag found!')
    return
  }

  // All styles for the different elements
  // Some usefull functions
  for (let g of gal) {
    let imgs = g.children
    let bullets = []


    // Move images too container
    // And create bullet item for each image
    while (imgs.length > 0) {
      let image = imgs[0]
      // Create bullet list item

      // Reference the bullet to corresponding img container
      bul.img = figure
      bul.nr = index
      index += 1

      // Add scrollTo-method when bullet is clicked
      // Store for later reference
      bullets.push(bul)

      // Move image in the container
      container.appendChild(figure)

      // Move bullet in list
      list.appendChild(bul)
    }

    // Add the container and list too the image-gallery
    g.appendChild(container)
    g.appendChild(list)

    // Start at the first image in the gallery
    g.current = bullets[0]
    g.current.style.color = currentColor

    // A click on container will reset slide-show
    container.addEventListener(
      'click',
      () => {
        scrollToNext(g.current)
        if (!interval) {
          interval = g.startSlideShow()
        }
      })

    // Needed for touch event (start/end)
    let prev = null
    let start = null

    // Add touch-events (for scrolling through pages)
    container.addEventListener(
      'touchstart',
      (e) => {
        clearInterval(interval)
        interval = null
        start = e.touches[0].clientX
      }, { passive: true })

    container.addEventListener(
      'touchmove',
      (e) => {
        let x = e.touches[0].clientX
        if (prev) {
          /* IE fix: no scroll or scrollBy */
          if (isFunction(container.scrollBy)) {
            container.scrollBy(prev - x, 0)
          } else if (isNumber(container.scrollLeft)) {
            container.scrollLeft = prev - x
          }
        }
        prev = x
      }, { passive: true })

    container.addEventListener(
      'touchend',
      () => {
        if (start && prev) {
          if (start - prev > 0) {
            scrollToNext(g.current)
          } else {
            scrollToPrev(g.current)
          }
        }
        prev = null
        start = null
      })

    // Automate scrolling on pageload
    g.startSlideShow = function () {
      let interval = setInterval(() => {
        scrollToNext(g.current)
      }, intervalTiming)
      return interval
    }

    // Start the slideshow
    let interval = g.startSlideShow()
  }
}
