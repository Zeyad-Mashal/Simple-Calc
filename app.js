let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick (val) {

    if (isNaN(val)) {
        handleSymbol(val);
    } else {
        handleNumber(val);
    }
    screen.innerText = buffer; 
}

function handleSymbol (symbol) {
    switch(symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return
            }

            flushOperatio(parseInt(buffer))
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;

            case '←':
                if (buffer.length === 1) {
                    buffer = '0';
                } else {
                    buffer = buffer.substring(0, buffer.length - 1)
                }
                break;
            
                case '+':
                case '−':
                case '×':
                case '÷':
                    handleMath(symbol);
                    break;

    }
}

function handleMath (symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperatio(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperatio (intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if(previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber (numberString)  {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener("click", function (e) {
        buttonClick(e.target.innerText);
    })
}

init();