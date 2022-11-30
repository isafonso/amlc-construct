var slider = document.getElementById("slider");
var btnLeft = document.getElementById("left");
var btnRight = document.getElementById("right");
var windowWidth = window.innerWidth.toString();

btnLeft.addEventListener("click", () => {
  try {
    slider.style.width -= windowWidth + "px";
  } catch (error) {
    console.log("impossible handle the function coz", error);
  }
});

btnRight.addEventListener("click", () => {
  console.log(windowWidth);
  try {
    slider.style.width += windowWidth + "px";
  } catch (error) {
    console.log("impossible handle the function coz", error);
  }
});

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "vertical",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
