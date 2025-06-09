const content = document.getElementById('content');
const navLinks = document.querySelectorAll('.nav a');

const seblak = document.querySelector('.seblak2');
const wrapper = document.querySelector('.seblak-wrapper');

let floatAnimationId = null;

// Load awal animasi
window.addEventListener('load', () => {
  seblak.style.opacity = '1';
  seblak.style.transform = 'scale(1)';
  wrapper.style.right = '0';
  floatAnimationId = requestAnimationFrame(floatAnimation);
});

// Floating animation (opsional)
function floatAnimation() {
  const offset = Math.sin(Date.now() / 700) * 15;
  wrapper.style.transform = `translateY(calc(-50% + ${offset}px))`;
  floatAnimationId = requestAnimationFrame(floatAnimation);
}

// Ambil semua elemen asap
const asapElements = document.querySelectorAll('.asap');

function animateSmoke(el, delay = 0) {
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start - delay;

    if (progress > 0) {
      // Animasi menggunakan ease out quad agar lebih smooth
      const duration = 1000;
      const t = Math.min(progress / duration, 1);
      const eased = t * (2 - t);

      let translateY = 120 * eased;
      let scale = 1 + 0.5 * eased;
      let opacity = 0.3 * (1 - eased);

      el.style.transform = `translateY(${-translateY}px) scale(${scale})`;
      el.style.opacity = opacity;

      if (opacity > 0) {
        requestAnimationFrame(step);
      } else {
        el.style.transform = 'translateY(0) scale(1)';
        el.style.opacity = 0.3;
        start = null;
        setTimeout(() => requestAnimationFrame(step), 1000 + delay);
      }
    } else {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Jalankan animasi asap untuk setiap elemen dengan delay berbeda
asapElements.forEach((el, i) => {
  animateSmoke(el, i * 1000);
});

// === Drag & Drop untuk .seblak-wrapper ===
let isDragging = false;
let startX, startY;
let initialLeft, initialTop;

// Pastikan posisi absolute untuk drag
wrapper.style.position = 'absolute';

wrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  initialLeft = parseInt(window.getComputedStyle(wrapper).left, 10);
  initialTop = parseInt(window.getComputedStyle(wrapper).top, 10);

  // Hentikan animasi floating selama drag
  if (floatAnimationId) {
    cancelAnimationFrame(floatAnimationId);
    floatAnimationId = null;
  }

  // Hilangkan transform sementara agar drag konsisten
  wrapper.style.transform = 'translateY(0)';
});

window.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    // Mulai ulang animasi floating setelah drag selesai
    floatAnimationId = requestAnimationFrame(floatAnimation);
  }
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  wrapper.style.left = `${initialLeft + dx}px`;
  wrapper.style.top = `${initialTop + dy}px`;
});

const cards = document.querySelectorAll('.fakta-card');

  function revealOnScroll() {
    const triggerPoint = window.innerHeight * 0.85;

    cards.forEach((card, i) => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerPoint) {
        setTimeout(() => {
          card.classList.add('show');
        }, i * 150); // jeda antar kartu
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  const counter = document.getElementById('kalori-count');
  const kaloriBox = document.querySelector('.kalori-counter');

  let started = false;

  function animateKalori() {
    const top = counter.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (!started && top < windowHeight * 0.85) {
      started = true;
      kaloriBox.classList.add('show');
      let count = 0;
      const target = 700;
      const duration = 1000;
      const interval = 10;
      const step = target / (duration / interval);

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.innerText = target;
          clearInterval(timer);
        } else {
          counter.innerText = Math.floor(count);
        }
      }, interval);
    }
  }

  window.addEventListener('scroll', animateKalori);
  window.addEventListener('load', animateKalori);
  
  document.addEventListener('DOMContentLoaded', () => {
  const tipsList = document.querySelector('.tips-list');

  function checkVisibility() {
    const rect = tipsList.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight * 0.75) { // saat 75% tampilan viewport
      tipsList.classList.add('visible');
      window.removeEventListener('scroll', checkVisibility);
    }
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // cek saat load juga
});

  window.addEventListener('scroll', () => {
    const items = document.querySelectorAll('.testimoni');
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        item.classList.add('visible');
      }
    });
  });