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
let displayContent = "";

function display(content) {
    const display = document.querySelector("p");
    display.textContent = content;
}

function digitPressHandler(event) {
    const target = event.target;
    if(target.tagName === "BUTTON") {
        const buttonContent = target.textContent;
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
                displayContent = displayContent + buttonContent;
                display(displayContent);
                break;
        }
    }
}

doc.addEventListener("click", digitPressHandler);