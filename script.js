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

function display(content) {
    
}

function digitPressHandler(event) {
    const target = event.target;
    if (target.tagName === "BUTTON") {
        const buttonContent = target.textContent;
        const display = document.querySelector("p");
        const signs = {
            "+": 0,
            "-": 0,
            "*": 0,
            "/": 0,
        };
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

/*
default display: 0
any number press: replace with number
obj signs = {"+":0,...,}
any operator press: 
    check if any property in obj is 1 in displaycontent, then get vars, evalThen
    concatenate with operator
after numbers press when operator is pressed,
    checks if there is any operator before
        if there is operate with num1, num2, and operator
    if not, put number in operand1 or 2 whichever is empty
number operator number , another operator then operate before than print sign 
after

*/


doc.addEventListener("click", digitPressHandler);

/*displayContent =
                 signs.includes(displayContent.at(-1)) ?
                  displayContent.slice(0, -1) + buttonContent :
                   displayContent + buttonContent;
                display(displayContent);
                operator = buttonContent;
                operandOne = +displayContent.slice(0, -1);*/
                /*
                let currentDisplay = displayContent
                    .split("")
                    .reduce((obj, ch) => {
                        if (ch in obj) {
                            obj[ch]++;
                        }
                        return obj;
                    },
                        {
                            "+": 0,
                            "-": 0,
                            "*": 0,
                            "/": 0,
                        });
                operator = (currentDisplay) => {
                    for (const key in currentDisplay) {
                        if (currentDisplay[key] === 1) {
                            return key;
                        }
                    }
                }
                let operatorIndex = displayContent
                    .split("")
                    .findIndex(ch => ch === "+");
                operandOne = +displayContent.slice(0, operatorIndex);
                operandTwo = +displayContent.slice(operatorIndex + 1);
                let result = operate(operator, operandOne, operandTwo);
                displayContent = result.toString() + operator;
                display(displayContent);
                break;
                */