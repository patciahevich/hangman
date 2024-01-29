import { increaseIncorrectAnswers, resetIncorrectAnswers, getIncorrectAnswers, drawMan, openModal, charCodes } from './layout.js'
import questWords from '../words.json' assert {type: 'json'};

// game logic
const taskWord = document.querySelector('.task__word');
const hint = document.querySelector('.hint');
const score = document.querySelector('.score');

let isPush = true;

const modalBtn = document.querySelector('.modal_btn');
modalBtn.addEventListener('click', function() {
  if (gameComplete) {
    setTimeout(openModal('right', 'All words were shown', 'Do you want to play again?', 'reset progress'), 200)

    localStorage.clear();
    gameComplete = false;
  }
  prepareGame();
});

let mask;
let word;
let wordForGuess;
let gameComplete = false;

function prepareGame() {
  isPush = true;
  const canvas = document.querySelector('.canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 400, 400);
  resetIncorrectAnswers();
  drawMan();
  document.querySelectorAll('.keyboard__item')
  .forEach((item) => item.classList.remove('active'));

  wordForGuess = getWord();
  word = wordForGuess.word.split('');
  mask = word.map((item) => item = '_').join(' ')

  hint.innerText = `Hint: ${wordForGuess.hint}`;
  changeMask();
  changeScore();
}

function getWord() {
  let history = JSON.parse(localStorage.getItem('myHistory')) || [];
  let words = questWords.filter((item) => !history.includes(item.word));
  let word = words[getRndInteger(0, words.length)];
  history.push(word.word);
  if (history.length === questWords.length) {
    gameComplete = true;
  }
  localStorage.setItem('myHistory', JSON.stringify(history));
  return word;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function tryGuessWord(letter) {
  if(word.includes(letter.toLowerCase())) {
    let indexSet = word.reduce((acc, item, index) => {
      if (item === letter.toLowerCase()) {
        acc.push(index);
        return acc;
      } 
      return acc;
    }, [])
   
    let newMask = mask.split(' ')
    .map((item, index) => {
      if (indexSet.includes(index)) {
        return letter.toLowerCase();
      }

      return item
    })
    .join(' ');
    mask = newMask;
    
    if(!mask.includes('_')) {
      isPush = false;
      openModal('right', 'Congratulations!', `The secret word is <span> ${wordForGuess.word} </span>!` , 'next word');
    }
    changeMask();
  } else {
    increaseIncorrectAnswers()
    drawMan(getIncorrectAnswers());
    changeScore();
    if (getIncorrectAnswers() === 6) {
      isPush = false;
      
      setTimeout(function() {
        openModal('wrong', 'Game Over', `The secret word is <span> ${wordForGuess.word} </span>!`, 'try again');
      }, 200)
    }
  }
}


document.addEventListener('keydown', function(e) {
  if (isPush === true && charCodes.includes(e.keyCode) && !document.querySelector('.modal').classList.contains('active')) {
    if(!document.querySelector(`[code="${e.keyCode}"]`).classList.contains('active')) {
      tryGuessWord(String.fromCharCode(e.keyCode));
      selectLetter(e.keyCode);
    }
  }
})

document.querySelectorAll('.keyboard__item').forEach((el) => {
  el.addEventListener('click', function(e) {
    if (!el.classList.contains('active')) {
      let code = el.getAttribute('code');
      selectLetter(code)
      tryGuessWord(String.fromCharCode(code));
    }
  })
})
function selectLetter(target) {
  document.querySelector(`[code="${target}"]`).classList.add('active')
}

function changeMask() {
  taskWord.innerHTML = `Secret word is   <p> ${mask} </p>`;
}

function changeScore() {
  score.innerHTML = `Incorrect guesses <b> ${getIncorrectAnswers()}/6</b`
}

document.addEventListener('DOMContentLoaded', function() {
  localStorage.clear();
  prepareGame()
})