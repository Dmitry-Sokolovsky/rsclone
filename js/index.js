const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let game;
let language = 'en';
let lives = 3;
const audioMenu = document.getElementById('audioMenu');
const audio = document.getElementById('audio');
const sound = document.getElementById('sound');
let statusWin = false;
audioMenu.play();

setTimeout(() => {
  document.body.classList.add('body_visible');
}, 200);

function gameInit() {
  document.getElementById('popup').classList.add('popup__overlay');
}

function setStatistic() {
  if (language === 'ru') {
    document.getElementById('best-results').innerHTML = `<li>Результат 1: ${statistic[0]}</li>
  <li>Результат 2: ${statistic[1]}</li> <li>Результат 3: ${statistic[2]}</li>
  <li>Результат 4: ${statistic[3]}</li><li>Результат 5: ${statistic[4]}</li> 
  <div class="battonContainer"> <button class="back">Назад</button></div>`;
  } else {
    document.getElementById('best-results').innerHTML = `<li>Score 1: ${statistic[0]}</li>
    <li>Score 2: ${statistic[1]}</li> <li>Score 3: ${statistic[2]}</li>
    <li>Score 4: ${statistic[3]}</li><li>Score 5: ${statistic[4]}</li> 
    <div class="battonContainer"> <button class="back">Back</button></div>`;
  }
}
const statistic = [0, 0, 0, 0, 0];
function setLocalStorageResult() {
  if (statistic.length === 0) {
    statistic.push(scoreGame);
  } else if (statistic.length < 5) {
    if (statistic.indexOf(scoreGame) === -1) {
      statistic.push(scoreGame);
    }
  } else {
    for (let i = 0; i < statistic.length; i += 1) {
      if (scoreGame > statistic[i]) {
        if (statistic.indexOf(scoreGame) === -1) {
          statistic.pop();
          statistic.push(scoreGame);
        }
      }
    }
  }
  statistic.sort((a, b) => b - a);
  localStorage.setItem('results', JSON.stringify(statistic));

  setStatistic();
}
function setStatisticLocalStorage() {
  const statisticLocalStorage = JSON.parse(localStorage.getItem('results'));
  if (statisticLocalStorage !== null) {
    for (let i = 0; i < statisticLocalStorage.length; i += 1) {
      statistic[i] = statisticLocalStorage[i];
    }
  }
  setStatistic();
}
setStatisticLocalStorage();

gameInit();
const menu = document.getElementById('menu');
menu.onclick = function (event) {
  const { target } = event;
  const popup = document.getElementById('popup');
  if (target.innerText === 'PLAY' || target.innerText === 'ИГРАТЬ') {
    audioMenu.pause();
    if (game === undefined) {
      game = new Game();
    }
    if (sound.innerHTML === 'SOUND ON' || sound.innerHTML === 'ЗВУК ВКЛ') {
      audio.play();
    }

    popup.classList.remove('popup__overlay');
    menu.classList.add('hidden');
  } else if (target.innerText === 'HELP' || target.innerText === 'ПОМОЩЬ') {
    menu.classList.add('hidden');
    document.getElementById('help').classList.remove('hidden');
  } else if (target.innerText === 'ABOUT' || target.innerText === 'ОБ ИГРЕ') {
    menu.classList.add('hidden');
    document.getElementById('about').classList.remove('hidden');
  } else if (target.innerText === 'STATISTIC' || target.innerText === 'СТАТИСТИКА') {
    menu.classList.add('hidden');
    document.getElementById('best-results').classList.remove('hidden');
  } else if (target.innerText === 'LANGUAGE EN') {
    language = 'ru';
    document.getElementById('result').innerHTML = `ОЧКОВ: ${scoreGame}`;
    document.getElementById('level').innerHTML = `УРОВЕНЬ: ${level}`;
    document.getElementById('lives').innerHTML = `ЖИЗНЕЙ: ${lives}`;
    document.getElementById('backMenu').innerHTML = 'Меню';
    document.getElementById('new-game').innerHTML = 'Новая игра';
    document.getElementById('save-game').innerHTML = 'Сохранить';
    document.getElementById('load-game').innerHTML = 'Загрузить';
    document.getElementById('about').innerHTML = `Arkanoid - аркадная игра, разработанная Taito в 1986 году.
        Arkanoid - это обновление ранних видеоигр с мячом и ракеткой, в частности классической игры Atari 1978 года 
        Super Breakout, в которой игрок берет на себя управление ракеткой в нижней части экрана и должен использовать ее, 
        чтобы разбивать мяч по рядам кирпичей в верхней части экрана, таким образом уничтожая их и, в конечном итоге, 
        очищая экран, чтобы перейти на следующий уровень.  <div class="battonContainer"> <button class="back">Назад</button></div>`;
    document.getElementById('help').innerHTML = `<li>Для начала игры выберите пункт меню "ИГРАТЬ".</li>
                <li>Для изучения настройки игры выберите пункт меню "ПОМОЩЬ".</li>
                <li>Чтобы выйти в меню нажмите клавишу "Escape" на клавиатуре, либо кнопку "Меню" на экране.</li>
                <li>Для сохранения игры нажмите клавишу "s" на клавиатуре, либо кнопку "Сохранить" на экране.</li>
                <li>Для загрузки игры нажмите клавишу "l" на клавиатуре, либо кнопку "Загрузить" на экране.</li>
                <li>Для начала новой игры нажмите "n" на клавиатуре, либо кнопку "Новая игра" на экране.</li>
                <li>Чтобы остановить или возобновить игру нажмите "p" на клавиатуре. </li><div class="battonContainer">
                <button class="back">Назад</button></div>`;
    setStatistic();
    menu.innerHTML = '<li>ИГРАТЬ</li> <li>ПОМОЩЬ</li> <li>ЗВУК ВКЛ</li> <li>ЯЗЫК RU</li> <li>ОБ ИГРЕ</li><li>СТАТИСТИКА</li>';
  } else if (target.innerText === 'ЯЗЫК RU') {
    language = 'en';
    document.getElementById('result').innerHTML = `SCORE: ${scoreGame}`;
    document.getElementById('lives').innerHTML = `LIVES: ${lives}`;
    document.getElementById('level').innerHTML = `LEVEL ${level}`;
    document.getElementById('backMenu').innerHTML = 'Menu';
    document.getElementById('new-game').innerHTML = 'New game';
    document.getElementById('save-game').innerHTML = 'Save';
    document.getElementById('load-game').innerHTML = 'Load';
    document.getElementById('about').innerHTML = `Arkanoid is an arcade game developed by Taito in 1986. Arkanoid is an update 
                    of the early ball and paddle video games — and specifically of Atari's 1978 classic, 
                    Super Breakout — in which the player takes control of a paddle at the bottom of the 
                    screen and must use it to deflect a ball into rows of bricks at the top of the screen, 
                    thus destroying them and, eventually, clearing the screen to progress to the next level. 
                    <div class="battonContainer"> <button class="back">Back</button></div>`;
    document.getElementById('help').innerHTML = `<li>To start the game, select the "PLAY" menu item.</li>
                  <li>To learn the game settings, select the "HELP" menu item.</li>
                  <li>To exit the menu, press the "Escape" key on the keyboard, or the "Menu" button on the screen.</li>
                  <li>To save the game, press the " s "key on the keyboard, or the "Save" button on the screen.</li>
                  <li>To download the game, press the " l "key on the keyboard, or the "Download" button on the screen.</li>
                  <li>Для начала новой игры нажмите "n" на клавиатуре, либо кнопку "Новая игра" на экране.</li>
                  <li>To stop or resume the game, press " p " on the keyboard. </li><div class="battonContainer">
                  <button class="back">Back</button></div>`;
    setStatistic();
    menu.innerHTML = '<li>PLAY</li> <li>HELP</li> <li>SOUND ON</li><li>LANGUAGE EN</li> <li>ABOUT</li><li>STATISTIC</li>';
  } else if (target.innerHTML === 'SOUND ON' || target.innerHTML === 'ЗВУК ВКЛ') {
    if (language === 'en') {
      target.innerHTML = 'SOUND OFF';
    } else {
      target.innerHTML = 'ЗВУК ВЫКЛ';
    }
    audioMenu.pause();
  } else if (target.innerHTML === 'SOUND OFF' || target.innerHTML === 'ЗВУК ВЫКЛ') {
    if (language === 'en') {
      target.innerHTML = 'SOUND ON';
    } else {
      target.innerHTML = 'ЗВУК ВКЛ';
    }
    audioMenu.play();
  }
};

function pauseGame() {
  if (pause) {
    pause = false;
    requestAnimationFrame((x) => game.tick(x));
  }
}

document.getElementById('popup').onclick = function (event) {
  const { target } = event;
  if (target.innerHTML === 'Back' || target.innerHTML === 'Назад') {
    menu.classList.remove('hidden');
    document.getElementById('help').classList.add('hidden');
    document.getElementById('about').classList.add('hidden');
    document.getElementById('best-results').classList.add('hidden');
  }
};

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

function inintNewGame() {
  pauseGame();
  scoreGame = 0;
  level = 1;
  lives = 3;
  game.blocks = [];
  if (language === 'en') {
    score.innerText = `SCORE: ${scoreGame}`;
    document.getElementById('lives').innerHTML = `LIVES: ${lives}`;
    document.getElementById('level').innerHTML = `LEVEL ${level}`;
  } else {
    score.innerText = `ОЧКОВ: ${scoreGame}`;
    document.getElementById('lives').innerHTML = `ЖИЗНЕЙ: ${lives}`;
    document.getElementById('level').innerHTML = `УРОВЕНЬ ${level}`;
  }
  game.init(level);
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

  if (level === 9) {
    statusWin = true;
    context.font = '2rem Monaco';

    if (language === 'ru') {
      setLocalStorageResult();
      context.fillText('ВЫ ВЫИГРАЛИ', canvas.width / 2, canvas.height / 2 - 50);
      context.font = '1.5rem Monaco';
      context.fillText(`Ваш результат: ${scoreGame}`, canvas.width / 2, canvas.height / 2);
      context.fillText('Для начала новой игры нажмите Enter', canvas.width / 2, canvas.height / 2 + 50);
    } else {
      setLocalStorageResult();
      context.fillText('YOU WINNER', canvas.width / 2, canvas.height / 2 - 50);
      context.font = '1.5rem Monaco';
      context.fillText(`Your result: ${scoreGame}`, canvas.width / 2, canvas.height / 2);
      context.fillText('To start a new game, click Enter', canvas.width / 2, canvas.height / 2 + 50);
    }
    return;
  }

  if (lives === 1) {
    if (language === 'ru') {
      setLocalStorageResult();
      context.font = '2rem Monaco';
      context.fillText('Конец игры', canvas.width / 2, canvas.height / 2 - 50);
      context.font = '1.5rem Monaco';
      context.fillText(`Ваш результат: ${scoreGame}`, canvas.width / 2, canvas.height / 2);
      context.fillText('Для начала новой игры нажмите Enter', canvas.width / 2, canvas.height / 2 + 50);
    } else {
      setLocalStorageResult();
      context.font = '2rem Monaco';
      context.fillText('Game over', canvas.width / 2, canvas.height / 2 - 50);
      context.font = '1.5rem Monaco';
      context.fillText(`Your result: ${scoreGame}`, canvas.width / 2, canvas.height / 2);
      context.fillText('To start a new game, click Enter', canvas.width / 2, canvas.height / 2 + 50);
    }
  } else if (language === 'ru') {
    context.font = '2rem Monaco';
    context.fillText('Для продолжения нажмите Enter', canvas.width / 2, canvas.height / 2 - 50);
    context.font = '1.5rem Monaco';
    context.fillText(`У вас осталось ${lives - 1} жизней`, canvas.width / 2, canvas.height / 2);
  } else {
    context.font = '2rem Monaco';
    context.fillText('To continue, click Enter', canvas.width / 2, canvas.height / 2 - 50);
    context.font = '1.5rem Monaco';
    context.fillText(`You have ${lives - 1} lives left`, canvas.width / 2, canvas.height / 2);
  }
}
let storageGame;
function setLocalStorage() {
  localStorage.setItem('gameBlocks', JSON.stringify(game.blocks));
  localStorage.setItem('level', JSON.stringify(level));
  localStorage.setItem('lives', JSON.stringify(lives));
  localStorage.setItem('score', JSON.stringify(scoreGame));
}

function getLocalStorage() {
  const storageGame = JSON.parse(localStorage.getItem('gameBlocks'));
  const storageLevel = JSON.parse(localStorage.getItem('level'));
  const storageLives = JSON.parse(localStorage.getItem('lives'));
  const storageScore = JSON.parse(localStorage.getItem('score'));

  scoreGame = storageScore;
  level = storageLevel;
  lives = storageLives;
  game.blocks = [];
  for (let i = 0; i < storageGame.length; i += 1) {
    game.blocks.push(new Block({
      x: storageGame[i].x,
      y: storageGame[i].y,
      width: storageGame[i].width,
      height: storageGame[i].height,
      color: storageGame[i].color,
    }));
  }
}

document.getElementById('save-game').onclick = setLocalStorage;

function loadGame() {
  pauseGame();
  getLocalStorage();

  if (language === 'en') {
    score.innerText = `SCORE: ${scoreGame}`;
    document.getElementById('lives').innerHTML = `LIVES: ${lives}`;
    document.getElementById('level').innerHTML = `LEVEL ${level}`;
  } else {
    score.innerText = `ОЧКОВ: ${scoreGame}`;
    document.getElementById('lives').innerHTML = `ЖИЗНЕЙ: ${lives}`;
    document.getElementById('level').innerHTML = `УРОВЕНЬ ${level}`;
  }
  game.init(level);
}
document.getElementById('load-game').onclick = loadGame;

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    game.platform.leftKey = true;
  } else if (event.key === 'ArrowRight') {
    game.platform.rightKey = true;
  }
});

function backMainMenu() {
  pause = true;
  audio.pause();
  if (sound.innerHTML === 'SOUND ON' || sound.innerHTML === 'ЗВУК ВКЛ') {
    audioMenu.play();
  }
  document.getElementById('popup').classList.add('popup__overlay');
  menu.classList.remove('hidden');
}
document.getElementById('backMenu').onclick = backMainMenu;

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft') {
    game.platform.leftKey = false;
  } else if (event.key === 'ArrowRight') {
    game.platform.rightKey = false;
  } else if (game.modeGame === false && event.key === 'Enter') {
    if (pause) {
      pause = false;
      requestAnimationFrame((x) => game.tick(x));
    }
    if (statusWin) {
      statusWin = false;
      inintNewGame();
    } else if (lives === 1) {
      inintNewGame();
    } else {
      lives -= 1;
      if (language === 'ru') {
        document.getElementById('lives').innerHTML = `ЖИЗНЕЙ: ${lives}`;
      } else {
        document.getElementById('lives').innerHTML = `LIVES: ${lives}`;
      }

      game.init(level);
    }
  } else if (event.key === 'p' || event.key === 'з' || event.key === 'P' || event.key === 'З') {
    if (pause) {
      pause = false;
      requestAnimationFrame((x) => game.tick(x));
    } else {
      pause = true;
    }
  } else if (event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы') {
    setLocalStorage();
  } else if (event.key === 'l' || event.key === 'L' || event.key === 'д' || event.key === 'Д') {
    loadGame();
  } else if (event.key === 'n' || event.key === 'N' || event.key === 'т' || event.key === 'Т') {
    inintNewGame();
  } else if (event.key === 'Escape') {
    backMainMenu();
  }
});
document.getElementById('new-game').onclick = function () {
  document.getElementById('new-game').blur();
  inintNewGame();
};
