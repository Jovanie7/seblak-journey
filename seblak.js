const selectedToppings = [];

function addTopping(calories, protein) {
    selectedToppings.push({calories, protein});
}

function appendValue(value) {
    const display = document.getElementById("display");
    const current = display.value;
    const lastChar = current.charAt(display.value.length - 1);

    if (current === "") {
        if (isOperator(value)) {
            display.value = "error";
            return;
        } else {
            display.value = value;
            return;
        }
    }

    if (!isOperator(lastChar) && !isOperator(value)) {
        display.value = "error";
        return;
    }
    
    display.value += value;
}

function isOperator(char) {
    return char === '+';
}

function cleardisplay() {
    document.getElementById("display").value = "";
}

function calculate() {
    const display = document.getElementById("display");
    try {
        const result = eval(display.value);

        let totalCalories = 0;
        let totalProtein = 0;
        selectedToppings.forEach(t => {
            totalCalories += t.calories;
            totalProtein += t.protein;
        });

        // Kirim data ke result.html
       const query = `result=${encodeURIComponent(totalCalories)}&protein=${totalProtein}`;
window.location.href = `result.html?${query}`;


    } catch {
        display.value = "error";
    }
}

const result = eval(display.value); // Hitung total kalori

        // Hitung total protein dari selectedToppings
        let totalProtein = 0;
        selectedToppings.forEach(t => {
  totalCalories += t.calories;
  totalProtein += t.protein;
});
         console.log("Redirecting with:", totalCalories, totalProtein);

         window.location.href = `result.html?result=${totalCalories}&protein=${totalProtein}`;

function deleteLast() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}