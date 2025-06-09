window.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.opacity = 1;
    logo.style.transform = 'scale(1)';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const kaki1 = document.querySelector('.kaki-1');
  const kaki2 = document.querySelector('.kaki-2');

  // Contoh: pause & resume animation saat hover
  const kakiWrapper = document.querySelector('.kaki-wrapper');

  kakiWrapper.addEventListener('mouseenter', () => {
    kaki1.style.animationPlayState = 'paused';
    kaki2.style.animationPlayState = 'paused';
  });

  kakiWrapper.addEventListener('mouseleave', () => {
    kaki1.style.animationPlayState = 'running';
    kaki2.style.animationPlayState = 'running';  });
});
