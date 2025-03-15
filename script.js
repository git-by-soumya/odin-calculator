/*
Consider arrays for operands (push and pop), and join during evaluation.
Might be better than string concatenation.
Make a decision tree with state (button-entered, display, operands, operator) 
shown, i.e. 
state#0(no-button, display: 0?, operands and operator: null/[]), 
then events like: 
digit-button-press, 
operator-button-press, 
equal-to-button-press, 
clear-button-press, 
backspace-button-press, 
decimal-dot-button-press, 
each with its own arrow path to a new state and so on.
Try duplicate consecutive button presses, e.g. 
0 -> 0 
or
+ -> +
and so on.
Also, implement keyboard support.
*/


//known issues
/**
 * Answers with long decimal parts aren't rounded, might overflow
 * Divide by zero gets Infinity instead of snarky error message
 * Operation on the above result (or 0/0) will result in NaN
 * 
 */

//seemingly corrected
/**
 * problem of concatenation upon pressing = again after result seems to have 
 * gone away
 * Typed some numbers -> pressed = -> typing again will append to num1,
 * but,
 * typed some numbers -> pressed operator -> pressed = -> typing again will 
 * overwrite num1, seems inconsistent, so,
 * pressing = whether after number keys or operator keys should overwrite or 
 * append, not both. Preferably overwrite.
 * Care must be taken towards num2
 * Behaviour proceeds as follows:
 * num1 not empty, operator empty -> = press, press number, append to num1
 * num1 not empty, operator not empty -> = press, press number, overwrite num1
 */


//todo
/**
 * decimal button, only one decimal allowed in display and operands
 * backspace to undo last input
 * keyboard support
 * class names / css styling / page styling
 */


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

    switch (sign) {
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
let displayContent = "";

function buttonPressHandler(event) {
    const target = event.target;

    if (target.tagName === "BUTTON") {
        const buttonContent = target.textContent;
        const display = document.querySelector("p");

        switch (buttonContent) {
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
                if(operandOne !== "") {
                    if(operator !== "") {
                        if(operandTwo !== "") {
                            operandTwo = 
                            operandTwo.toString().concat(buttonContent);
                            display.textContent = 
                            operandOne + operator + operandTwo;
                        }
                        else if(operandTwo === "") {
                            if(operator === "=") {
                                operandOne = buttonContent;
                                operator = "";
                                display.textContent = operandOne;
                            }
                            else if(operator !== "=") {
                                operandTwo = buttonContent;
                                display.textContent = 
                                operandOne + operator + operandTwo;
                            }
                        }
                    }
                    else if(operator === "") {
                        operandOne = 
                        operandOne.toString().concat(buttonContent);
                        display.textContent = operandOne;
                    }
                }
                else if(operandOne === "") {
                    operandOne = buttonContent;
                    display.textContent = operandOne;
                }
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if(buttonContent !== "=") {
                    if(operandOne !== "") {
                        if(operator !== "") {
                            if(operandTwo !== "") {
                                let result = 
                                operate(operator, +operandOne, +operandTwo);
                                operandOne = result;
                                operator = buttonContent;
                                operandTwo = "";
                                display.textContent = 
                                operandOne.toString().concat(operator);                                            
                            }
                            else if(operandTwo === "") {
                                operator = buttonContent;
                                display.textContent = 
                                operandOne.toString().concat(operator);
                            }
                        }
                        else if(operator === "") {
                            operator = buttonContent;
                            display.textContent = 
                            operandOne.toString().concat(operator);                            
                        }
                    }
                    else if(operandOne === "") {
                        operandOne = "0";
                        operator = buttonContent;
                        display.textContent = 
                        operandOne.toString().concat(operator);
                    }
                }
                break;
            case "=":
                if(buttonContent === "=") {
                    if(operandOne !== "") {
                        if(operator !== "") {
                            if(operandTwo !== "") {
                                let result = 
                                operate(operator, +operandOne, +operandTwo);
                                operandOne = result;
                                operator = buttonContent;
                                operandTwo = "";
                                display.textContent = operandOne;
                            }
                            else if(operandTwo === "") {
                                operator = buttonContent;
                                display.textContent = operandOne;
                            }
                        }
                        else if(operator === "") {
                            operator = buttonContent;
                            display.textContent = operandOne;
                        }
                    }
                    else if(operandOne === "") {
                        //do nothing
                    }
                }
                break;
            case "Clear":
                display.textContent = 0;
                operandOne = "";
                operator = "";
                operandTwo = "";          
        }
    }
}

doc.addEventListener("click", buttonPressHandler);
