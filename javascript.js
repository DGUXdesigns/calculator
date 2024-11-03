let storedValue = null;
let currentOperator = "";
let isNewInput = false; 
let isResultDisplayed = false;
const display = document.querySelector('.display');

//Display functions
function appendToDisplay(input) {
    if (input === "." && display.value.includes(".")) {
        // If display already has a decimal, ignore additional "."
        return;
    }

    if (isNewInput) {
        if (input !== ".") {
            display.value = "";
        }
        isNewInput = false;
    }

    if (isNewInput || isResultDisplayed) {
        display.value = "";
        isNewInput = false;
        isResultDisplayed = true; // Reset the flag
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
    isResultDisplayed = false;
}

// Store the current display value and set the operator
function setOperator(operator) {
    if (storedValue === null) {
        storedValue = parseFloat(display.value);
    } else if (currentOperator) {
        const newValue = parseFloat(display.value);
        storedValue = operate(storedValue, currentOperator, newValue);
        display.value = storedValue;
    }
    
    currentOperator = operator; // Update to the new operator
    isNewInput = true; // Set flag to indicate the next input is a new number
    isResultDisplayed = false;
}

// Calculate the result based on stored value, operator, and new input
function calculate() {
    if (storedValue !== null && currentOperator && display.value) {
        const newValue = parseFloat(display.value); 
        display.value = operate(storedValue, currentOperator, newValue);
        storedValue = null; // Clear stored value after calculation
        currentOperator = "";
        isResultDisplayed = true;
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
        return "Error";
    }
    return num1 / num2;
};

//operate function
function operate(value1, operator, value2) {
    let result;
    
    switch(operator) {
        case '+':
            result = add(value1, value2);
            break;
        case '-':
            result = subtract(value1, value2);
            break;
        case '*':
            result = multiply(value1, value2);
            break;
        case '/':
            result = divide(value1, value2);
            break;
        default:
            result = "Error";
    };
    
    if (typeof result === "number") {
        result = parseFloat(result.toFixed(8)); // Set max decimals to 8 without trailing zeroes
    }
    return result;
};