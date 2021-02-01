const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


function soundClick() {
  var audio = new Audio();
  audio.src = 'audio1.mp3';
  audio.autoplay = true;
  // console.log('tut');
}
// soundClick();

const image = new Image();
image.src = 'sprite1.png';

const space = new Image();
space.src = 'space.jpg';

const maps = {
  ball: {
    x: 359,
    y: 943,
    width: 38,
    height: 38,
  },

  yellow: {
    x: 174,
    y: 36,
    width: 42,
    height: 20,
  },

  red: {
    x: 0,
    y: 36,
    width: 42,
    height: 20,
  },

  green: {
    x: 174,
    y: 0,
    width: 42,
    height: 20,
  },

  pink: {
    x: 116,
    y: 36,
    width: 42,
    height: 20,
  },

  platform: {
    x: 108,
    y: 176,
    width: 210,
    height: 18,
  },
};

canvas.width = 500;
canvas.height = 500;

const game = new Game();

const borders = [
  new Rectangle({
    x: 0, y: -20, width: canvas.width, height: 20,
  }),
  new Rectangle({
    x: canvas.width, y: 0, width: 20, height: canvas.height,
  }),
  new Rectangle({
    x: 0, y: canvas.height, width: canvas.width, height: 20,
  }),
  new Rectangle({
    x: -20, y: 0, width: 20, height: canvas.height,
  }),
];

function clearCanvas() {
  // canvas.width = canvas.width;
  context.drawImage(space, 0, 0, space.width, space.height);
}

function changeItem(array, item) {
  if (array.includes(item)) {
    const index = array.indexOf(item);
    array.splice(index, 1);
  } else {
    array.push(item);
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    game.platform.leftKey = true;
  } else if (event.key === 'ArrowRight') {
    game.platform.rightKey = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft') {
    game.platform.leftKey = false;
  } else if (event.key === 'ArrowRight') {
    game.platform.rightKey = false;
  } else if (game.modeGame === false && event.key === 'Enter') {
    game.init();
  }
});

function getRandom(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
function drawResult() {
  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(255, 255, 255, 0.5';
  context.fill();

  context.fillStyle = 'black';
  context.font = '50px Monaco';
  context.textAlign = 'center';
  context.fillText('Close game', canvas.width / 2, canvas.height / 2 - 50);

  context.fillStyle = 'black';
  context.font = '20px Monaco';
  context.textAlign = 'center';
  context.fillText('Для продолжения нажми Enter', canvas.width / 2, canvas.height / 2 - 30);
}