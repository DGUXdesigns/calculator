let storedValue = null;
let isNewInput = false; 
const display = document.querySelector('.display');

//Display functions
function appendToDisplay(input) {
    if (isNewInput) {
        display.value = "";
        isNewInput = false; // Reset the flag
    }
    display.value += input;
}

function negativeValue() {
    display.value = parseFloat(display.value) * (-1);
}

function clearDisplay() {
    display.value = "";
    storedValue = null;
    currentOperator = "";
    isNewInput = false;
}

// Store the current display value and set the operator
function setOperator(operator) {
    if (display.value) {
        storedValue = parseFloat(display.value);
        currentOperator = operator;
        isNewInput = true;
    }
}

// Calculate the result based on stored value, operator, and new input
function calculate() {
    if (storedValue !== null && currentOperator && display.value) {
        const newValue = parseFloat(display.value); 
        display.value = operate(storedValue, currentOperator, newValue);
        storedValue = null; // Clear stored value after calculation
        currentOperator = "";
    } else {
        display.value = "Error"; 
    }
}

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