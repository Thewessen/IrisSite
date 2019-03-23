(function() {

// All elements needed
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
  return;
}
let art = document.querySelector("main"),
    nav = document.getElementById("menu");
if( !art || !nav ) {
  console.warn("There are no article and/or nav tags to swap");
}

// Checks if argument is a function
function isFunction(it) {
  return Object.prototype.toString.call(it) === "[object Function]";
}

// Helps to set attributes on element
function setAttributes( elem, args ) {
  for( key in args ) {
    elem.setAttribute( key, args[key] );
  };
}

// Helps creating animations
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

function reCreateLines() {
  // Dimensions of strings
  let st_dist = window.innerWidth < 768 ? 20 : 40,        // Nr of pixels on the left and right of the img.
      marg = window.innerWidth < 768 ? 10 : 20,           // Distance between lines (horizontally)
      dims = {
        "x1": (window.innerWidth < 768 ? 40 : 60) + marg, // First x-coord of line
        "x2": 0 + marg,                                   // Last x-coord of the line
        "y1": 0,                                          // First y-coord of line
        "y2": window.innerWidth < 768 ? 60 : 90,          // Last y-coord of line
        "stroke-width": 1,                                // String width
        "stroke": ""                                      // Color of stroke
      };

  // Dimension of image
  window.innerWidth < 768 ?
  header.parentElement.setAttribute( "height", "90" ) :
  header.parentElement.setAttribute( "height", "135" );

  window.innerWidth < 768 ?
  footer.parentElement.setAttribute( "height", "60" ) :
  footer.parentElement.setAttribute( "height", "90" );

  // Remove all lines that exists
  while( footer.firstChild ) {
    footer.firstChild.remove()
  }
  while( header.firstChild ) {
    header.firstChild.remove()
  }

  // Create new lines
  for(let i = 0; dims.x1 + marg <= window.innerWidth; i += 1) {
    dims.stroke = strokeColor( i );
    createNewLine( footer, dims );
    createNewLine( header, dims );
    dims.x1 += st_dist;
    dims.x2 += st_dist;
  }

  // create extra line for header (for burger icon)
  dims.stroke = strokeColor( header.children.length );
  createNewLine( header, dims );

  // create burger icon
  createBurgerIcon( header );
}

function strokeColor( st_nr ) {
  if ( st_nr % 7 === 0 ) {
    return "rgb(237,28,36)";
  } else if ( st_nr % 7 === 3 ) {
    return "rgb(53,79,162)";
  } else {
    return "rgb(35,31,32)";
  };
}

function createNewLine( container, dims ) {
  // Creates a 'normal' string
  let line = document.createElementNS( "http://www.w3.org/2000/svg", "line" );
  setAttributes( line, dims )
  container.appendChild( line )
}

function createBurgerIcon( elem ) {
  let x1 = elem.firstElementChild.getAttribute("x1"),
      x2 = elem.firstElementChild.getAttribute("x2"), 
      y1 = elem.firstElementChild.getAttribute("y1"), 
      y2 = elem.firstElementChild.getAttribute("y2");

  let diff_x = ( x1 - x2 ) / 2,
      diff_y = ( y2 - y1 ) / 2;

  // Correct last three strings
  for( let b = 1; b < 4; b += 1 ) {
    let line = elem.children[ elem.children.length - b ];
    let dims = {
      "x1": parseInt( line.getAttribute( "x1" ) ) - diff_x,
      "x2": parseInt( line.getAttribute( "x2" ) ) - diff_x,
      "y1": parseInt( line.getAttribute( "y1" ) ) + diff_y,
      "y2": parseInt( line.getAttribute( "y2" ) ) + diff_y,
      "stroke-width": parseInt( line.getAttribute( "stroke-width" ) ) * 2
    };
    setAttributes( line, dims );
  };
  let st1 = elem.children[ elem.children.length - 3 ];
  let st2 = elem.children[ elem.children.length - 2 ];
  let st3 = elem.children[ elem.children.length - 1 ];
  st2.style.opacity = 1;
  if ( !isOpen ) {
    st2.style.opacity = 0;
    st1.setAttribute("x2", st3.getAttribute("x1") );
    st3.setAttribute("x2", st1.getAttribute("x1") );
  };
}

let sts = header.children;
let st1, st2, st3 = {};

// Set all the proper styles
art.style.opacity = 1;
art.style.display = "block";
nav.style.opacity = 0;
nav.style.display = "none";

let isOpen = true;

function grabBurgerIcon() {
  // The burger strings
  st1 = sts[sts.length - 3];
  st2 = sts[sts.length - 2];
  st3 = sts[sts.length - 1];
}

document.getElementById("harpburger").addEventListener(
  "click", function() {
  if( isOpen ) {
    animate( art.style, "opacity", 0, 100 );
    animate( st2.style, "opacity", 0, 100, () => {
      art.style.display = "none";
      animate( st1.x2.baseVal, "value", st3.getAttribute("x1"), 200 );
      animate( st3.x2.baseVal, "value", st1.getAttribute("x1"), 200 );
      animate( nav.style, "opacity", 1, 200 );
      nav.style.display = "block";
      isOpen = false;
    });
  } else {
    let delta = parseInt(st2.getAttribute("x1")) - parseInt(st2.getAttribute("x2"));
    animate( nav.style, "opacity", 0, 200 );
    animate( st3.x2.baseVal, "value", st3.getAttribute("x1") - delta, 200 );
    animate( st1.x2.baseVal, "value", st1.getAttribute("x1") - delta, 200, () => {
      nav.style.display = "none";
      animate( art.style, "opacity", 1, 100 );
      animate( st2.style, "opacity", 1, 100 );
      art.style.display = "block";
      isOpen = true;
    });
  }
})

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
window.addEventListener( "load", grabBurgerIcon, false );
window.addEventListener( "resize", reCreateLines, false );
window.addEventListener( "resize", grabBurgerIcon, false );
window.addEventListener( "orientationchange", reCreateLines, false );
window.addEventListener( "orientationchange", grabBurgerIcon, false );
})()
