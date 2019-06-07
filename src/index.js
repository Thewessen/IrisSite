import drawingStrings from './js/drawingStringsSVG'
import imageGallery from './js/imageGallery'
import navigation from './js/navigation'
import introEvents from './js/introEvents'

drawingStrings()
imageGallery()
navigation()
if (window.document.URL.endsWith('index.html')) {
  introEvents()
}
