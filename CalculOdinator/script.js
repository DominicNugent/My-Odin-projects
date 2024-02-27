//Handle all the button clicks, using buttonType to figure out which action is needed.
function btnClicked(event) {
    let clickTarget = event.target;
    let buttonType = clickTarget.classList.contains('calcBtn')
        ? clickTarget.classList.contains('number') ? 'number' :
        clickTarget.classList.contains('operator') ? 'operator' :
        clickTarget.classList.contains('modifier') ? 'modifier' :
        // Handle other cases if needed
        null
        : null;

        switch (buttonType) {
            case 'number':
                keyNum = clickTarget.textContent;
                
                if (operand2 === "0" || operand2 === null) {operand2 = "";}
                console.log("Processing num key: ", keyNum);
                // console.log({keyNum})
                // console.log({operand2});
                operand2 = operand2.concat(keyNum);
                updateReadout(operand2);
                //console.log("Operand2 is now: " + operand2);
                break;

            case 'operator':
                console.log('Operator button clicked. do wehave 2 values?');

                if (operand1 && operand2) {resolveExpression();}

                keyOperator = clickTarget.textContent;
                if (keyOperator !== "=") {
                    if (keyOperator === "÷") {keyOperator = "/"};
                    if (keyOperator === "x") {keyOperator = "*"}; //"×" alt multiplication char
                    operator = keyOperator;
                    //reshuffleOperands();
                } 

                console.log('Operator button clicked was: ' + operator);
                console.log("Do we resolve expression?");
                !operand1 ? reshuffleOperands() : null;
                !operand2 ? console.log("Don't resolve, operand2 is falsy:", operand2) : null;

                break;

            case 'modifier':
                keyMod = clickTarget.textContent;

                switch (keyMod) {
                    case 'AC': 
                        operand1 = "";
                        operand2 = "0";
                        operator = "";
                        updateReadout(operand2);
                        break;

                    case 'CE': 
                        operand2 = "0";
                        updateReadout(operand2);
                        break;

                    case 'DEL': 
                        if (operand2 !== '') {
                            operand2 = operand2.slice(0, -1);
                            if (operand2 == 0) {operand2 = "0"};
                            updateReadout(operand2);
                        }
                        break;
                }
                console.log('Modifier button clicked: ' + keyMod);
                break;

            default:
                // Placeholder action for unknown button
                console.log('Unknown button clicked');
        }

        console.log("Btn click processing done, operands are:");
        console.log({operand1});
        console.log({operand2});
        console.log("-----");
    
}

// darken whatever button is pressed then revert it right after.
function showBtnPress(event) {

    function darkenColor(color) {
        let rgb = color.substring(4, color.length - 1).replace(/ /g, '').split(',');
        let darkenedRgb = rgb.map(value => Math.max(parseInt(value) - 50, 0));
        return `rgb(${darkenedRgb.join(',')})`;
    }

    // console.log('darken the button');
    let thisButton = event.target;
    let currentBackgroundColor = window.getComputedStyle(thisButton).backgroundColor;
    let darkenedBackgroundColor = darkenColor(currentBackgroundColor);
    thisButton.style.backgroundColor = darkenedBackgroundColor;

    // Revert the color after a delay 
    setTimeout(() => {
        thisButton.style.backgroundColor = currentBackgroundColor;
    }, 300);
}

function reshuffleOperands() {
    console.log('reshuffle operands!');
    operand1 = operand2;
    operand2 = ""; //null
    console.log({operand1});
    console.log({operand2});
}

//what does expression equal?
function resolveExpression() {
    let thisExpression = operand1 + operator + operand2;
    console.log("Resolve expression! Combined and indiv values are: ");
    console.log({thisExpression});
    console.log({operand1});
    console.log({operator});
    console.log({operand2});
    let result = eval(thisExpression);
    console.log(`Expression result = ${result}`);
    updateReadout(result);

    operand1 = "";
    operand2 = result.toString();
    
}

function updateReadout(displayNum) {
    // Ensure the displayNum is represented as a 10-character string, prefixed with underscores if needed.
    let numString = displayNum.toString();
    while (numString.length < 10) numString = "_" + numString;
    document.querySelector("#readout").textContent = numString;
}


// Attach btnClicked to all calculator buttons in btnGroup to get things rolling.
document.querySelector('#btnGroup').addEventListener('click', btnClicked);
document.querySelector('#btnGroup').addEventListener('click', showBtnPress);

let operand1 = "";
let operand2 = "0";
let operator = "";