const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let charArr = ["0", "1", "a", "b", "c", "s"];

let maxCharCount = 300;
let fallingCharArr = [];
let fontSize = 13;
let maxColumns = window.innerWidth / fontSize;

let frames = 0;
let off;

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(context) {
    this.value =
      charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase();
    this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
    context.fillStyle = "#00FF00";
    context.font = `${fontSize}px sans-serif`;
    context.fillText(this.value, this.x, this.y);
    this.y += this.speed;

    if (this.y > window.innerHeight) {
      this.y = (Math.random() * window.innerHeight) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
    }
  }
}

function update() {
  if (fallingCharArr.length < maxCharCount) {
    let fallingChar = new FallingChar(
      Math.floor(Math.random() * maxColumns) * fontSize,
      (Math.random() * window.innerHeight) / 2 - 50
    );
    fallingCharArr.push(fallingChar);
  }
  context.fillStyle = "rgba(0,0,0,0.09)";
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < fallingCharArr.length && frames % 2 === 0; i++) {
    fallingCharArr[i].draw(context);
  }
  requestAnimationFrame(update);
  frames++;
}

update();
