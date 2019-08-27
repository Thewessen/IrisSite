import drawingStrings from './modules/drawingStringsSVG'
import imageGallery from './modules/imageGallery'
import navigation from './modules/navigation'
import introEvents from './modules/introEvents'

drawingStrings()
imageGallery()
navigation()
if (window.document.URL.endsWith('index.html')) {
  introEvents()
}
