(function() {
  let art = document.querySelector("section");
  let nav = document.querySelector("nav");
  let header = document.getElementById("top");
  let footer = document.getElementById("bottom");
  let body = document.body;
  let burger = document.getElementById("harpburger")

  function showNav() {
      // IE uses fireEvent...
    burger.fireEvent ?
    burger.fireEvent(new Event("click")) :
    burger.dispatchEvent(new Event("click"));

    // Remove existing events
    window.removeEventListener("click", showNav, false);
    window.removeEventListener("scroll", showNav, false);
    window.clearTimeout(id);
    header.style.display = "block";
    footer.style.display = "block";

    // Remove background image
    body.className = "";
  };

  function showIntro() {
    header.style.display = "none";
    footer.style.display = "none";
    body.className = "intro";
  };

  window.addEventListener("DOMContentLoaded", showIntro, false);
  window.addEventListener("click", showNav, false);
  window.addEventListener("scroll", showNav, false);
  let id = window.setTimeout(showNav, 5000);
})()
