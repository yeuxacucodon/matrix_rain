const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let charArr = ["1", "0"];

let cw = window.innerWidth;
let ch = window.innerHeight;

let maxCharCount = 300;
let fallingCharArr = [];
let fontSize = 14;
let maxColumns = cw / fontSize;
let frames = 0;

canvas.width = cw;
canvas.height = ch;

window.addEventListener(
  "resize",
  function (event) {
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
    maxColumns = cw / fontSize;
    // console.log(cw, ch);
  },
  true
);

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(context) {
    this.value = charArr[randomRange(0, charArr.length - 1)];
    this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 10;
    context.fillStyle = "#00FF00";
    context.font = `${fontSize}px sans-serif`;
    context.fillText(this.value, this.x, this.y);
    this.y += this.speed;

    if (this.y > ch) {
      this.y = (Math.random() * ch) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 10;
    }
  }
}

function update() {
  if (fallingCharArr.length < maxCharCount) {
    let fallingChar = new FallingChar(
      Math.floor(Math.random() * maxColumns) * fontSize,
      (Math.random() * ch) / 2 - 50
    );
    fallingCharArr.push(fallingChar);
  }
  context.fillStyle = "rgba(0,0,0,0.05)";
  context.fillRect(0, 0, cw, ch);
  for (let i = 0; i < fallingCharArr.length && frames % 2 === 0; i++) {
    fallingCharArr[i].draw(context);
  }
  requestAnimationFrame(update);
  frames++;
}

update();
