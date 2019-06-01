(function() {
let indices = [
  {
      link:   './zaal.html',
      content:'zaal theater'
  },{
      link:   './locatie.html',
      content:'locatie projecten'
  },{
      link:   './agenda.html',
      content:'agenda'
  },{
      // link:   './biografie.html',
      content:'biografie'
  },{
      // link:   './contact.html',
      content:'contact'
  }
];

// Checks if argument is a function
function isFunction(it) {
  return Object.prototype.toString.call(it) === "[object Function]";
}

// Helps to set attributes on element
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
// find root elements
let nav = document.getElementById( 'menu' );
if ( nav ) {
  let lust = document.createElement( 'ul' );
  // Create list items
  for( let i = 0; i < indices.length; i += 1 ) {
    let span, link,
        content = document.createTextNode(indices[i].content) || "",
        list = document.createElement( 'li' );

    if(indices[i].link) {
      link = document.createElement( 'a' );
      link.href=indices[i].link;
      link.appendChild( list );
    }

    if(content) {
      span = document.createElement( 'span' );
      function mouseEnter() {
          span.style.borderBottom='1px solid #1C1C1C';
      }
      function mouseLeave() {
          span.style.borderBottom='none';
      }
      list.addEventListener( 'mouseenter', mouseEnter );
      list.addEventListener( 'mouseleave', mouseLeave );
      list.addEventListener( 'click',() => {
        animate( lust.style,"opacity",0,100,() => {
          lust.style.display = "none";
        });
      });
      span.appendChild( content );
      list.appendChild( span );
    }
    lust.appendChild( link ? link : list );
  }
  // add elements to the DOM
  nav.appendChild( lust );
}
})();
