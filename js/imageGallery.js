// This javascript will make an image-gallery,
// with slideshow and scroll-snap,
// and bullet-points for reference
//
// Add too the end of a html-page:
//  <script src="imageGallery.js"></script>
// </body>
//
// Add an image-gallery-tag where you want 
// inside the html-page, containing all the images, 
// example:
//
// <image-gallery>
//   <img src="flower.jpg" alt="..." />
//   <img src="dog.jpg" alt="..." />
//   <img src="kitten.jpg" alt="..." />
// </image-gallery>
//
// Note:
// 'width: fit-content & -moz-fit-content'
// might not be supported on all browsers

(function() {
  const cur_color = "rgb(205,182,82)";
  const interval_timing = 5000; // In milliseconds

  // Use tags called <image-gallery> to initiate
  let gal = document.querySelectorAll("image-gallery");
  if ( !gal[0] ) {
    console.warn("imageGallery.js loaded, but no <image-gallery> tag found!")
    return;
  }

  // All styles for the different elements
  let container_style = "";
  container_style += "margin:0;";
  container_style += "overflow:hidden;";
  container_style += "padding:0;";
  container_style += "white-space:nowrap;";
  container_style += "scroll-behavior:smooth;";
  container_style += "line-height:0;";
  container_style += "background-position: center top;";
  container_style += "background-size: 500%;";
  container_style += "background-repeat: no-repeat;";
  // container_style += "background-attachment: fixed;";

  let figure_style = "";
  figure_style += "display: inline-block;";
  figure_style += "margin: 0;";
  figure_style += "padding: 0;";
  figure_style += "width: 100%;";
  figure_style += "position: relative;";
  figure_style += "overflow: hidden;";
  figure_style += "background-color: transparent;";
  figure_style += "background-color: rgba(0,0,0,0.3);";
  // figure_style += "background-position: center top;";
  // figure_style += "background-size: 300%;";
  // figure_style += "background-repeat: no-repeat;";
  // figure_style += "background-attachment: fixed;";

  let image_style = "";
  image_style += "display: inline-block;";
  image_style += "margin: 0 auto;";
  image_style += "padding: 0;";
  image_style += "max-width: 34rem;";
  image_style += "width: 100%;";
  image_style += "z-index: 3;";
  image_style += "position: relative;";

  // let cp_image_style = "";
  // cp_image_style += "display: inline-block;";
  // cp_image_style += "margin: 0;";
  // cp_image_style += "padding: 0;";
  // cp_image_style += "position: absolute;";
  // cp_image_style += "width: 100%;";
  // cp_image_style += "height: 100%;";
  // cp_image_style += "right: 0;";
  // cp_image_style += "bottom: 0;";
  // cp_image_style += "z-index: 2;";
  // cp_image_style += "image-rendering: pixelated;";
  // cp_image_style += "transform: scale(3) translateY(33%);";
  // cp_image_style += "filter: brightness(0.7);";

  let bullet_container_style = "";
  bullet_container_style += "display: block;";
  bullet_container_style += "list-style-type: none;";
  bullet_container_style += "margin: 0 auto;";
  bullet_container_style += "overflow: hidden;";
  bullet_container_style += "padding: 0;";
  bullet_container_style += "width: fit-content;";
  bullet_container_style += "width: -moz-fit-content;";
  bullet_container_style += "width: -webkit-fit-content;";

  let bullet_list_style = "";
  bullet_list_style += "cursor: pointer;";
  bullet_list_style += "float: left;";
  bullet_list_style += "font-size: 4rem;";
  bullet_list_style += "line-height: .33em;";
  bullet_list_style += "margin: .1em;";
   

  for( let g = 0; g < gal.length; g += 1) {
    let imgs = gal[g].children,
        bullets = [],
        current = null;

    // Create container (needed for scroll)
    let container = document.createElement("div");
    container.style.cssText = container_style;
    container.style.backgroundImage = "url(" + imgs[0].src + ")";

    // Create clickable bullet-list
    let list = document.createElement("ul");
    list.style.cssText = bullet_container_style;

    // Necessary for IE ref (see bottom script)
    let index = 0;
    //
    // Move images too container
    // And create bullet item for each image
    while( imgs.length > 0 ) {
      let image = imgs[0];
      // let cp_image = image.cloneNode( false );
      image.style.cssText = image_style;
      // cp_image.style.cssText = cp_image_style;

      // Create image container
      let figure = document.createElement("figure");
      figure.style.cssText = figure_style;
      // figure.style.backgroundImage = "url(" + image.src + ")";

      // Create bullet list item
      let bul = document.createElement("li");
      let bul_text = document.createTextNode("•")
      bul.style.cssText = bullet_list_style;
      bul.appendChild(bul_text)

      // Reference the bullet to corresponding img container
      // bul.img = image;
      bul.img = figure;
      bul.nr = index;
      index += 1;

      // Add ScrollTo-method when bullet is clicked
      bul.ScrollTo = function() {
          let dist = this.img.getBoundingClientRect().x - container.getBoundingClientRect().x;
          current = this;
          this.style.color = cur_color;
          /* IE fix: no scroll or scrollBy */
          if ( typeof container.scrollBy === "function" ) {
            container.scrollBy({
              left: dist,
              behavior: 'smooth'
            })
          } else if ( typeof container.scrollLeft === "number" ) {
            dist = container.scrollWidth;
            let total = container.children.length;
            container.scrollLeft = bul.nr * dist / total;
          }
          setTimeout(() => {
            container.style.backgroundImage = "url(" + this.img.querySelector("img").src + ")";
          },300);
      }

      // Add click event too bullet
      bul.addEventListener('click',() => {
          clearInterval(interval);
          interval = null;
          current.style.color = "black";
          bul.ScrollTo();
      })

      // Store for later reference
      bullets.push(bul);

      // Move image in the container
      // container.appendChild(image);
      // figure.appendChild(cp_image);
      figure.appendChild(image);
      container.appendChild(figure);
      
      // Move bullet in list
      list.appendChild(bul);
    }

    // Add the container and list too the image-gallery
    gal[g].appendChild(container)
    gal[g].appendChild(list)

    // Start at the first image in the gallery
    current = bullets[0];
    current.style.color = cur_color;

    // Some usefull functions
    function ScrollToNext() {
      if ( current.nextElementSibling ) {
        current.style.color = "black";
        current = current.nextElementSibling;
        current.ScrollTo();
        return true
      }
      else {
        return false
      }
    }

    function ScrollToPrev() {
      if ( current.previousElementSibling ) {
        current.style.color = "black";
        current = current.previousElementSibling;
        current.ScrollTo();
        return true
      }
      else {
        return false
      }
    }

    function ScrollToBegin() {
      current.style.color = "black";
      current = bullets[0];
      current.style.color = cur_color;
      /* IE fix: no scroll or scrollBy */
      if ( typeof container.scroll === "function" ) {
        container.scroll({
          left: 0,
          behavior: 'auto'
        })
      } else if ( typeof container.scrollLeft === "number" ) {
        container.scrollLeft = 0;
      }
      setTimeout(() => {
        container.style.backgroundImage = "url(" + current.img.querySelector("img").src + ")";
      },bullets.length*100);
    }

    // A click on container will reset slide-show
    container.addEventListener(
      'click',
      () => {
        if ( !ScrollToNext() ) {
          ScrollToBegin()
        }
        if ( !interval ) {
          StartSlideShow()
        }
      })

    // Needed for touch event (start/end)
    let prev = null;
    let start = null;

    // Add touch-events (for scrolling through pages)
    container.addEventListener(
      'touchstart',
      (e) => {
        clearInterval(interval)
        interval = null;
        start = e.touches[0].clientX; 
      },{ passive: true })

    container.addEventListener(
      'touchmove',
      (e) => { 
        let x = e.touches[0].clientX; 
        if ( prev ) { 
          /* IE fix: no scroll or scrollBy */
          if ( typeof container.scrollBy === "function" ) {
            container.scrollBy(prev - x,0) 
          } else if ( typeof container.scrollLeft === "number" ) {
            container.scrollLeft = prev - x;
          }
        } 
        prev = x; 
      },{ passive: true })

    container.addEventListener(
      'touchend',
      () => {
        if( start && prev ) {
          if ( start - prev > 0 ) {
            ScrollToNext()
          }
          else {
            ScrollToPrev()
          }
        }
        prev = null;
        start = null;
      })

    // The id of setInterval for reference
    let interval = null;

    // Automate scrolling on pageload
    function StartSlideShow() {
      interval = setInterval(function() {
        if ( !ScrollToNext() ) {
          ScrollToBegin()
        }
      },interval_timing);
    }

    // Start the slideshow
    StartSlideShow()
  }
})()
