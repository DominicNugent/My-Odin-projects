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
                
                if (operand2 === "0") {operand2 = "";} //|| operand2 === null
                // console.log("Processing num key: ", keyNum);
                // console.log({keyNum})
                
                operand2 = operand2.concat(keyNum);
                updateReadout(operand2);
                // showExpElements("Number finished with:");
                break;

            case 'operator':
                keyOperator = clickTarget.textContent;
                // console.log('Operator button clicked:', keyOperator);

                if (operand1 && operand2) {
                    if (operator === '') {
                        operand1 = "";
                    } else {
                        let expValue = resolveExpression();

                        operand1 = "";
                        operator = "";
                        operand2 = expValue.toString();
                        updateReadout(operand2);

                        // showExpElements("Revised values after resolve:");
                    }   
                }
                
                if (keyOperator !== "=") {
                    //needed to ensure eval can resolve expression.
                    if (keyOperator === "÷") {keyOperator = "/"};
                    if (keyOperator === "x") {keyOperator = "*"}; //"×" alt multiplication char
                    operator = keyOperator;
                } 

                //console.log("Do we resolve expression?");
                !operand1 ? reshuffleOperands() : null;
                
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
                        if (operand2) { 
                            operand2 = "";
                            updateReadout("0");
                            // console.log("CE btn...");
                        }
                        break;

                    case 'DEL': 
                        if (operand2 !== '') {
                            operand2 = operand2.slice(0, -1);
                            if (operand2 == 0) {operand2 = "0"};
                            updateReadout(operand2);
                        }
                        break;
                }
                // console.log('Modifier button clicked: ' + keyMod);
                break;

            default:
                // Placeholder action for unknown button
                console.log('Unknown button clicked');
        }

        // To get a string and the name/value pair, separate them with a comma
        // showExpElements("Click proc'g done.");
        // console.log("-----");
    
}

// darken whatever button is pressed then revert it right after.
function showBtnPress(event) {

    function darkenColor(color) {
        let rgb = color.substring(4, color.length - 1).replace(/ /g, '').split(',');
        let darkenedRgb = rgb.map(value => Math.max(parseInt(value) - 50, 0));
        return `rgb(${darkenedRgb.join(',')})`;
    }

    let thisButton = event.target;
    if (thisButton.dataset.currentBackgroundColor === undefined) {
        thisButton.dataset.currentBackgroundColor = window.getComputedStyle(thisButton).backgroundColor;
        thisButton.dataset.darkenedBackgroundColor = darkenColor(thisButton.dataset.currentBackgroundColor);
    }
    thisButton.style.backgroundColor = thisButton.dataset.darkenedBackgroundColor; // Corrected this line

    // Revert the color after a delay 
    setTimeout(() => {
        thisButton.style.backgroundColor = thisButton.dataset.currentBackgroundColor; // Corrected this line
    }, 300);
}

function reshuffleOperands() {
    operand1 = operand2;
    operand2 = ""; //null
    // showExpElements('reshuffle operands!');
}

//what does expression equal?
function resolveExpression() {
    let thisExpression = operand1 + operator + operand2;
    // console.log("Expression built:", {thisExpression});
    // showExpElements("Resolved exp with:");
    let result = eval(thisExpression);
    //console.log(`Expression result = ${result}`);
    return result;
}

//Ensure the readout shows as a 10-character string, 
//prefixed with underscores (which are a blank char in the chosen font) as needed.
function updateReadout(displayNum) {

    function limitDecimalAccuracy(thisNum) {
        if (thisNum === ".") return thisNum;
        
        let decimalPartLength = (thisNum.toString().split('.')[1] || []).length;
        let maxDecimalPlaces = Math.min(8, decimalPartLength);
        const roundedNumber = parseFloat(thisNum).toFixed(maxDecimalPlaces);

        return roundedNumber.toString();
    }

    let numString = limitDecimalAccuracy(displayNum);
    
    // console.log(`Display number came in as: ${numString}`);
    // console.log ('Digit count: ' + numString.length)

    // Check if the number has more than 10 digits. Truncate/round to get 10 digits.
    if (numString.length > 10) {
        numString = parseFloat(numString).toExponential(4);
        numString = numString.toUpperCase();
    } 
    while (numString.length < 10) numString = "_" + numString;
    

    // console.log(`Display number displayed: ${numString}`);
    // console.log("------------");
    //Create a blank flash like it had to think about the answer
    document.querySelector("#readout").textContent = "__________"; 
    setTimeout(() => {
        document.querySelector("#readout").textContent = numString; // Set to numString after 300 milliseconds
    }, 200);
}

function showExpElements(msg) {
    console.log(msg, {operand1}, {operator}, {operand2});
}


// Attach btnClicked to all calculator buttons in btnGroup to get things rolling.
document.querySelector('#btnGroup').addEventListener('click', btnClicked);
document.querySelector('#btnGroup').addEventListener('click', showBtnPress);

let operand1 = "";
let operand2 = "0";
let operator = "";

//console.log("------------");
