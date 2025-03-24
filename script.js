//known issues
/**
 * Leading zeroes are present if operands are initialized with zeroes, be 
 * careful of: 
 * +"" which means numeric zero, 
 * just like, 
 * +"0" is numeric zero
 * Redundant code
 * Operations on negative numbers such as -5 * -5 might be problematic
 * Website button selection and input using TAB and Enter keys is not supported.
 * Noted issues where too small screen size(width or height) can squeeze the 
 * main-container to be smaller than display and buttons. Bigger screen / 
 * fullscreen display also stretches the UI.
 * Noted issue? where the scrollbar, which is normally at the end if displayed, 
 * can be positioned slightly left if display is sized to fullscreen from 
 * normal screen.
 * Answers with long decimal parts aren't rounded, might show recurring numbers
 * 12.12 * 10 shows 121.1999999999999 recurring decimal
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
 * Issue where operandOne is filled, operator is equals to, and pressing 
 * decimal button leads to operandTwo getting filled, instead of operandOne.
 * Operations such as 123456789 * 123456789 lengthens the display until it is 
 * larger than the button container! Consider limiting the number of characters 
 * in an operand(not digits, as it may contain the negation symbol or - and/or 
 * the decimal point).
 * 12 characters seems to be the limit; try for 11 or 10 to be safe.
 * Noted issue? where typing 0 - 0.11111111111111111111 (20 1's after decimal 
 * point), puts text "0-" at the top and the 2nd operand at the bottom, i.e. the 
 * 1st operand & the operator is on first row, while the 2nd operand is on 
 * second row. Edit: the problem is with minus. If an expression with minus 
 * overflows (any operand), the above behaviour shows up. Edit 2: THe issue has 
 * been solved using a relatively new feature, text-wrap-mode. But the actual 
 * cause was not found.
 */

//todo
/**
 * Validate html, css
 * Check css overview in DevTools
 * Check performance scores in DevTools
 * Check sustainability scores
 * Class names / css styling / page styling
 * Consider putting operandOne, operandTwo, operator and the result in 
 * different rows.
 * Refactor round 2
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
    display.scrollBy(display.scrollWidth, 0);
}

function operatorAndEqualsToPressHandler(signPressed, display) { 
    function displayToScreen(displayRef) {
        if(["+", "-", "*", "/"].includes(operator)) {
            displayRef.textContent = operandOne + operator;
        }
        else if(operator === "=") {
            displayRef.textContent = operator + operandOne;
        }
        displayRef.scrollBy(displayRef.scrollWidth, 0);
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
        operandOne = result.toString();
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
    display.scrollBy(display.scrollWidth, 0);
}

function clearPressHandler(display) {
    display.textContent = "0";
    operandOne = operator = operandTwo = "";
    display.scrollBy(display.scrollWidth, 0); 
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
    display.scrollBy(display.scrollWidth, 0);
}

function decimalPointPressHandler(display) {
    if(operandOne !== "" && operator !== "" && !(operandTwo.includes("."))) {
        if(operator === "=") {
            operandOne = "0.";
            operator = "";
            display.textContent = operandOne;
        }
        else {
            operandTwo = operandTwo === "" ? "0." : (operandTwo + ".");
            display.textContent = operandOne + operator + operandTwo;
        }
    }
    else if(
        !(operandOne.includes(".")) && operator === "" && operandTwo === ""
    ) {
        operandOne = operandOne === "" ? "0." : (operandOne + ".");
        display.textContent = operandOne;
    }
    display.scrollBy(display.scrollWidth, 0);
}

function handler(event) {
    const type = event.type;
    let buttonContent;
    if(type === "keydown") {
        buttonContent = event.key;
    }
    else if(type === "click" && event.target.tagName === "BUTTON") {
        buttonContent = event.target.textContent;
    }
    else {
        return;
    }
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
        case "Enter":
            buttonContent = buttonContent === "Enter" ? "=" : buttonContent;
            operatorAndEqualsToPressHandler(buttonContent, display);
            break;                        
        case "Clear":
            clearPressHandler(display);
            break;
        case "⌫":
        case "Backspace":
            backspacePressHandler(display);
            break;
        case ".":
            decimalPointPressHandler(display);
            break;
    }
}

doc.addEventListener("click", handler);
doc.addEventListener("keydown", handler);
