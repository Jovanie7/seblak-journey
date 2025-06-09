// Reveal animation saat discroll
function revealOnScroll() {
  const elements = document.querySelectorAll('.chat-bubble');
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

document.addEventListener("DOMContentLoaded", function () {
  const foto = document.querySelector(".interactive-image");
  foto.addEventListener("click", function () {
    foto.classList.toggle("glossy-effect");
  });
});
