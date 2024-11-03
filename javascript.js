let storedValue = null;
const display = document.querySelector('.display');

//Display functions
function appendToDisplay(input) {
    display.value += input;
};

function clearDisplay() {
    display.value = ""
};

//Store Values
function storeDisplayValue() {
    if (display.value) { // Only store if there’s a value in the display
        storedValue = parseFloat(display.value);
        display.value = ""; // Clear display after storing
    }
;}


//Calculate values
function calculate() {
    const expression = display.value;
    const operatorMatch = expression.match(/[\+\-\*\/]/); // Find the first operator in the string

    if (operatorMatch) {
        const operator = operatorMatch[0];
        const [value1, value2] = expression.split(operator).map(Number); // Split by operator and convert to numbers

        if (!isNaN(value1) && !isNaN(value2)) {
            display.value = operate(value1, operator, value2);
        } else {
            display.value = "Error"; // Handle invalid inputs
        }
    } else if (storedValue !== null) {
        // Use storedValue if there's no operator in the current display
        display.value = storedValue;
        storedValue = null; // Clear storedValue after using it
    } else {
        display.value = "Error"; // Handle case where no operator is found
    };
};


//Basic operations
function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    if (num2 === 0) {
        throw new Error("Cannot divide by zero");
    }
    return num1 / num2;
};


//operate function
function operate(value1, operator, value2) {
    switch(operator) {
        case '+':
            return add(value1, value2);
        case '-':
            return subtract(value1,value2);
        case '*':
            return multiply(value1, value2);
        case '/': 
            return divide(value1, value2);
        default:
            return "Error";
    };
};