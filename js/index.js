const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let game;
let language = 'en';
let lives = 3;
const audioMenu = document.getElementById('audioMenu');
const audio = document.getElementById('audio');
const sound = document.getElementById('sound');
audioMenu.play();

setTimeout(function(){
	document.body.classList.add('body_visible');
}, 200);

function gameInit(){
    document.getElementById('popup').classList.add('popup__overlay');
}

gameInit();
    const menu = document.getElementById('menu');
    menu.onclick = function(event) {
    let target = event.target;
    let popup = document.getElementById('popup');
    if (target.innerText === 'PLAY' || target.innerText === 'ИГРАТЬ'){
        // pause = false;
        
        // requestAnimationFrame((x) => game.tick(x));
        audioMenu.pause();
        // console.log(game);
        if(game === undefined){
            game = new Game();
        }
        if(sound.innerHTML === 'SOUND ON' || sound.innerHTML === 'ЗВУК ВКЛ'){
            audio.play();
        } 

        // setTimeout(function(){
            popup.classList.remove('popup__overlay');
            menu.classList.add('hidden');

        // }, 200);

        // popup.classList.remove('popup__overlay');
        // menu.classList.add('hidden');
    } else if(target.innerText === 'HELP' || target.innerText === 'ПОМОЩЬ'){
        menu.classList.add('hidden');
        document.getElementById('help').classList.remove('hidden');
    
    } else if(target.innerText === 'ABOUT' || target.innerText === 'ОБ ИГРЕ'){
        menu.classList.add('hidden');
        document.getElementById('about').classList.remove('hidden');
    } else if(target.innerText === 'LANGUAGE EN'){
        language = 'ru';
        document.getElementById('result').innerHTML = 'ОЧКОВ: 0';
        document.getElementById('level').innerHTML = 'УРОВЕНЬ: 0';
        document.getElementById('backMenu').innerHTML = 'МЕНЮ';
        document.getElementById('about').innerHTML = `Arkanoid - аркадная игра, разработанная Taito в 1986 году.
        Arkanoid - это обновление ранних видеоигр с мячом и ракеткой, в частности классической игры Atari 1978 года 
        Super Breakout, в которой игрок берет на себя управление ракеткой в ​​нижней части экрана и должен использовать ее, 
        чтобы разбивать мяч по рядам кирпичей в верхней части экрана, таким образом уничтожая их и, в конечном итоге, 
        очищая экран, чтобы перейти на следующий уровень.  <div class="battonContainer"> <button class="back">Назад</button></div>` ;
        menu.innerHTML = `<li>ИГРАТЬ</li> <li>ПОМОЩЬ</li> <li>ЗВУК ВКЛ</li> <li>ЯЗЫК RU</li> <li>ОБ ИГРЕ</li>`;
    } else if(target.innerText === 'ЯЗЫК RU'){
        language = 'en';
        document.getElementById('result').innerHTML = 'SCORE: 0';
        document.getElementById('level').innerHTML = 'LEVEL: 0';
        document.getElementById('backMenu').innerHTML = 'MENU';
        document.getElementById('about').innerHTML = `Arkanoid is an arcade game developed by Taito in 1986. Arkanoid is an update 
                    of the early ball and paddle video games — and specifically of Atari's 1978 classic, 
                    Super Breakout — in which the player takes control of a paddle at the bottom of the 
                    screen and must use it to deflect a ball into rows of bricks at the top of the screen, 
                    thus destroying them and, eventually, clearing the screen to progress to the next level. 
                    <div class="battonContainer"> <button class="back">Back</button></div>`
        menu.innerHTML = `<li>PLAY</li> <li>HELP</li> <li>SOUND ON</li><li>LANGUAGE EN</li> <li>ABOUT</li>`;
    } else if(target.innerHTML === 'SOUND ON' || target.innerHTML === 'ЗВУК ВКЛ'){
        if(language === 'en'){
            target.innerHTML = 'SOUND OFF';
        } else {
            target.innerHTML = 'ЗВУК ВЫКЛ';
        }
        audioMenu.pause();
        // audio.pause();
    } else if(target.innerHTML === 'SOUND OFF' || target.innerHTML === 'ЗВУК ВЫКЛ'){
        if(language === 'en'){
            target.innerHTML = 'SOUND ON';
        } else {
            target.innerHTML = 'ЗВУК ВКЛ';
        }
        audioMenu.play();
        // audio.play();
    }
};

document.getElementById('popup').onclick = function(event) {
    let target = event.target;
    if(target.innerHTML === 'Back' || target.innerHTML === 'Назад'){
        menu.classList.remove('hidden');
        document.getElementById('help').classList.add('hidden');
        document.getElementById('about').classList.add('hidden');
        // document.getElementById('setting').classList.add('hidden');
    }
}

document.getElementById('backMenu').onclick = function(){
    pause = true;
    audio.pause();
    if(sound.innerHTML === 'SOUND ON' || sound.innerHTML === 'ЗВУК ВКЛ'){
        audioMenu.play();
    }

    document.getElementById('popup').classList.add('popup__overlay');
    menu.classList.remove('hidden');
}

const image = new Image();
image.src = './assets/images/sprite1.png';

const space = new Image();
space.src = './assets/images/space.jpg';

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


function inintNewGame(){
  scoreGame = 0;
  level = 1;
  lives = 3;
  game.blocks = [];
  score.innerText = `SCORE: ${scoreGame}`;
  document.getElementById('lives').innerHTML = `LIVES: ${lives}`;
  document.getElementById('level').innerHTML = `Level ${level}`;
  game.init(level);
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    game.platform.leftKey = true;
  } else if (event.key === 'ArrowRight') {
    game.platform.rightKey = true;
  }
});

document.addEventListener('keyup', (event) => {
  // console.log(event.key);
  if (event.key === 'ArrowLeft') {
    game.platform.leftKey = false;
  } else if (event.key === 'ArrowRight') {
    game.platform.rightKey = false;
  } else if (game.modeGame === false && event.key === 'Enter') {
      if(lives === 1){
        console.log("tut");

        inintNewGame();
      } else {
          // game.init(level);
          console.log("tut1111");

          lives -= 1;
          document.getElementById('lives').innerHTML = `LIVES: ${lives}`;
          game.init(level);
      }
    
  }
  else if (event.key === 'p' || event.key === 'з' || event.key === 'P' || event.key === 'З') {
    if(pause){
      pause = false;
      requestAnimationFrame((x) => game.tick(x));
    } else{
      pause = true;
    }
  }
  // else if (event.key === 'q') {
  //   pause = false;
  //   requestAnimationFrame((x) => game.tick(x));
  // }
});
document.getElementById('newGame').onclick = function(){
  inintNewGame();
}


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
  context.textAlign = 'center';
  if(lives === 1){
      if(language === 'ru'){
        context.font = '2rem Monaco';
        context.fillText(`Конец игры`, canvas.width / 2, canvas.height / 2 - 50);
        context.font = '1.5rem Monaco';
        context.fillText(`Ваш результат: ${scoreGame}`, canvas.width / 2, canvas.height / 2);
        context.fillText('Для начала новой игры нажмите Enter', canvas.width / 2, canvas.height / 2 + 50);
      } else{
        context.font = '2rem Monaco';
        context.fillText(`Game over`, canvas.width / 2, canvas.height / 2 - 50);
        context.font = '1.5rem Monaco';
        context.fillText(`Your result: ${scoreGame}`, canvas.width / 2, canvas.height / 2);
        context.fillText('To start a new game, click Enter', canvas.width / 2, canvas.height / 2 + 50);
      }
  } else {
    if(language === 'ru'){
        context.font = '2rem Monaco';
        context.fillText('Для продолжения нажмите Enter', canvas.width / 2, canvas.height / 2 - 50);
        context.font = '1.5rem Monaco';
        context.fillText(`У вас осталось ${lives - 1} жизней`, canvas.width / 2, canvas.height / 2);
    } else{
        context.font = '2rem Monaco';
        context.fillText('To continue, click Enter', canvas.width / 2, canvas.height / 2 - 50);
        context.font = '1.5rem Monaco';
        context.fillText(`You have ${lives - 1} lives left`, canvas.width / 2, canvas.height / 2);

    }
  }

//   context.fillStyle = 'black';
//   context.font = '20px Monaco';
//   context.textAlign = 'center';
//   context.fillText('Для продолжения нажмите Enter', canvas.width / 2, canvas.height / 2);
}
