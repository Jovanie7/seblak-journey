const selectedToppings = [];

function addTopping(calories, protein, imageSrc) {
  selectedToppings.push({ calories, protein });

  const display = document.getElementById("display");
  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "Topping";
  img.classList.add("topping-img");
  display.appendChild(img);
}

function appendValue(value) {
  const displayText = document.getElementById("displayText");
  const current = displayText.value;
  const lastChar = current.charAt(current.length - 1);

  if (current === "") {
    if (isOperator(value)) {
      displayText.value = "error";
      return;
    } else {
      displayText.value = value;
      return;
    }
  }

  displayText.value += value;
}

function isOperator(char) {
  return char === "+";
}

function cleardisplay() {
  const display = document.getElementById("display");
  display.innerHTML = "";
  selectedToppings.length = 0;
}

function deleteLast() {
  const display = document.getElementById("display");
  if (display.lastChild) {
    display.removeChild(display.lastChild);
    selectedToppings.pop();
  }
}

function calculate() {
  let totalCalories = 0;
  let totalProtein = 0;

  selectedToppings.forEach((t) => {
    totalCalories += t.calories;
    totalProtein += t.protein;
  });

  const query = `result=${encodeURIComponent(totalCalories)}&protein=${totalProtein}`;
  console.log("Redirecting with:", totalCalories, totalProtein);
  window.location.href = `result.html?${query}`;
}

function appendPlus() {
  const display = document.getElementById('display');
  if (!display) {
    console.error("Elemen #display tidak ditemukan!");
    return;
  }
  display.innerHTML += '<span style="margin: 0 4px; font-size: 24px;">+</span>';
}
