const track = document.querySelector('.tips-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const tipCards = document.querySelectorAll('.tip-card');

let currentSlide = 0;
const cardsPerPage = 3;
const totalSlides = Math.ceil(tipCards.length / cardsPerPage);

function updateCarousel() {
  const containerWidth = document.querySelector('.tips-carousel').offsetWidth;
  track.style.transform = `translateX(-${currentSlide * containerWidth}px)`;

  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide >= totalSlides - 1;
}

prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateCarousel();
  }
});

window.addEventListener('resize', updateCarousel);
updateCarousel(); // Initial setup

// Komentar
document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('commentForm');
  const nameInput = document.getElementById('nameInput');
  const commentInput = document.getElementById('commentInput');
  const commentsContainer = document.getElementById('commentsContainer');

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyQjRtCWjpMtrcwvk-E6XhVHzUJIOqJSXbZ9UlbeH73LKbirdGsU1Alnlc5R5zdXZ36/exec';

  // Ambil komentar dari Google Sheets
  async function fetchComments() {
    try {
      const res = await fetch(scriptURL + '?t=' + new Date().getTime()); // bypass cache
      const data = await res.json();
      renderComments(data);
    } catch (error) {
      console.error('Gagal ambil komentar:', error);
    }
  }

  // Tampilkan komentar ke halaman
  function renderComments(comments) {
    commentsContainer.innerHTML = '';
    comments.forEach((comment) => {
      const bubble = document.createElement('div');
      bubble.classList.add('chat-bubble');

      const nameEl = document.createElement('strong');
      nameEl.textContent = comment.name;

      const textEl = document.createElement('p');
      textEl.textContent = comment.text;

      bubble.appendChild(nameEl);
      bubble.appendChild(textEl);
      commentsContainer.appendChild(bubble);
    });
  }

  // Submit komentar
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const text = commentInput.value.trim();

    if (!name || !text) return;

    try {
      const res = await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text })
      });

      const result = await res.json();
      console.log('Komentar terkirim:', result);
      commentForm.reset();
      fetchComments(); // refresh komentar setelah kirim
    } catch (error) {
      console.error('Gagal kirim komentar:', error);
      alert('Komentar gagal dikirim. Cek koneksi atau izin akses Google Script.');
    }
  });

  fetchComments(); // ambil komentar saat halaman dimuat
});

//recipe

 document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const details = card.querySelector('.recipe-details');
      if (details) {
        details.style.display = details.style.display === 'block' ? 'none' : 'block';
      }
    });
  });