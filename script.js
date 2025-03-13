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

let operandOne;
let operator;
let operandTwo;

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
                displayContent = displayContent + buttonContent;
                display.textContent = displayContent;
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                let lastChar = display.textContent.at(-1);
                if(
                    lastChar === "+" || 
                    lastChar === "-" || 
                    lastChar === "*" || 
                    lastChar === "/") {
                        displayContent = 
                        display.textContent.slice(0, -1) + 
                        buttonContent;
                        display.textContent = displayContent;
                        break;
                    }
                    else {
                        displayContent = display.textContent + buttonContent;
                        display.textContent = displayContent;
                        break;
                    }
            case "=":
                let operatorIndex = displayContent
                .split("")
                .findIndex(
                    ch => 
                    ch === "+" || ch === "-" || ch === "*" || ch === "/"
                );
                operator = displayContent.at(operatorIndex);
                operandOne = +displayContent.slice(0, operatorIndex);
                operandTwo = +displayContent.slice(operatorIndex + 1);
                let result = operate(operator, operandOne, operandTwo);
                displayContent = +result;
                display.textContent = displayContent;
                break;
        }
    }
}

doc.addEventListener("click", digitPressHandler);

/*
let expressionObj = {
number1: null,
operator: null,
number2: null,
}

When a number is pressed, 
    if number1 is filled/not null,
        and if operator is filled/not null,
            and if number2 is filled/not null,
                then concat to number2 and, 
                display number1 operator number2
            else if number2 is not filled/null,
                and if operator is =,
                    overwrite number1 with new number and, 
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

    When a result is displayed, pressing a new digit should clear the result and
     start a new calculation instead of appending the digit to the existing 
     result. Check whether this is the case on your calculator!
    After pressing =, getting and displaying a result, if a symbol is pressed, 
    the displayed number is taken into number1, but if a number is pressed, then
     the displayed number is overwritten.
*/