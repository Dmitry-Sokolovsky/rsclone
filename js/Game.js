let scoreGame = 0;
const score = document.getElementById('result');
let level = 1;
this.blocks = [];
let pause = false;

class Game {
  constructor(parameter) {
    this.ball = null;
    this.platform = null;
    this.blocks = [];
    this.modeGame = false;
    this.paramTimestamp = 0;

    this.init(level);

    requestAnimationFrame((x) => this.tick(x));
  }

  init(level) {
    if (language === 'en') {
      score.innerText = `SCORE: ${scoreGame}`;
      document.getElementById('lives').innerHTML = `LIVES: ${lives}`;
      document.getElementById('level').innerHTML = `LEVEL ${level}`;
    } else {
      score.innerText = `ОЧКОВ: ${scoreGame}`;
      document.getElementById('lives').innerHTML = `ЖИЗНЕЙ: ${lives}`;
      document.getElementById('level').innerHTML = `УРОВЕНЬ ${level}`;
    }
    this.modeGame = true;
    this.ball = new Ball({
      x: canvas.width / 2,
      y: canvas.height - 50,
      width: 10,
      height: 10,
      speed: 180,
      angle: Math.PI / 4 + Math.random() * Math.PI / 2,
    });

    this.platform = new Platform({
      x: canvas.width / 2 - 50,
      y: canvas.height - 30,
      width: 100,
      height: 15,
      speed: 280,
      rightKey: false,
      leftKey: false,
    });

    if (this.blocks.length === 0) {
      if (level < 7) {
        for (let x = 0; x < 12; x += 1) {
          for (let y = 0; y < (5 + level); y += 1) {
            this.blocks.push(new Block({
              x: 50 + 50 * x,
              y: 70 + 20 * y,
              width: 50,
              height: 20,
              color: getRandom(['yellow', 'red', 'green', 'pink']),
            }));
          }
        }
      } else if (level === 7) {
        for (let x = 0; x < 5; x += 1) {
          for (let y = 0; y < 10; y += 1) {
            this.blocks.push(new Block({
              x: 50 + 100 * x,
              y: 70 + 20 * y,
              width: 50,
              height: 20,
              color: getRandom(['yellow', 'red', 'green', 'pink']),
            }));
          }
        }
      } else if (level === 8) {
        for (let x = 0; x < 11; x += 1) {
          for (let y = 0; y < 7; y += 1) {
            this.blocks.push(new Block({
              x: 50 + 50 * x,
              y: 70 + 40 * y,
              width: 50,
              height: 20,
              color: getRandom(['yellow', 'red', 'green', 'pink']),
            }));
          }
        }
      }
    }
  }

  tick(timestamp) {
    if (pause) {
      return;
    }
    if ((sound.innerHTML === 'SOUND ON' || sound.innerHTML === 'ЗВУК ВКЛ') && audio.paused && audioMenu.paused) {
      audio.play();
    }
    if (level === 9) {
      this.modeGame = false;
      drawResult();
    }
    requestAnimationFrame((x) => this.tick(x));
    if (this.modeGame) {
      const dTimestamp = Math.min(16.7, timestamp - this.paramTimestamp);
      const secondPart = dTimestamp / 1000;
      this.paramTimestamp = timestamp;
      this.ball.x += secondPart * this.ball.speed * Math.cos(this.ball.angle);
      this.ball.y -= secondPart * this.ball.speed * Math.sin(this.ball.angle);
      if (this.platform.leftKey) {
        this.platform.x = Math.max(0, this.platform.x - secondPart * this.platform.speed);
      } else if (this.platform.rightKey) {
        this.platform.x = Math.min(canvas.width - this.platform.width, this.platform.x + secondPart * this.platform.speed);
      }

      for (const block of this.blocks) {
        if (block.intersection(this.ball)) {
          changeItem(this.blocks, block);

          scoreGame += 1;
          if (language === 'en') {
            score.textContent = `SCORE: ${scoreGame}`;
          } else {
            score.textContent = `ОЧКОВ: ${scoreGame}`;
          }
          if (this.blocks.length === 0) {
            this.modeGame = false;
            drawResult();

            level += 1;
            this.blocks = [];
            if (language === 'en') {
              document.getElementById('level').innerHTML = `LEVEL ${level}`;
            } else {
              document.getElementById('level').innerHTML = `УРОВЕНЬ ${level}`;
            }
            game.init(level);
          }

          const ctrl1 = new Rectangle({
            x: block.x,
            y: block.y - 15,
            width: block.width,
            height: 15,
          });
          const ctrl2 = new Rectangle({
            x: block.x - block.width,
            y: block.y,
            width: 15,
            height: block.height,
          });
          const ctrl3 = new Rectangle({
            x: block.x,
            y: block.y + block.height,
            width: block.width,
            height: 15,
          });
          const ctrl4 = new Rectangle({
            x: block.x - 15,
            y: block.y,
            width: 15,
            height: block.height,
          });

          if (ctrl1.intersection(this.ball) || ctrl3.intersection(this.ball)) {
            this.ball.angle = Math.PI * 2 - this.ball.angle;
          } else if (ctrl2.intersection(this.ball) || ctrl4.intersection(this.ball)) {
            this.ball.angle = Math.PI - this.ball.angle;
          }
          break;
        }
      }

      if (borders[0].intersection(this.ball)) {
        this.ball.angle = Math.PI * 2 - this.ball.angle;
      } else if (borders[1].intersection(this.ball) || borders[3].intersection(this.ball)) {
        this.ball.angle = Math.PI - this.ball.angle;
      }

      if (this.platform.intersection(this.ball)) {
        const x = this.ball.x + this.ball.width / 2;
        const percent = (x - this.platform.x) / this.platform.width;
        this.ball.angle = Math.PI - Math.PI * 8 / 10 * (percent + 0.05);
      }
      if (borders[2].intersection(this.ball)) {
        this.modeGame = false;
      }
    }
    clearCanvas();

    this.ball.draw();

    for (const block of this.blocks) {
      block.draw();
    }

    this.platform.draw();
    if (!this.modeGame) {
      drawResult();
    }
  }
}
