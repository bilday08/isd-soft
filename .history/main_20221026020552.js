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
  const line = document.createElement("div");
  line.className = "line-effect";
  document.body.appendChild(line);
  function handleHoverLink(event) {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    console.log({ left, top, width, height, });
    const offsetBottom = 17;
    line.style.width = `${width}px`;
    line.style.left = `${left}px`;
    line.style.top = `${top + height + offsetBottom}px`;
  }
} );