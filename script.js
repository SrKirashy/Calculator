let screenValue = '';
let n1 = '';
let n2 = '';
let turn = false;
let valueAccount = 0;
let phases = 0;
let signal = '';
let audio = new Audio("./sound/click.mp3");
let screen = document.querySelector('.screen')

document.querySelectorAll('.key').forEach(item => {
    item.addEventListener('click', playAudio);
})

function handlerNumber(number) {
    if (turn && phases === 0) {
        if (n1.length === 8) {

        } else {
            n1 =  n1 + number;
        }
    } else if (turn && phases === 1) {
        if (n2.length === 8) {

        } else {
            n2 =  n2 + number;
        }
    } else {
        return;
    }
    
    updateScreen();
}

function handlerSignal(clickedSignal) {
    if (n1 === '') {
        phases = 1;
        signal = clickedSignal;
        n1 = '0';
    } else {
        phases = 1;
        signal = clickedSignal;
    }

}
function makeAccount() {
    phases = 2;
    switch (signal) {
        case '÷':
            valueAccount = parseInt(n1) / parseInt(n2);
            updateScreen();
            break;
        case 'x':
            valueAccount = parseInt(n1) * parseInt(n2);
            updateScreen();
            break;
        case '-':
            valueAccount = parseInt(n1) - parseInt(n2);
            updateScreen();
            break;
        case '+':
            valueAccount = parseInt(n1) + parseInt(n2);
            updateScreen();
            break;
        default: 
           return ;

    }
}
function updateScreen() {
    if (phases === 0 ){
        screenValue = treatNumbers(n1);
        if (screenValue === 'NaN' || screenValue === '-'){
            screenValue = '0';
        }
    } else if (phases === 1) {
        screenValue = treatNumbers(n2);
        console.log(screenValue);
        if (screenValue === 'NaN' || screenValue === '-'){
            screenValue = '0';
        }
    } else if (phases === 2) {
        if (valueAccount.toString().length >= 9) {
            screenValue = '- - - - - - - - -'
            setTimeout(clearCalculator, 300);
        }  else {
            screenValue = treatNumbers(valueAccount).toString();
            phases = 0;
            n1 = valueAccount.toString();
            n2 = '';
            signal = '';
        }
    } 
    document.querySelector('.screen').innerHTML = screenValue;
    document.querySelector('.screen').style.color = '#dddddd00';
    setTimeout(() => {document.querySelector('.screen').style.color = '#dddddd'}, 50);
};

function clearCalculator() {
    screenValue = 0;
    n1 = '';
    n2 = '';
    valueAccount = 0;
    phases = 0;
    signal = '';
    updateScreen();
    document.querySelector('.screen').innerHTML = '0';
}

function clearNumber() {
    if (phases === 0) {
        let lengthN1 = n1.length - 1;
        let newN1 = n1.slice(0,lengthN1 )
        n1 = newN1
        updateScreen();
    } else if (phases === 1){
        let lengthN2 = n2.length - 1;
        let newN2 = n2.slice(0,lengthN2 )
        n2 = newN2
        updateScreen();
    }
}

function playAudio() {
    if (turn){
        audio.currentTime = 0.3
        audio.play();
    }
}

function treatNumbers (numberClicked) {
    screenViewTreated = parseFloat(numberClicked).toLocaleString('pt-br');
    return screenViewTreated;
}

function onButton() {
    screenValue = '';
    updateScreen();
    screen.style.color = '#dddddd';
    turn = true;
}

function offButton() {
    screen.style.color = 'transparent';
    screenValue = '';
    n1 = '';
    n2 = '';
    valueAccount = 0;
    phases = 0;
    signal = '';
    turn = false;
}