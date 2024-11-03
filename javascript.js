let storedValue = null;
let currentOperator = "";
let isNewInput = false; 
let isResultDisplayed = false;
const display = document.querySelector('.display');

display.value = "0";

//Display functions
function appendToDisplay(input) {
    if (input === "." && display.value.includes(".")) {
        // If display already has a decimal, ignore additional "."
        return;
    };

    if (isNewInput) {
        if (input !== ".") {
            display.value = "";
        }
        isNewInput = false;
    };

    if (isNewInput || isResultDisplayed) {
        display.value = "";
        isNewInput = false;
        isResultDisplayed = true; // Reset the flag
    };

    if (display.value === "0") { 
        display.value = input;
    } else {
        display.value += input;
    }
};

function backSpace() {
    display.value = display.value.slice(0, -1);

    if (display.value === "") {
        display.value = "0";
        isResultDisplayed = false;
        isNewInput = true;
    }
};

function negativeValue() {
    display.value = parseFloat(display.value) * (-1);
};

function clearDisplay() {
    display.value = "0";
    display.value = "";
    storedValue = null;
    currentOperator = "";
    isNewInput = false;
    isResultDisplayed = false;
};

// Store the current display value and set the operator
function setOperator(operator) {
    if (storedValue === null) {
        storedValue = parseFloat(display.value);
    } else if (currentOperator) {
        const newValue = parseFloat(display.value);
        storedValue = operate(storedValue, currentOperator, newValue);
        display.value = storedValue;
    };
    
    currentOperator = operator; // Update to the new operator
    isNewInput = true; // Set flag to indicate the next input is a new number
    isResultDisplayed = false;
};

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
    };
    return result;
};

//calculate percentages
function calculatePercentage() {
    if (display.value) {
        const currentValue = parseFloat(display.value);

        if (storedValue !== null && currentOperator) {
            // Calculate the percentage of the stored value
            const percentageValue = (storedValue * currentValue) / 100;
            // Apply the percentage in the context of the last operation
            const result = operate(storedValue, currentOperator, percentageValue);
            display.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
            storedValue = result; // Update stored value for further calculations
        } else {
            // If no operator exists, just display the percentage
            display.value = Number.isInteger(currentValue / 100) ? currentValue / 100 : parseFloat((currentValue / 100).toFixed(8));
        };
    };
};

//Keyboard Support
// Keyboard support
function handleKeyPress(event) {
    const key = event.key;

    // Define key mappings for calculator operations
    const operatorKeys = {
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        'Enter': '=', // Calculate the result
        'Backspace': 'backspace', // Remove last character
        'Escape': 'clear' // Clear display
    };

    // Check for number keys (0-9)
    if (!isNaN(key)) {
        appendToDisplay(key);
    } 
    // Check for operator keys
    else if (operatorKeys[key]) {
        if (key === 'Enter') {
            calculate();
        } else if (key === 'Backspace') {
            backSpace();
        } else if (key === 'Escape') {
            clearDisplay();
        } else {
            setOperator(operatorKeys[key]);
        }
    } 
    // Check for decimal point
    else if (key === '.') {
        appendToDisplay('.');
    }
}

// Add event listener for keyboard input
document.addEventListener('keydown', handleKeyPress);