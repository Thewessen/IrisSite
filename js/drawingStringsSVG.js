(function() {
// Constants
// =================================
const header_width_breakpoint = 768,
      header_height = window.innerWidth < header_width_breakpoint ?
                      90 : 135;
      footer_height = window.innerWidth < header_width_breakpoint ?
                      60 : 90;
      string_distance = window.innerWidth < header_width_breakpoint ?
                        20 : 40;
      header_margin = window.innerWidth < header_width_breakpoint ?
                      10 : 20;
      string_x1 = window.innerWidth < header_width_breakpoint ?
                  40 : 60;
      string_x2 = 0,
      string_y1 = 0,
      string_y2 = window.innerWidth < header_width_breakpoint ?
                  60 : 90;
      stroke_width = 1,
      red_string_color = "rgb(237,28,36)",
      blue_string_color = "rgb(53,79,162)",
      white_string_color = "rgb(35,31,32)";

// All elements needed
// =================================
let footer = document.getElementById("footer");
if ( !footer ) {
  console.err(`
    drawingLinesSVG.js loaded but no svg with id='footer' found.
    Both a svg with id='header' and id='footer' are necessary,
    for this script to run properly.
    `)
  return;
}
let header = document.getElementById("header");
if ( !header ) {
  console.err(`
    drawingLinesSVG.js loaded but no svg with id='header' found.
    Both a svg with id='header' and id='footer' are necessary,
    for this script to run properly.
    `)
  return;
}
let harpburger = document.getElementById("harpburger")
if ( !harpburger ) {
  console.warn("No svg with id='harpburger' detected. Unable to create click event.");
}
let main = document.querySelector("main"),
    nav = document.getElementById("menu");
if( !main || !nav ) {
  console.warn("There are no main and/or nav tags to swap");
}
// Set all the proper styles
main.style.opacity = 1;
main.style.display = "flex";
nav.style.opacity = 0;
nav.style.display = "none";
let isOpen = true;

// Helper functions
// =================================
// Checks if argument is a function
function isFunction(it) {
  return Object.prototype.toString.call(it) === "[object Function]";
}
// Set attributes on element
function setAttributes( elem, attrs ) {
  for( key in attrs ) {
    elem.setAttribute( key, attrs[key] );
  };
}
// Creating animations
function animate( obj, prop, end, time, callback ) {
  // More error-testcases are needed...
  if( time % 5 !== 0 ) {
    console.warn("Animation time not dividable by 5. Set different..")
    return;
  };
  let reverse = obj[prop] > end;
  let id = setInterval( reverse ? revAnimation : animation, 5 );
  let incr = ( end - parseFloat(obj[prop]) ) / ( time / 5 );
  function revAnimation() {
    if( obj[prop] <= end ) {
      clearInterval( id );
      if( isFunction(callback) ) {
        callback();
      };
    } else {
      obj[prop] = parseFloat(obj[prop]) + incr;
    };
  }
  function animation() {
    if( obj[prop] >= end ) {
      clearInterval( id );
      if( isFunction(callback) ) {
        callback();
      };
    } else {
      obj[prop] = parseFloat(obj[prop]) + incr;
    };
  }
}

// Main
// =================================
function reCreateLines() {
  // Dimensions of strings
  let dims = {
        "x1": string_x1 + header_margin,
        "x2": string_x2 + header_margin,
        "y1": string_y1,
        "y2": string_y2,
        "stroke-width": stroke_width,
        "stroke": ""
      };

  // Dimension of image
  header.parentElement.setAttribute( "height", header_height );
  footer.parentElement.setAttribute( "height", footer_height );

  // Remove all lines that exists
  while( footer.firstChild ) {
    footer.firstChild.remove()
  }
  while( header.firstChild ) {
    header.firstChild.remove()
  }

  // Create new lines
  for(let i = 0; dims.x1 + header_margin <= window.innerWidth; i += 1) {
    dims.stroke = strokeColor( i );
    createNewLine( footer, dims );
    createNewLine( header, dims );
    dims.x1 += string_distance;
    dims.x2 += string_distance;
  }

  // create extra line for header (for burger icon)
  dims.stroke = strokeColor( header.children.length );
  createNewLine( header, dims );

  // create burger icon
  createBurgerIcon( header );
}

function strokeColor( st_nr ) {
  if ( st_nr % 7 === 0 ) {
    return red_string_color;
  } else if ( st_nr % 7 === 3 ) {
    return blue_string_color;
  } else {
    return white_string_color;
  };
}

function createNewLine( container, dims ) {
  // Creates a 'normal' string
  let line = document.createElementNS( "http://www.w3.org/2000/svg", "line" );
  setAttributes( line, dims )
  container.appendChild( line )
}

function grabBurgerIcon() {
  // The burger strings
  let sts = Array.from( header.children );
  return sts.slice( sts.length - 3 );
}

function createBurgerIcon( elem ) {
  let x1 = string_x1 + header_margin,
      x2 = string_x2 + header_margin, 
      y1 = string_y1, 
      y2 = string_y2;

  let diff_x = ( x1 - x2 ) / 2,
      diff_y = ( y2 - y1 ) / 2;

  let sts = grabBurgerIcon();
  // Correct last three strings
  for( let st of sts ) {
    let dims = {
      "x1": parseInt( st.getAttribute( "x1" ) ) - diff_x,
      "x2": parseInt( st.getAttribute( "x2" ) ) - diff_x,
      "y1": parseInt( st.getAttribute( "y1" ) ) + diff_y,
      "y2": parseInt( st.getAttribute( "y2" ) ) + diff_y,
      "stroke-width": stroke_width * 2
    };
    setAttributes( st, dims );
  }
  sts[1].style.opacity = 1;
  if ( !isOpen ) {
    sts[1].style.opacity = 0;
    sts[0].setAttribute("x2", sts[2].getAttribute("x1") );
    sts[2].setAttribute("x2", sts[0].getAttribute("x1") );
  };
}

function openMenu() {
  let sts = grabBurgerIcon();
  let delta = string_x1 - string_x2;
  animate( nav.style, "opacity", 0, 200 );
  animate( sts[2].x2.baseVal, "value", sts[2].getAttribute("x1") - delta, 200 );
  animate( sts[0].x2.baseVal, "value", sts[0].getAttribute("x1") - delta, 200, () => {
    nav.style.display = "none";
    animate( main.style, "opacity", 1, 100 );
    animate( sts[1].style, "opacity", 1, 100 );
    main.style.display = "flex";
    isOpen = true;
  });
}

function closeMenu() {
  let sts = grabBurgerIcon();
  animate( main.style, "opacity", 0, 100 );
  animate( sts[1].style, "opacity", 0, 100, () => {
    main.style.display = "none";
    animate( sts[0].x2.baseVal, "value", sts[2].getAttribute("x1"), 200 );
    animate( sts[2].x2.baseVal, "value", sts[0].getAttribute("x1"), 200 );
    animate( nav.style, "opacity", 1, 200 );
    nav.style.display = "block";
    isOpen = false;
  });
}

// Eventlisteners
// =================================
let onceSupported = false;
try {
  let options = {
    get once() { onceSupported = true; }
  };
  window.addEventListener( "test", options, options );
  window.removeEventListener( "test", options, options );
} catch( err ) {
  passiveSupported = false;
};
window.addEventListener( "DOMContentLoaded", reCreateLines,
  onceSupported ? { once: true } : false );
if( harpburger) { document.getElementById("harpburger").addEventListener(
  "click", () =>  { isOpen ? closeMenu() : openMenu(); } ); };
window.addEventListener( "resize", reCreateLines, false );
window.addEventListener( "orientationchange", reCreateLines, false );
})()
