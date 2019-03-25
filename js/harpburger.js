window.addEventListener("load", function() {
  // This function should be initialized on load
  // When content is visible,
  // and nav is closed.
  // 
  // Small check for elements
if ( !document.getElementById("harpburger") ) {
  console.warn("No svg with id='harpburger' detected. Unable to create click event.");
  return;
}

function isFunction(it) {
  return Object.prototype.toString.call(it) === "[object Function]";
}

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

// Get all the elements needed
let art = document.querySelector('main'),
    nav = document.getElementById('menu'),
    sts = document.getElementById('header').children;

// The burger strings
let st1 = sts[sts.length - 3],
    st2 = sts[sts.length - 2],
    st3 = sts[sts.length - 1];

// Set all the proper styles
st2.style.opacity = 1;
art.style.opacity = 1;
nav.style.opacity = 0;
nav.style.display = "none";
art.style.display = "flex";

let isOpen = true;

document.getElementById("harpburger").addEventListener(
  'click', function() {
    console.log('click!');
    if( isOpen ) {
      animate( art.style, "opacity", 0, 100 );
      animate( st2.style, "opacity", 0, 100, () => {
        art.style.display = "none";
        animate( st1.x2.baseVal, "value", st3.getAttribute('x1'), 200 );
        animate( st3.x2.baseVal, "value", st1.getAttribute('x1'), 200 );
        animate( nav.style, "opacity", 1, 200 );
        nav.style.display = "block";
        isOpen = false;
      });
    } else {
      let delta = parseInt(st2.getAttribute('x1')) - parseInt(st2.getAttribute('x2'));
      animate( nav.style, "opacity", 0, 200 );
      animate( st1.x2.baseVal, "value", st1.getAttribute('x1') - delta, 200 );
      animate( st3.x2.baseVal, "value", st3.getAttribute('x1') - delta, 200, () => {
        nav.style.display = "none";
        animate( art.style, "opacity", 1, 100 );
        animate( st2.style, "opacity", 1, 100 );
        art.style.display = "flex";
        isOpen = true;
      });
    }
  })
})
