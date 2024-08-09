var generatedText=document.querySelector(".generated-text");
var inputText=document.querySelector(".input-text");
var button=document.querySelector(".button");
var letters=document.querySelector(".letters")
var words=document.querySelector(".words")
var accuracy=document.querySelector(".accuracy")
var seconds=document.querySelector(".seconds");
var finalResult=document.querySelector(".final-result");
var finalResultContainer=document.querySelector(".final-result-container");
var tab=document.querySelector(".tabs")
var tab1=tab.children[0];
var tab2=tab.children[1];
var ok=document.querySelector(".ok");
var secs=0;
var started;
var intervalForSeconds;
var correctWords=0;
var totalWordsTyped=0;
var ComputedInput="";



var characters=["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var spaces=[1,2,3,4,5,6,7,8];

button.addEventListener("click",generate);
button.addEventListener("click",stopTimer);
function generate(){
    var text="";
    var value;
    var j=0;
    var space=spaceEvaluator();
    for(var i=0;i<500;i++){   
    value=characters[Math.floor(Math.random()*characters.length)];
    text+=value;
    j++;
    if(space==j){
        text+=' ';
        j=0;
        i++;
        space=spaceEvaluator();
    }
    }
   generatedText.innerText=text;
   enableInput();
   clearInput();
   stopTimer();
   resetWords();
   disappear();
   clearComputeInput();
}

function spaceEvaluator(){
    var spaceAfter;
    spaceAfter=spaces[Math.round(Math.random()*7)];
    return spaceAfter;
}

function stopTimer(){
clearInterval(intervalForSeconds);
started=false;
secs=0;
seconds.innerText=0;
accuracy.innerText=0;
}

function resetAccuracy(){
    accuracy.innerText=0;
}

function resetWords(){
    words.innerText=0;
    correctWords=0;
}


function enableInput(){
    inputText.disabled=false;
}

function clearInput(){
    inputText.value="";
}

function clearFinalResult(){
    finalResult.innerText=""
}

function clearComputeInput(){
    ComputedInput="";
}

function resetSeconds(){
    seconds.innerText=0;
}

inputText.addEventListener("keydown",runTimer)
inputText.addEventListener("keyup",updateWords)
inputText.addEventListener("keyup",ComputeTotalWords)
inputText.addEventListener("keyup",displayAccuracy)

function callForMobile(){
    runTimer();
    updateWords();
    ComputeTotalWords();
    displayAccuracy();
}


function runTimer() {
    if (!started&&generatedText.innerText!="") {
        started = true;
        intervalForSeconds=setInterval(updateSec, 1000);
    }
}

function updateSec() {
    secs += 1;
    seconds.innerText = secs;
    if(secs==60){
        clearInterval(intervalForSeconds);
        totalWordsTyped++;
        ComputeTotalWords();
        displayFinalResult();
        popUp();
        clearComputeInput();
        inputText.disabled=true;
    }
}



function updateWords(key){
    if(inputText.value.endsWith(' ')){
        if(generatedText.innerText.slice(0,inputText.value.length)==inputText.value){
    generatedText.innerText=generatedText.innerText.slice(inputText.value.length);
    if(inputText.value!=' '){
        ComputedInput+=inputText.value;
        }
    inputText.value="";
    correctWords+=1;
    words.innerText=correctWords;
        }
        else{
            for(var i=0;generatedText.innerText[i]!=' ';i++){
            }
            i+=1;
            generatedText.innerText=generatedText.innerText.slice(i);
            if(inputText.value!=' '){
            ComputedInput+=inputText.value;
            }
            inputText.value="";
        }
    }
}

function ComputeTotalWords(){
    totalWordsTyped = 0;
    for(var i=0;i<ComputedInput.length;i++){
        if(ComputedInput[i]==' '){
            totalWordsTyped++;
        }
    }
}

function ComputeAccuracy() {
    if (totalWordsTyped === 0){ return 0};
    var accuracy=(correctWords / totalWordsTyped) * 100;
    return accuracy.toFixed(2);
}


function displayAccuracy(key){

    accuracy.innerText=ComputeAccuracy();
    
}

function displayFinalResult(){
    if(totalWordsTyped==0){
        return ;
    }

   finalResult.innerText="You type with a speed of "+correctWords+" wpm"+" with an accuracy of "+ComputeAccuracy()+"%.";
}

function defaultTab(){
    tab1.style.borderTop="2px solid black"
    tab1.style.color="black"
}
defaultTab()

function popUp(){
    finalResultContainer.style.display="flex";
}

ok.addEventListener("click",disappear);

function disappear(){
    finalResultContainer.style.display="none";
}

tab2.addEventListener("click",message);
function message(){
    alert("Data base is'nt made yet ! ")
}

inputText.addEventListener("input",callForMobile);

