 const dots = document.querySelectorAll('.dot');
  let index = 0;

  setInterval(() => {
    dots.forEach((dot, i) => {
      dot.style.opacity = i === index ? '1' : '0.2';
    });
    index = (index + 1) % dots.length;
  }, 300);

  setTimeout(() => { window.location.href = 'homepage.html';}, 3000);