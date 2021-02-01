const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let game;

function gameInit(){
    document.getElementById('popup').classList.add('popup__overlay');
}


function soundClick() {
    let audio = new Audio();
    audio.src = 'audio.mp3';
    audio.play();
  }
  // soundClick();

gameInit();
    const menu = document.getElementById('menu');
    menu.onclick = function(event) {
    let target = event.target;
    let popup = document.getElementById('popup');
    console.log(target.innerText);
    if (target.innerText === 'Play' || target.innerText === 'Играть'){
        game = new Game();
        soundClick();

        popup.classList.remove('popup__overlay');
        menu.classList.add('hidden');
    } else if(target.innerText === 'Help' || target.innerText === 'Помощь'){
        menu.classList.add('hidden');
        document.getElementById('help').classList.remove('hidden');
   } else if(target.innerText === 'Setting' || target.innerText === 'Настройки'){
    menu.classList.add('hidden');
    document.getElementById('setting').classList.remove('hidden');
    } else if(target.innerText === 'Language EN'){
        menu.innerHTML = `<li>Играть</li> <li>Помощь</li> <li>Настройки</li> <li>О игре</li> <li>Язык RU</li>`
    } else if(target.innerText === 'Язык RU'){
        menu.innerHTML = `<li>Play</li> <li>Help</li> <li>Setting</li> <li>About</li> <li>Language EN</li>`
    }

};
document.getElementById('back').onclick = function(){
    menu.classList.remove('hidden');
    document.getElementById('help').classList.add('hidden');
}
document.getElementById('backSetting').onclick = function(){
    menu.classList.remove('hidden');
    document.getElementById('setting').classList.add('hidden');
}
document.getElementById('backMenu').onclick = function(){
    console.log('tut');

    audio.pause();
    document.getElementById('popup').classList.add('popup__overlay');
    menu.classList.remove('hidden');
}


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

canvas.width = 550;
canvas.height = 500;

// const game = new Game();

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
    scoreGame = 0;
    level = 1;
    document.getElementById('level').innerHTML = `Level ${level}`
    game.init(level);
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
  context.fillText('Game over', canvas.width / 2, canvas.height / 2 - 50);

  context.fillStyle = 'black';
  context.font = '20px Monaco';
  context.textAlign = 'center';
  context.fillText('Для продолжения нажми Enter', canvas.width / 2, canvas.height / 2);
}