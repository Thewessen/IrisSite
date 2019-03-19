(function() {
  let art = document.querySelector("section");
  let nav = document.querySelector("nav");
  let header = document.getElementById("top");
  let footer = document.getElementById("bottom");
  let main = document.querySelector("main");
  let burger = document.getElementById("harpburger")

  function showNav() {
      // IE uses fireEvent...
    burger.fireEvent ?
    burger.fireEvent(new Event("click")) :
    burger.dispatchEvent(new Event("click"));
    window.removeEventListener("click", showNav, false);
    header.style.display = "block";
    footer.style.display = "block";
    main.className = "";
  };

  function showIntro() {
    header.style.display = "none";
    footer.style.display = "none";
    main.className = "intro";
  };

  window.addEventListener("DOMContentLoaded", showIntro, false);
  window.addEventListener("click", showNav, false);
  window.setTimeout(showNav, 5000);
})()
