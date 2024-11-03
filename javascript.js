// let storedValue = null;
const display = document.querySelector('.display');
// Variables to store operands, operator, and the display value
// let currentOperand = "";
// let previousOperand = "";
// let currentOperator = null;
// let shouldResetDisplay = false; // To clear display after an operation

function appendToDisplay(input) {
    display.value += input;
};

function clearDisplay() {
    display.value = ""
};

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