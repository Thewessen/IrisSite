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
//   <img src="flower.jpg" />
//   <img src="dog.jpg" />
//   <img src="kitten.jpg" />
// </image-gallery>
//(You can add aditional styles to the immage-gallery-tag)
//
// Note:
// 'width: fit-content & -moz-fit-content'
// might not be supported on all browsers

(function() {
  const cur_color = "rgb(206,127,43)";
  const interval_timing = 2000; // In milliseconds

  // All styles for the different elements
  let container_style = "";
  container_style += "margin:2em 0;";
  container_style += "overflow-x:auto;";
  container_style += "overflow:hidden;";
  container_style += "padding:0;";
  container_style += "white-space:nowrap;";

  let image_style = "";
  image_style += "display: inline-block;";
  image_style += "width: 100%;";
  image_style += "float: none;";
  image_style += "margin: 0;";
  image_style += "padding: 0;";

  let bullet_container_style = "";
  bullet_container_style += "display: block;";
  bullet_container_style += "margin: 0 auto;";
  bullet_container_style += "padding: 0;";
  bullet_container_style += "overflow: hidden;";
  bullet_container_style += "list-style-type: none;";
  bullet_container_style += "width: fit-content;";
  bullet_container_style += "width: -moz-fit-content;";
  bullet_container_style += "transform: translateY(-2em);";

  let bullet_list_style = "";
  bullet_list_style += "float: left;";
  bullet_list_style += "margin: 0 .1em;";
  bullet_list_style += "font-size: 5em;";
  bullet_list_style += "line-height: .33em;";
  bullet_list_style += "cursor: pointer;";

  // Use tags called <image-gallery> to initiate
  let gal = document.getElementsByTagName("image-gallery");

  for( let g = 0; g < gal.length; g += 1) {
    let imgs = gal[g].children,
        bullets = [],
        current = null;

    // Create image container (needed for scroll)
    let container = document.createElement('div');
    container.style.cssText = container_style;

    // Create clickable bullet-list
    let list = document.createElement("ul");
    list.style.cssText = bullet_container_style;

    // Move images too container
    // And create bullet item for each image
    while( imgs.length > 0 ) {
      let image = imgs[0];
      image.style.cssText = image_style;

      // Create bullet list item
      let bul = document.createElement("li");
      let bul_text = document.createTextNode("•")
      bul.style.cssText = bullet_list_style;
      bul.appendChild(bul_text)

      // Reference the bullet to corresponding img
      bul.img = image;

      // Add ScrollTo-method when bullet is clicked
      bul.ScrollTo = function() {
          let dist = this.img.getBoundingClientRect().x - container.getBoundingClientRect().x;
          current = this;
          this.style.color = cur_color;
          container.scrollBy({
            left: dist,
            behavior: 'smooth'
          })
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
      container.appendChild(image)
      
      // Move bullet in list
      list.appendChild(bul)
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
      container.scroll({
        left: 0,
        behavior: 'auto'
      })
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
      })

    container.addEventListener(
      'touchmove',
      (e) => { 
        let x = e.touches[0].clientX; 
        if ( prev ) { 
          container.scrollBy(prev - x,0) 
        } 
        prev = x; 
      })

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
