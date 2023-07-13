import './style.css'

const canvas = document.querySelector('.webgl');
canvas.width = 500;
canvas.height = 500;
if(innerWidth < canvas. width){
  canvas.width = 360;
  canvas.height = 360;
}
const ctx = canvas.getContext('2d');

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let xVelocity = 0;
let yVelocity = 0;
let speed = 0;
let headX = canvas.width / 2;
let headY = canvas.height / 2;
const snakeParts = [];
let tailLength = 2;
let score = 0;
let foodX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
let foodY = Math.floor(Math.random() * (canvas.height / 10)) * 10;

function drawGame() {
  changeSnakePosition();
  if (isGameOver()) return;

  clearScreen();
  drawSnake();
  checkSnakeFoodCollision();
  drawFood();
  drawScore();
  setTimeout(drawGame, 250 - speed);
}

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

  ctx.fillStyle = 'green';
  snakeParts.map((part) => {
    ctx.fillRect(part.x, part.y, 10, 10);
  })

  snakeParts.push(new SnakePart(headX, headY));
  if (snakeParts.length > tailLength)
    snakeParts.shift();

  ctx.fillStyle = 'orange';
  ctx.fillRect(headX, headY, 10, 10);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function keyDown({ key }) {
  document.querySelector('.start').style.display = 'none';
  if (key === 'ArrowUp') {
    if (yVelocity === 10)
      return;
    yVelocity = -10;
    xVelocity = 0;
  }
  else if (key === 'ArrowDown') {
    if (yVelocity === -10)
      return;
    yVelocity = 10;
    xVelocity = 0;
  }
  else if (key === 'ArrowRight') {
    if (xVelocity === -10)
      return;
    yVelocity = 0;
    xVelocity = 10;
  }
  else if (key === 'ArrowLeft') {
    if (xVelocity === 10)
      return;
    yVelocity = 0;
    xVelocity = -10;
  }
}

document.querySelector('.arrow-up').addEventListener('click',() => {
  if (yVelocity === 10)
      return;
    yVelocity = -10;
    xVelocity = 0;
})

document.querySelector('.arrow-down').addEventListener('click',() => {
  if (yVelocity === -10)
      return;
    yVelocity = 10;
    xVelocity = 0;
})

document.querySelector('.arrow-right').addEventListener('click',() => {
  if (xVelocity === -10)
      return;
    yVelocity = 0;
    xVelocity = 10;
})

document.querySelector('.arrow-left').addEventListener('click',() => {
  if (xVelocity === 10)
      return;
    yVelocity = 0;
    xVelocity = -10;
})

document.querySelector('.arrow').addEventListener('click', () => {
  document.querySelector('.start').style.display = 'none';
})

function checkSnakeFoodCollision() {
  if (headX == foodX && headY == foodY) {
    foodX = Math.round(Math.random() * (canvas.width / 10 - 1)) * 10;
    foodY = Math.round(Math.random() * (canvas.height / 10 - 1)) * 10;
    tailLength++;
    score += 10
    if(speed < 200) speed += 5;
  }
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX, foodY, 10, 10);
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '12px Verdana';
  ctx.fillText('Score ' + score, canvas.width - 60, 15)
}

function isGameOver() {
  let gameOver = false;

  if(xVelocity === 0 && yVelocity === 0) return false;

  if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height) {
    console.log(headX, headY);
    gameOver = true;
  }

  snakeParts.map((part) => {
    if(part.x === headX && part.y === headY){
      console.log(headX, headY, part.x, part.y)
      gameOver = true;
    }
  })

  if(gameOver){
    ctx.fillStyle = 'white';
    if(canvas.width < 400 ) ctx.font = '40px Verdana';
    else ctx.font = '50px Verdana';
    let gradient = ctx.createLinearGradient(0,0,canvas.width, 0);
    gradient.addColorStop('0', 'magenta');
    gradient.addColorStop('0.5', 'blue');
    gradient.addColorStop('1.0', 'red');
    ctx.fillStyle = gradient;
    ctx.fillText('Game Over', canvas.width / 5, canvas.height / 3);
    document.querySelector('.end').style.visibility = 'visible';
    return true;
  }
}

window.addEventListener('keydown', keyDown);
drawGame();