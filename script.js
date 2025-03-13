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

function digitPressHandler(event) {
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
                /*
When a number is pressed, 
    if number1 is filled/not null,
        and if operator is filled/not null,
            and if number2 is filled/not null,
                then concat to number2 and, 
                display number1 operator number2
            else if number2 is not filled/null,
                and if operator is =,
                    overwrite number1 with new number and, 
                    set operator to null and, 
                    display number1
                else if operator is not =,
                    then write to number2 and, 
                    display number1 operator number2
        else if operator is not filled/null,
            concat to number1 and, 
            display number1
    else if number1 is not filled/null,
        write to number1 and, 
        display number1
*/
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
            case "=":
                /*
When a symbol is pressed, 
    if symbol is among + - * /, 
        if number1 is filled/not null,
            and if operator is filled/not null,
                and if number2 is filled/not null,
                    then eval expression and, 
                    put result into number1, 
                    and put current symbol press into operator, 
                    and write number2 to null and, 
                    display number1 operator
                else if number2 is not filled/null,
                    then overwrite operator and, 
                    display number1 operator
            else if operator is not filled/null,
                write to operator and, 
                display number1 operator
        else if number1 is not filled/null,
            write number1 from display, 
            and write operator and, 
            display number1 operator
    else if symbol is =, 
        if number1 is filled/not null,
            and if operator is filled/not null,
                and if number2 is filled/not null,
                    then eval expression and, 
                    put result into number1, 
                    and write = to operator, 
                    and write number2 to null and, 
                    display number1
                else if number2 is not filled/null,
                    then write operator to null, 
                    display number1
            else if operator is not filled/null,
                display number1
        else if number1 is not filled/null,
            do nothing
*/
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
                        operandOne = display.textContent;
                        operator = buttonContent;
                        display.textContent = 
                        operandOne.toString().concat(operator);
                    }
                }
                else if(buttonContent === "=") {
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
                                operator = "";
                                display.textContent = operandOne;
                            }
                        }
                        else if(operator === "") {
                            display.textContent = operandOne;
                        }
                    }
                    else if(operandOne === "") {
                        //do nothing
                    }
                }
                break;
        }
    }
}

doc.addEventListener("click", digitPressHandler);

/*
let expressionObj = {
number1: "",
operator: "",
number2: "",
}

    When a result is displayed, pressing a new digit should clear the result and
     start a new calculation instead of appending the digit to the existing 
     result. Check whether this is the case on your calculator!
    After pressing =, getting and displaying a result, if a symbol is pressed, 
    the displayed number is taken into number1, but if a number is pressed, then
     the displayed number is overwritten.
*/

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
Also, implement keyboard support.
*/