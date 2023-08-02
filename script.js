let inputNmr = document.querySelectorAll('.fraction .numerator');
let inputDenom = document.querySelectorAll('.fraction .denomenator');

let inputs = document.querySelectorAll('.fraction input');
let operator = document.querySelector('select#operator');
let calculatorBtn = document.querySelector('button#calculator-btn');
let resultInputNmr = document.querySelector('.fraction-result .numerator');
let resultInputDenom = document.querySelector('.fraction-result .denomenator');
let resultInputWholeNum = document.querySelector('.fraction-result .wholeNumber');
let fractionFigure = document.querySelector('#fraction-figure');


let denomenatorResult, numeratorResult, wholeNumResult;

let box = document.querySelectorAll('#fraction-figure div');


calculatorBtn.addEventListener('click', () => {
  box.forEach(element => {
    element.remove();
  });

wholeNumResult = '';

for(x = 0; x < inputs.length; x++) {
  if(inputs[x].value == "") {
    alert('fill inputs');
    return;
  }
  else if(isNaN(inputs[x].value)) {
    alert('input numbers');
    return;
  }
}

if(inputDenom[0].value == 0 || inputDenom[1].value == 0 ) {
alert('denominator not 0');
return;
}

else if((inputNmr[0].value >= 10000 || inputNmr[1].value >= 100000 ) ||
(inputDenom[0].value >= 100000 || inputDenom[1].value >= 100000)) {
  alert('input less 100000');
  return;
}

switch(operator.value) {
  case '+':
  denomenatorResult = inputDenom[0].value * inputDenom[1].value;
  numeratorResult = (inputNmr[0].value * inputDenom[1].value) + (inputNmr[1].value * inputDenom[0].value);
  simplify();
  break;

  case '-':
  denomenatorResult = inputDenom[0].value * inputDenom[1].value;
  numeratorResult = (inputNmr[0].value * inputDenom[1].value) - (inputNmr[1].value * inputDenom[0].value);
  simplify();
  break;

  case '*':
  denomenatorResult = inputDenom[0].value * inputDenom[1].value;
  numeratorResult = inputNmr[0].value * inputNmr[1].value;
  simplify();
  break;

  case '/':
  denomenatorResult = inputDenom[0].value * inputNmr[1].value;
  numeratorResult = inputNmr[0].value * inputDenom[1].value;
  simplify();
  break;

}

if(numeratorResult == 0) {
  resultInputNmr.value = 0;
  resultInputDenom.value = "";
  resultInputWholeNum.value = wholeNumResult;
} else if (denomenatorResult == 1) {
  resultInputNmr.value = numeratorResult;
  resultInputDenom.value = "";
  resultInputWholeNum.value = wholeNumResult;

} else if(numeratorResult == denomenatorResult && resultInputWholeNum.value == "") {
  resultInputNmr.value = denomenatorResult;
  resultInputDenom.value = "";

} else {
  resultInputNmr.value = numeratorResult;
  resultInputDenom.value = denomenatorResult;
  if(wholeNumResult != undefined) {
    resultInputWholeNum.value = wholeNumResult;
  }
}

if(denomenatorResult * wholeNumResult <= 100) {
  if(numeratorResult <= 100 && denomenatorResult <= 100) {
    presentFraction();
    console.log('presented');
  }
}
});


function presentFraction() {
  let biggerNum = denomenatorResult;
  let numerator = numeratorResult;

  if(wholeNumResult > 0) {
    numerator = (denomenatorResult * wholeNumResult) + numeratorResult;
    biggerNum = (denomenatorResult * wholeNumResult) + numeratorResult;
      while(biggerNum % denomenatorResult) {
        biggerNum++;
      }
      let denomMultiplier = 1;
      for(x = 1; x <= biggerNum; x++) {
        box = document.createElement('div');
        fractionFigure.appendChild(box);
        box.classList.add('denom-box');
        if(x == denomenatorResult * denomMultiplier) {
          box.classList.add('separate');
          denomMultiplier++
        }

      }

      box = document.querySelectorAll('#fraction-figure div');
      for(x = 0; x < numerator; x++) {
        box[x].classList.add('numerator-box')
      }
      return;

  }

  for(x = 1; x <= biggerNum; x++ ) {
    box = document.createElement('div');
    fractionFigure.appendChild(box);
    box.classList.add('denom-box')
  }

  box = document.querySelectorAll('#fraction-figure div');
  for(x = 0; x < numeratorResult; x ++) {
    box[x].classList.add('numerator-box');
  }
}


function simplify() {
  let biggerNum = denomenatorResult;
  if(denomenatorResult < numeratorResult) { 
  biggerNum = numeratorResult;
}
for(biggerNum; biggerNum >= 1; biggerNum--) {
if(denomenatorResult % biggerNum == 0 && numeratorResult % biggerNum == 0) {
  numeratorResult /= biggerNum;
  denomenatorResult /= biggerNum;
  if(denomenatorResult  < numeratorResult && numeratorResult % denomenatorResult != 0) {
    wholeNumResult = parseInt(numeratorResult / denomenatorResult);
    console.log(denomenatorResult);
    numeratorResult = numeratorResult % denomenatorResult;
    break;
  }

  break;
}
}
 }