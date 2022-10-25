var video = document.getElementById("myVideo");
var btn = document.getElementById("myBtn");

function myFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "";
  } else {
    video.pause();
    btn.innerHTML = "";
  }
}

window.addEventListener("load", function () {
  const links = [...document.querySelectorAll(".menu-link")];
  links.forEach((item) => item.addEventListener("mouseenter", handleHoverLink));

  function handleHoverLink(event) {
    console.log(event.target);
  }
} );