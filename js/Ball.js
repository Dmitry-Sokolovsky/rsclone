class Ball extends Rectangle {
  constructor(parameter) {
    super(parameter);
    this.speed = parameter.speed;
    this.angle = parameter.angle;
  }

  draw() {
    context.drawImage(
      image,
      maps.ball.x, maps.ball.y, maps.ball.width, maps.ball.height,
      this.x, this.y, this.width, this.height,
    );
  }
}
