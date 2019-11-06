/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load("particles-js", "assets/particles.json", function() {
  console.log("callback - particles.js config loaded");
});

const menu = document.querySelector(".menu");
const hamburger = document.querySelector(".hamburger");
const toggleNav = () => {
  menu.classList.toggle("visible");
  const items = [...document.querySelectorAll(".menu-item")];
  items.forEach(item => item.classList.toggle("disp"));
};

hamburger.addEventListener("click", toggleNav);
