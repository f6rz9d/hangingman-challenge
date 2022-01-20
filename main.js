const WORDS = ["apple","orange","pear","grape","mango","plum","banana","kiwi","pineapple","papaya","avocado","watermelon","coconut","grapefruit","strawberry","cherry","pomegranate","blueberry","apricot","mandarin"];

let answer = '';
let maxWrong = 10;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = WORDS[Math.floor(Math.random() * WORDS.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg text-dark btn-light m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);


  console.log(chosenLetter);
  if (answer.indexOf(chosenLetter) >= 0) {
    guessWords();
    checkIfGameWon();
  } 
  else if (answer.indexOf(chosenLetter) === -1) {
    document.getElementById('wordWrongSpell').innerHTML += chosenLetter;
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.gif'
}

function checkIfGameWon() {
  if (wordStatus === answer) { 
    document.getElementById('keyboard').innerHTML = "You Won!!";
    clearInterval(ticker);
  }
}
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = "You Lost!!";
    clearInterval(ticker);
  }
}


function guessWords() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " - ")).join('');
  document.getElementById('wordSpotlight').innerHTML = wordStatus;
} 

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/hm0.gif';
  document.getElementById('wordWrongSpell').innerHTML = ''; 
  clearInterval(ticker);
  randomWord();
  guessWords();
  updateMistakes();
  generateButtons();
  startTimer();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
guessWords();




var timeInSecs;
var ticker;

function startTimer() {
	generateButtons();
timeInSecs = parseInt(10 * 60);
ticker = setInterval(tick , 1000);
}

function tick( ) {
var secs = timeInSecs;
if (secs > 0) {
timeInSecs--; 
}
else {
	document.getElementById('keyboard').innerHTML = "Your Time is up!!";
	document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
	document.getElementById("countdown").innerHTML = "00:00";
clearInterval(ticker);
//generateButtons();
//startTimer(2*60); // 4 minutes in seconds
}

var mins = Math.floor(secs/60);
secs %= 60;
var pretty = ( (mins < 10) ? "0" : "" ) + mins + ":" + ( (secs < 10) ? "0" : "" ) + secs;

document.getElementById("countdown").innerHTML = pretty;
}

//startTimer(1*60);