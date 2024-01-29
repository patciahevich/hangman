const body = document.querySelector('body');

// draw board 
createLayout()

function createLayout() {
  const h1 = document.createElement('h1');
  h1.innerText = "Hangman Game";

  const main = document.createElement('main');
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  canvas.classList.add('canvas');
  main.append(canvas)

  body.append(h1)

  const section = document.createElement('section');
  // section.classList.add('task');

  const task = document.createElement('div');
  task.classList.add('task');

  const taskWord = document.createElement('p');
  taskWord.classList.add('task__word');

  const hint = document.createElement('p');
  hint.classList.add('hint');
  const score = document.createElement('p');
  score.classList.add('score');

  const keyboard = document.createElement('ul');
  keyboard.classList.add('keyboard')

  task.append(taskWord);
  task.append(hint);
  task.append(score);
  section.append(task);
  section.append(keyboard);
  main.append(section)
  body.append(main);
}


// add canvas
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

let incorrectAnswers;

export function drawMan() {
  ctx.fillRect(10, 10, 30, 600);
  ctx.fillRect(0, 25, 250, 30);
  ctx.fillRect(200, 58, 10, 50);

  if (incorrectAnswers === 1) {
    drawHead();
  } else if (incorrectAnswers === 2) {
    drawHead();
    drawBody();
  } else if (incorrectAnswers === 3) {
    drawHead();
    drawBody();
    drawHandOne();
  } else if (incorrectAnswers === 4) {
    drawHead();
    drawBody();
    drawHandOne();
    drawHandTwo();
  } else if (incorrectAnswers === 5) {
    drawHead();
    drawBody();
    drawHandOne();
    drawHandTwo();
    drawLegOne();
  } else if (incorrectAnswers === 6) {
    drawHead();
    drawBody();
    drawHandOne();
    drawHandTwo();
    drawLegOne();
    drawLegTwo();
  } 
}
function drawHead() {
  // arc(x, y, radius, startAngle, endAngle, anticlockwise)
  ctx.beginPath();
  ctx.arc(205, 140, 30, 0, Math.PI*2, false)
  ctx.closePath();
  ctx.stroke();
}

function drawBody() {
  ctx.moveTo(205, 172);
  ctx.lineTo(205, 250);
  ctx.stroke();
}

function drawHandOne() {
  ctx.moveTo(190, 180);
  ctx.lineTo(150, 225);
  ctx.stroke();
}

function drawHandTwo() {
  ctx.moveTo(220, 180);
  ctx.lineTo(250, 225);
  ctx.stroke();
}

function drawLegOne() {
  ctx.moveTo(200, 250);
  ctx.lineTo(150, 320);
  ctx.stroke();
}

function drawLegTwo() {
  ctx.moveTo(210, 250);
  ctx.lineTo(255, 320);
  ctx.stroke();
}



// open modal
function createModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const popUp = document.createElement('div');
  popUp.classList.add('pop-up');

  const h2 = document.createElement('h2');

  const p = document.createElement('p');

  const button = document.createElement('button');
  button.classList.add('modal_btn');

  popUp.append(h2);
  popUp.append(p);
  popUp.append(button);
  modal.append(popUp);
  body.append(modal);
}

createModal()

const modal = document.querySelector('.modal');
const popUp = document.querySelector('.pop-up');
const modalBtn = document.querySelector('.modal_btn');

popUp.addEventListener('click', (e) => e.stopPropagation());
modalBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  modal.classList.remove('right');
  modal.classList.remove('wrong');
})



export function openModal(answer, message, text, btnText) {
  modal.classList.add(answer)
  modal.classList.add('active');
  modal.querySelector('h2').innerText = message;
  modal.querySelector('p').innerHTML= text;
  modalBtn.innerText = btnText;
  modal.focused = true
}

// modal.addEventListener('click', function(e) {
//   e.stopPropagation();
//   modal.classList.remove('active');
// })


drawMan(incorrectAnswers)

// add keyboard
export const charCodes = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77];

const keyboard = document.querySelector('.keyboard');
function drawKeyboard() {
  for (let i = 0; i < charCodes.length; i++) {
    const li = document.createElement('li');
    li.classList.add('keyboard__item');
    li.setAttribute('code', charCodes[i])
    li.innerText = String.fromCharCode(charCodes[i]).toUpperCase();
    keyboard.append(li)
  }
} 

drawKeyboard()

export function resetIncorrectAnswers() {
  incorrectAnswers = 0
}

export function increaseIncorrectAnswers() {
  incorrectAnswers++
}

export function getIncorrectAnswers() {
  return incorrectAnswers
}