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
    if(operandOne !== "" && operator !== "" && operandTwo === "0") {
        operandTwo = digitPressed;
    }
    else if(operandOne !== "" && operator !== "" && operandTwo !== "") {
        operandTwo = operandTwo.toString() + digitPressed;
    }
    else if(operandOne !== "" && operator === "=" && operandTwo === "") {
        operandOne = digitPressed;
        operator = "";
    }
    else if(operandOne !== "" && 
        ["+", "-", "*", "/"].includes(operator) && 
        operandTwo === "") 
        {
        operandTwo = digitPressed;
    }
    else if(operandOne === "0" && operator === "" && operandTwo === "") {
        operandOne = digitPressed;
    }
    else if(operator === "" && operandTwo === "") {
        operandOne = operandOne.toString() + digitPressed;
    }

    display.textContent = operandOne + operator + operandTwo;
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
    }

    if(operandOne === "-" && operator === "" && operandTwo === "") {
        operandOne = "0";
        operator = signPressed;
    }
    else if(
        operandOne !== "" && operator === "/" && operandTwo !== "" && 
        +operandTwo === 0
    ) {
        display.textContent = "you nutter";
        operandOne = operator = operandTwo = "";
    }
    else if(operandOne !== "" && operator !== "" && operandTwo !== "") {
        let result = operate(operator, +operandOne, +operandTwo);
        operandOne = result.toString();
        operator = signPressed;
        operandTwo = "";
    }
    else if(operandOne !== "" && operandTwo === "") {
        operator = signPressed;
    }
    else if(
        operandOne === "" && operator === "" && operandTwo === "" && 
        ["+", "-", "*", "/"].includes(signPressed)
    ) {
        operandOne = "0";
        operator = signPressed;
    }

    displayToScreen(display);
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
    }
    else if(operandOne !== "" && operator !== "" && operandTwo === "") {
        operator = "";
    }
    else if(operandOne !== "" && operator === "" && operandTwo === "") {
        operandOne = operandOne.toString().slice(0, -1);
    }

    display.textContent = operandOne !== "" ? 
    operandOne + operator + operandTwo : "0";
    display.scrollBy(display.scrollWidth, 0);
}

function decimalPointPressHandler(display) {
    if(operator === "=") {
        operandOne = "0.";
        operator = operandTwo = "";
    }
    else if(
        operandOne !== "" && operator !== "" && !(operandTwo.includes("."))
    ) {
        operandTwo = operandTwo === "" ? "0." : (operandTwo + ".");
    }
    else if(
        !(operandOne.includes(".")) && operator === "" && operandTwo === ""
    ) {
        operandOne = operandOne === "" ? "0." : (operandOne + ".");
    }

    display.textContent = operandOne + operator + operandTwo;
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


//todo
/**
 * Validate html, css
 * Check css overview in DevTools
 * Check performance scores in DevTools
 * Check sustainability scores
 * Consider putting operandOne, operandTwo, operator and the result in 
 * different rows.
 * Refactor round 2
 */

//known issues
/**
 * Redundant code
 * Operations on negative numbers such as -5 * -5 might be problematic (might 
 * need multiple rows to display expression/expression parsing algorithm-stack?)
 * Website button selection and input using TAB and Enter keys is not supported.
 * Noted issues where too small screen size(width or height) can squeeze the 
 * main-container to be smaller than display and buttons. Bigger screen / 
 * fullscreen display also stretches the UI.
 * Noted issue? where the scrollbar, which is normally at the end if displayed, 
 * can be positioned slightly left if display is sized to fullscreen(F11) from 
 * normal screen. Edit: It returns to the end if F11(fullscreen toggle) is 
 * pressed again.
 * Answers with long decimal parts aren't rounded, might show recurring numbers
 * 12.12 * 10 shows 121.1999999999999 recurring decimal
 */
