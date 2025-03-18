//known issues
/**
 * Answers with long decimal parts aren't rounded, might overflow
 * Leading zeroes are present if operands are initialized with zeroes, be 
 * careful of: 
 * +"" which means numeric zero, 
 * just like, 
 * +"0" is numeric zero
 * Redundant code
 * Operations on negative numbers such as -5 * -5 might be problematic
 */

//seemingly corrected
/**
 * Divide by zero gets Infinity instead of snarky error message
 * Operation on the above result (or 0/0) will result in NaN
 * Issue where pressing the following buttons in order: 7 / =
 * gets 'you nutter'. This is due to empty string value of operandTwo, which 
 * results in 0 in the division by zero check +operandTwo === 0
 * Deleting a negative number using backspace until only minus is left causes 
 * operator press to be contained in operator while operandOne is '-'
 */

//todo
/**
 * decimal button, only one decimal allowed in (display?) an operand
 * backspace to undo last input
 * Consider arrays for operands (push and pop), and join during evaluation. 
 * Might be better than string concatenation.
 * keyboard support
 * class names / css styling / page styling
 * refactor round 2
 */

"use strict";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let operandOne = "";
let operator = "";
let operandTwo = "";

function operate(sign, num1, num2) {
    let result;

    switch(sign) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
        default:
            result = "Wrong sign!";
    }
    return result;
}

const doc = document;

function digitPressHandler(digitPressed, display) {
    if(operandOne !== "" && operator !== "" && operandTwo !== "") {
        operandTwo = operandTwo.toString() + digitPressed;
        display.textContent = operandOne + operator + operandTwo;
    }
    else if(operandOne !== "" && operator === "=" && operandTwo === "") {
        operandOne = digitPressed;
        operator = "";
        display.textContent = operandOne;
    }
    else if(operandOne !== "" && 
        ["+", "-", "*", "/"].includes(operator) && 
        operandTwo === "") 
        {
        operandTwo = digitPressed;
        display.textContent = operandOne + operator + operandTwo;
    }
    else if(operator === "" && operandTwo === "") {
        operandOne = operandOne.toString() + digitPressed;
        display.textContent = operandOne;
    } 
}

function operatorAndEqualsToPressHandler(signPressed, display) { 
    function displayToScreen(displayRef) {
        if(["+", "-", "*", "/"].includes(operator)) {
            displayRef.textContent = operandOne + operator;
        }
        else if(operator === "=") {
            displayRef.textContent = operator + operandOne;
        }
    }

    if(operandOne === "-" && operator === "" && operandTwo === "") {
        operandOne = "0";
        operator = signPressed;
        displayToScreen(display);
    }
    else if(operandOne !== "" && operator === "/" && operandTwo !== "" && 
        +operandTwo === 0) 
        {
        display.textContent = "you nutter";
        operandOne = operator = operandTwo = "";
    }
    else if(
        operandOne !== "" && operator !== "" && operandTwo !== "" && 
        !(operator === "/" && +operandTwo === 0)
    ) {
        let result = operate(operator, +operandOne, +operandTwo);
        operandOne = result;
        operator = signPressed;
        operandTwo = "";
        displayToScreen(display);
    }
    else if(operandOne !== "" && operandTwo === "") {
        operator = signPressed;
        displayToScreen(display);
    }
    else if(
        operandOne === "" && operator === "" && operandTwo === "" && 
        ["+", "-", "*", "/"].includes(signPressed)
    ) {
        operandOne = "0";
        operator = signPressed;
        displayToScreen(display);
    }
}

function clearPressHandler(display) {
    display.textContent = "0";
    operandOne = operator = operandTwo = "";    
}

function backspacePressHandler(display) {
    if(operandOne !== "" && operator !== "" && operandTwo !== "") {
        operandTwo = operandTwo.toString().slice(0, -1);
        display.textContent = operandOne + operator + operandTwo;
    }
    else if(operandOne !== "" && operator !== "" && operandTwo === "") {
        operator = "";
        display.textContent = operandOne;
    }
    else if(operandOne !== "" && operator === "" && operandTwo === "") {
        operandOne = operandOne.toString().slice(0, -1);

        if(operandOne !== "") {
            display.textContent = operandOne;
        }
        else {
            display.textContent = "0";
        }
    }
}

function decimalPointPressHandler() {
    /*
    if num1, operator, num2 are filled and num2 doesn't have a decimal point
        append a decimal point to num2

    else if num1 and operator is filled, num2 is empty
        overwrite num2 with "0."

    else if num1 is filled, operator and num2 are empty, and num1 doesn't have 
    a decimal point
        append a decimal point to num2
    
    else if num1, operator, num2 are empty
        overwrite num1 with "0."
    */
}

function buttonPressHandler(event) {
    const target = event.target;

    if(target.tagName === "BUTTON") {
        const buttonContent = target.textContent;
        const display = document.querySelector("p");

        switch(buttonContent) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                digitPressHandler(buttonContent, display);
                break;
            case "+":
            case "-":
            case "*":
            case "/":
            case "=":
                operatorAndEqualsToPressHandler(buttonContent, display);
                break;
            case "Clear":
                clearPressHandler(display);
                break;
            case "⌫":
                backspacePressHandler(display);
                break;
        }
    }
}

doc.addEventListener("click", buttonPressHandler);
