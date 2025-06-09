function hitungKalori() {
  const gender = document.getElementById("gender").value;
  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const activity = parseFloat(document.getElementById("activity").value);
  const hasil = document.getElementById("hasilKalori");

  hasil.style.color = "#3e3e3e"; // warna default pesan

  // Validasi input
  if (!gender || (gender !== "male" && gender !== "female")) {
    tampilkanPesan("🚻 Silakan pilih jenis kelamin.");
    return; // Hentikan fungsi, jangan lanjut
  }

  if (isNaN(age) || age < 1 || age > 120) {
    tampilkanPesan("⚠️ Usia tidak valid. Coba isi lagi ya!");
    return; // Hentikan fungsi, jangan lanjut
  }

  if (isNaN(weight) || weight < 1) {
    tampilkanPesan("⚖️ Berat badan tidak boleh kosong atau kurang dari 1 kg.");
    return; // Hentikan fungsi, jangan lanjut
  }

  if (isNaN(height) || height < 1) {
    tampilkanPesan("📏 Tinggi badan belum diisi atau tidak valid.");
    return; // Hentikan fungsi, jangan lanjut
  }

  if (isNaN(activity) || activity < 1) {
    tampilkanPesan("🏃‍♀️ Aktivitas fisik belum dipilih.");
    return; // Hentikan fungsi, jangan lanjut
  }

  // Hitung BMR
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Hitung total kalori
  const totalKalori = bmr * activity;

  // Simpan ke localStorage (optional, bisa dihapus kalau gak perlu)
  localStorage.setItem("totalKalori", Math.round(totalKalori));

  // Tampilkan hasil di halaman yang sama
  hasil.style.color = "#2e7d32";
  hasil.innerHTML = `
    🔥 Kalori harianmu sekitar <span style="color:#ff6f61;">${Math.round(totalKalori)}</span> kalori.<br>
    💡 Untuk diet sehat, kurangi ±500 kalori/hari.<br>
    💪 Untuk bulking, tambah ±500 kalori/hari.
  `;
}

function tampilkanPesan(pesan) {
  const hasil = document.getElementById("hasilKalori");
  hasil.innerText = pesan;
  hasil.style.color = "#d32f2f";
}
