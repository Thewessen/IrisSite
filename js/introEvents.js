(function() {
  let art = document.getElementById('content');
  let nav = document.getElementById('nav');
  let header = document.getElementById('top');
  let footer = document.getElementById('bottom');

  function showNav() {
    art.style.display = "none";
    nav.style.display = "block";
    nav.style.opacity = "1";
    header.style.display = "block";
    footer.style.display = "block";
  };

  function showIntro() {
    header.style.display = "none";
    footer.style.display = "none";
  };

  window.addEventListener('DOMContentLoaded', showIntro, false);
  window.addEventListener('scroll', showNav, false);
  window.addEventListener('click', showNav, false);
  // window.setTimeout(showNav, 5000);
})()
