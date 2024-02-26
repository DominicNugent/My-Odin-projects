function updateReadout(displayNum) {
    // Ensure the displayNum is represented as a 10-character string, prefixed with underscores if needed.
    let numString = displayNum.toString();
    while (numString.length < 10) numString = "_" + numString;
    document.querySelector("#readout").textContent = numString;
}

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
                console.log({keyNum})
                if (operand2 == "0") {operand2 = ""};
                operand2 = operand2.concat(keyNum);
                updateReadout(operand2);
                console.log("Number button clicked. Operand2 is now: " + operand2);
                break;

            case 'operator':
                keyOperator = clickTarget.textContent;
                if (keyOperator === "=") {
                    resolveExpression();
                    break;
                };

                if (keyOperator === "÷") {keyOperator = "/"};
                if (keyOperator === "x") {keyOperator = "*"};
                operator = keyOperator;
                console.log('Operator button clicked: ' + operator);
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
                        operand2 = operand2.slice(0, -1);
                        if (operand2 == 0) {operand2 = "0"};
                        updateReadout(operand2);
                        break;
                }
                console.log('Modifier button clicked: ' + keyMod);
                break;

            default:
                // Placeholder action for unknown button
                console.log('Unknown button clicked');
        }
    
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

function resolveExpression() {
    //what does expression equal?
    let result = eval(operand1 + operator + operand2);
    console.log(`Expression = ${result}`);
    console.log(`reset vars...`);
    updateReadout(result);

}


console.log('Num and mod keys work.');
console.log('Operator keys partly work: operator assigned, but expression not updated.');
// Attach btnClicked to all calculator buttons in btnGroup
document.querySelector('#btnGroup').addEventListener('click', btnClicked);
document.querySelector('#btnGroup').addEventListener('click', showBtnPress);

let operand1 = "";
let operand2 = "0";
let operator = "";