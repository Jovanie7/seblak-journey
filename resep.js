// Struktur data resep:
// [
//   {
//     id: 'timestamp_or_uuid',
//     name: 'Nama Resep',
//     ingredients: [
//       { name: 'Kerupuk', calories: 230, protein: 7 },
//       { name: 'Telur', calories: 75, protein: 6 },
//       ...
//     ],
//     totalCalories: 305,
//     totalProtein: 13,
//     likes: 0,
//     comments: [
//       { name: 'Andi', text: 'Mantap nih resep!' },
//       ...
//     ]
//   },
//   ...
// ]

// Ambil data resep dari localStorage atau inisialisasi array kosong
let recipes = JSON.parse(localStorage.getItem('seblakRecipes')) || [];

// Utility untuk menyimpan ke localStorage
function saveRecipes() {
  localStorage.setItem('seblakRecipes', JSON.stringify(recipes));
}

// ------- BAGIAN FORM SUBMIT RESEP -------
const recipeForm = document.getElementById('recipeForm');
const ingredientsContainer = document.getElementById('ingredientsContainer');
const totalCalSpan = document.getElementById('totalCalories');
const totalProtSpan = document.getElementById('totalProtein');
let ingredientCount = 0;

// Fungsi menambahkan baris input bahan secara dinamis
function addIngredientRow(name='', cal='', prot='') {
  ingredientCount++;
  const row = document.createElement('div');
  row.classList.add('ingredient-row');
  row.dataset.rowId = ingredientCount;

  row.innerHTML = `
    <input type="text" class="ing-name" placeholder="Nama Bahan" value="${name}" required>
    <input type="number" class="ing-cal" placeholder="Kalori" value="${cal}" min="0" required>
    <input type="number" class="ing-prot" placeholder="Protein (g)" value="${prot}" min="0" required>
    <button type="button" class="remove-btn">×</button>
  `;

  // Hapus baris jika tombol × diklik
  row.querySelector('.remove-btn').addEventListener('click', () => {
    row.remove();
    updateTotals();
  });

  // Update total saat nilai berubah
  row.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updateTotals);
  });

  ingredientsContainer.appendChild(row);
}

// Hitung total kalori & protein
function updateTotals() {
  let totalCal = 0, totalProt = 0;
  document.querySelectorAll('.ingredient-row').forEach(row => {
    const c = parseInt(row.querySelector('.ing-cal').value) || 0;
    const p = parseInt(row.querySelector('.ing-prot').value) || 0;
    totalCal += c;
    totalProt += p;
  });
  totalCalSpan.textContent = totalCal;
  totalProtSpan.textContent = totalProt;
}

// Tambah baris input pertama
addIngredientRow();

// Tombol “Tambah Bahan”
document.getElementById('addIngredientBtn').addEventListener('click', () => {
  addIngredientRow();
});

// Menangani submit form
recipeForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('recipeName').value.trim();
  if (!name) return;

  // Kumpulkan data bahan
  const ingredientRows = document.querySelectorAll('.ingredient-row');
  const ingredients = [];
  ingredientRows.forEach(row => {
    const ingName = row.querySelector('.ing-name').value.trim();
    const ingCal = parseInt(row.querySelector('.ing-cal').value) || 0;
    const ingProt = parseInt(row.querySelector('.ing-prot').value) || 0;
    if (ingName) {
      ingredients.push({ name: ingName, calories: ingCal, protein: ingProt });
    }
  });

  // Hitung total
  const totalCalories = ingredients.reduce((sum, i) => sum + i.calories, 0);
  const totalProtein = ingredients.reduce((sum, i) => sum + i.protein, 0);

  // Buat objek resep baru
  const newRecipe = {
    id: Date.now().toString(),
    name,
    ingredients,
    totalCalories,
    totalProtein,
    likes: 0,
    comments: []
  };

  recipes.unshift(newRecipe);
  saveRecipes();
  renderRecipes();

  // Reset form
  recipeForm.reset();
  ingredientsContainer.innerHTML = '';
  addIngredientRow();
  updateTotals();
});


// ------- BAGIAN RENDER RESEP -------
const recipesList = document.getElementById('recipesList');

function renderRecipes() {
  recipesList.innerHTML = '';

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    // Header card: nama resep
    const header = document.createElement('div');
    header.classList.add('card-header');
    header.textContent = recipe.name;
    card.appendChild(header);

    // Body card: daftar bahan + nutrisi + tombol like + komentar
    const body = document.createElement('div');
    body.classList.add('card-body');

    // Daftar bahan
    const ingList = document.createElement('ul');
    recipe.ingredients.forEach(i => {
      const li = document.createElement('li');
      li.textContent = `${i.name} — ${i.calories} kkal, ${i.protein} g protein`;
      ingList.appendChild(li);
    });
    body.appendChild(ingList);

    // Nutrisi total
    const nutri = document.createElement('p');
    nutri.classList.add('nutrition');
    nutri.textContent = `Total: ${recipe.totalCalories} kkal, ${recipe.totalProtein} g protein`;
    body.appendChild(nutri);

    // Bagian reactions (like)
    const reactionDiv = document.createElement('div');
    reactionDiv.classList.add('reactions');
    const likeBtn = document.createElement('button');
    likeBtn.textContent = `👍 Like (${recipe.likes})`;
    likeBtn.addEventListener('click', () => {
      recipe.likes++;
      saveRecipes();
      renderRecipes();
    });
    reactionDiv.appendChild(likeBtn);
    body.appendChild(reactionDiv);

    // Bagian komentar
    const commentSection = document.createElement('div');
    commentSection.classList.add('comment-section');

    const commentTitle = document.createElement('h3');
    commentTitle.textContent = 'Komentar:';
    commentSection.appendChild(commentTitle);

    const commentList = document.createElement('div');
    commentList.classList.add('comment-list');
    recipe.comments.forEach(c => {
      const commentItem = document.createElement('div');
      commentItem.classList.add('comment-item');
      commentItem.innerHTML = `<strong>${c.name}:</strong> <p>${c.text}</p>`;
      commentList.appendChild(commentItem);
    });
    commentSection.appendChild(commentList);

    // Form komentar baru
    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form');

    commentForm.innerHTML = `
      <input type="text" class="commenter-name" placeholder="Nama Anda" required>
      <textarea class="comment-text" placeholder="Tulis komentar..." required></textarea>
      <button type="submit">Kirim Komentar</button>
    `;

    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const commenterName = commentForm.querySelector('.commenter-name').value.trim();
      const commentText = commentForm.querySelector('.comment-text').value.trim();
      if (!commenterName || !commentText) return;

      recipe.comments.push({ name: commenterName, text: commentText });
      saveRecipes();
      renderRecipes();
    });

    commentSection.appendChild(commentForm);
    body.appendChild(commentSection);

    card.appendChild(body);
    recipesList.appendChild(card);
  });
}

renderRecipes();
