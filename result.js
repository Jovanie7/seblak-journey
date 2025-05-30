function downloadResult() {
  html2canvas(document.body).then(canvas => {
    const link = document.createElement('a');
    link.download = 'hasil-seblak.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
const params = new URLSearchParams(window.location.search);
const kalori = params.get("result");
const protein = params.get("protein");

if (kalori !== null && protein !== null)
document.getElementById("result").innerText = `${kalori} Kalori, ${protein}g Protein`; else {
  document.getElementById("result").innerText = "Tidak ada hasil";
}

console.log("Kalori dari URL:", kalori);
console.log("Protein dari URL:", protein);
