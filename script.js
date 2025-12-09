let currentInput = '0';
let operator = null;
let previousInput = null;
let heartCount = 5; // initial number of hearts

const display = document.getElementById('display');

// Display update
function updateDisplay() {
    display.value = currentInput;
}

// Number input
function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

// Operator input
function setOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    currentInput = '0';
    operator = op;
}

// Calculation
function calculate() {
    if (operator === null || previousInput === null) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
        case '%': result = prev % current; break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = null;
    updateDisplay();
}
function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}


// Clear display
function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    updateDisplay();
}

// Delete last
function deleteLast() {
    if (currentInput.length <= 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Heart button
function heartAction() {
    clearDisplay();  
    spawnHearts();
    heartCount += 5; // increase number of hearts next click
}

// Spawn hearts over page
function spawnHearts() {
    const container = document.getElementById('hearts-container');
    const calc = document.querySelector('.calculator-body');
    const calcRect = calc.getBoundingClientRect();

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');

            let x, y;
            let safe = false;
            while (!safe) {
                x = Math.random() * (window.innerWidth - 30);
                y = Math.random() * (window.innerHeight - 30);

                // check if heart overlaps calculator
                if (
                    x < calcRect.left - 10 || // left side
                    x > calcRect.right + 10 || // right side
                    y < calcRect.top - 10 || // top
                    y > calcRect.bottom + 10 // bottom
                ) {
                    safe = true;
                }
            }

            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;

            container.appendChild(heart);

            setTimeout(() => container.removeChild(heart), 3000);
        }, i * 50);
    }
}
