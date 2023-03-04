"use strict";

var result = document.getElementById("result"); //entrada do resultado 
var equal = document.getElementById("equal"); // botão de igual
var clean = document.getElementById("clear"); // botão para apagar tudo 
var lastClear = document.getElementById("lastClear"); // botão para apagar o ultimo caractere
var operators = document.querySelectorAll(".operators td"); // botões das operações
var numbers = document.querySelectorAll(".numbers td"); //botoões dos números 

var resultOut = false; // observador do que está saindo no resultado 


// função para alocar os números na tela 
function number(e){
    var currentDisplayed = result.innerHTML;
    var lastCharacter = currentDisplayed[currentDisplayed.length - 1];

    // se o resultado não tiver entrado o numero entra na tela
    if(resultOut === false){
        result.innerHTML += e.innerHTML;

    // caso o número na entrada seja um resultado de algum cálculo já realizado, permite-se manter adicionando operadores para que o cálculo continue      
    }else if(resultOut === true && lastCharacter === "+" || lastCharacter === "-" || lastCharacter === "×" || lastCharacter === "÷"){
        
        resultOut = false
        result.innerHTML += e.innerHTML;
    // caso queira começar um novo cálculo 
    }else{

         resultOut = false;
         result.innerHTML = "";
         result.innerHTML += e.innerHTML;
    }
}


// função para adicionar os operadores
function operation(e){
    var currentDisplayed = result.innerHTML;
    var lastCharacter = currentDisplayed[currentDisplayed.length - 1];

    // caso o ultimo caractere seja um operador e aperta um novo operador, o mesmo entrará no lugar do antigo 
    if(lastCharacter === "+" || lastCharacter === "-" || lastCharacter === "×" || lastCharacter === "÷" ){
        var newInput = currentDisplayed.substring(0, currentDisplayed.length -1) + e.innerHTML;
        result.innerHTML = newInput;

    // adiciona um operador 
    }else{
        result.innerHTML += e.innerHTML;
    }
}


// função do botão de igualdade (cálculos seguindo a ordem de divisão, multiplicação, subtração e adição)
function equaly(){

    // observando se existe algum caractere na entrada 
    if(result.innerHTML != ""){

    var inputOut = result.innerHTML;

    // criando um array apenas com números 
     var numbersApart = inputOut.split(/\+|\-|\×|\÷/g);

    // criando um array com apenas operadores
     var operatorsApart = inputOut.replace(/[0-9]|\./g, "").split("");

    console.log(numbersApart) 
    console.log(operatorsApart)

    // observador do operador específico 
    var divide = operatorsApart.indexOf("÷")

    // enquanto existir esse operador específico 
    while(divide != -1){
        numbersApart.splice(divide, 2, numbersApart[divide] / numbersApart[divide + 1])
        operatorsApart.splice(divide,1);
        divide = operatorsApart.indexOf("÷")
    }

    // observador do perador específico
    var multiply = operatorsApart.indexOf("×")

    // enquanto existir esse operador específico
    while(multiply != -1){
        numbersApart.splice(multiply, 2, numbersApart[multiply] * numbersApart[multiply + 1])
        operatorsApart.splice(multiply,1);
        multiply = operatorsApart.indexOf("×")
    }

    // observador do perador específico
    var minus = operatorsApart.indexOf("-")

    // enquanto existir esse operador específico
    while(minus != -1){
        numbersApart.splice(minus, 2, numbersApart[minus] - numbersApart[minus + 1])
        operatorsApart.splice(minus,1);
        minus = operatorsApart.indexOf("-")
    }

    // observador do perador específico
    var plus = operatorsApart.indexOf("+")

    // enquanto existir esse operador específico   
    while(plus != -1){
        numbersApart.splice(plus, 2, parseFloat(numbersApart[plus]) + parseFloat(numbersApart[plus + 1]))
        operatorsApart.splice(plus,1);
        plus = operatorsApart.indexOf("+")
    }

    // coloca o resultado final da equação na entrada
    result.innerHTML = numbersApart[0];

    // muda o observador 
    resultOut = true;
}

}

// limpa o ultimo caractere na entrada 
function lastClea(){
    var currentDisplayed = result.innerHTML;
    var newInput = currentDisplayed.substring(0, currentDisplayed.length -1)
    result.innerHTML = newInput;
}

// limpa por inteiro a entrada 
function clea(){
    result.innerHTML = "";
}

function percentage(){

    // observando se existe algum caractere na entrada 
    if(result.innerHTML != ""){

    var inputOut = result.innerHTML;

    // criando um array apenas com números 
    var numbersApart = inputOut.split(/\+|\-|\×|\÷/g);

    // criando um array com apenas operadores
    var operatorsApart = inputOut.replace(/[0-9]|\./g, "").split("");

   console.log(numbersApart) 
   console.log(operatorsApart)

    // se existem mais de dois números na entrada e o operador que vem logo antes do numero que será analisado como porcentagem,
    // fara o calculo da porccentagem do numero analisado como porcentagem mantendo o resto da equção
    if(numbersApart.length >= 2 && operatorsApart[operatorsApart.length - 1] === "×" || operatorsApart[operatorsApart.length - 1] === "÷"){
    
    var numberArray = numbersApart[numbersApart.length - 1];
    var calcLastPercent = numbersApart[numbersApart.length - 1] / 100;
    result.innerHTML = inputOut.substring(0,  inputOut.length -  numberArray.length) + calcLastPercent;

    // fará apenas o cálculo da porcentagem apos o cálculo inteiro da equação acontecer, considerando o resultado para o cálculo de porcentagem 
   }else if(numbersApart.length >= 2  && operatorsApart.indexOf("+") != -1 || operatorsApart.indexOf("-") != -1){

    var divide = operatorsApart.indexOf("÷")

    while(divide != -1 && divide != operatorsApart.length - 1){
        numbersApart.splice(divide, 2, numbersApart[divide] / numbersApart[divide + 1])
        operatorsApart.splice(divide,1);
        divide = operatorsApart.indexOf("÷")
    }

    
    var multiply = operatorsApart.indexOf("×")

    while(multiply != -1 && multiply != operatorsApart.length - 1){
        numbersApart.splice(multiply, 2, numbersApart[multiply] * numbersApart[multiply + 1])
        operatorsApart.splice(multiply,1);
        multiply = operatorsApart.indexOf("×")
    }

    var minus = operatorsApart.indexOf("-")

    while(minus != -1 && minus != operatorsApart.length - 1){
        numbersApart.splice(minus, 2, numbersApart[minus] - numbersApart[minus + 1])
        operatorsApart.splice(minus,1);
        minus = operatorsApart.indexOf("-")
    }

    var plus = operatorsApart.indexOf("+")
    
    while(plus != -1 && plus != operatorsApart.length - 1){
        numbersApart.splice(plus, 2, parseFloat(numbersApart[plus]) + parseFloat(numbersApart[plus + 1]))
        operatorsApart.splice(plus,1);
        plus = operatorsApart.indexOf("+")
    }
   
    var calcPercent2 = numbersApart[0] * numbersApart[numbersApart.length - 1] / 100;
    var numberArray = numbersApart[numbersApart.length - 1];
 
    result.innerHTML = inputOut.substring(0,  inputOut.length -  numberArray.length) + calcPercent2;

    console.log(numberArray);
    console.log(numberArray.length);
    console.log(inputOut)
    console.log(calcPercent2)
    
    // caso seja um único numero a ser feito o da porcentagem 
    }else{
    var calcPercent = numbersApart[0] / 100;

    result.innerHTML = calcPercent;

   } 

}

}


   


























