const expr = document.getElementById("expr");
const display = document.getElementById("result");
const buttons = document.querySelectorAll(".key");

let currentInput= "";
let  operator = "";
let previousInput = "";

// Loop through all buttons
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const value = btn.textContent;

            // Clear
            if (value === "AC") {
            currentInput = "";
            previousInput = "";
            operator = "";
            expr.textContent = "";
            display.textContent = "0";
            return;
            }

            // Backspace
            if (value === "⌫") {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || "0";
            return;
            }

                // Equals
        if (value === "=") {
        if (previousInput && operator && currentInput) {
            const result = calculate(
            Number(previousInput),
            Number(currentInput),
            operator
            );
            expr.textContent = `${previousInput} ${operator} ${currentInput}`;
            display.textContent = result;
            currentInput = result.toString();
            previousInput = "";
            operator = "";
        }
        return;
    }
            // Operators
            if (["+", "-", "x", "÷"].includes(value)) {
            if (currentInput === "") return;
            operator = value;
            previousInput = currentInput;
            expr.textContent = `${previousInput} ${operator}`;
            currentInput = "";
            return;
            }

            // Numbers & decimal
        if (!isNaN(value) || value === ".") {
            currentInput += value;
            display.textContent = currentInput;
        }
    });
});

function calculate(a, b, op) {
    switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "x": return a * b;
    case "÷": return b === 0 ? "Error" : a / b;
    default: return 0;
    }
}