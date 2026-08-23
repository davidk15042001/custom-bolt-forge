document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector(".menu-toggle");
  var menu = document.querySelector(".primary-menu");
  if (!button || !menu) return;
  button.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });
});
