class Platform extends Rectangle {
  constructor(parameter) {
    super(parameter);

    this.speed = parameter.speed;
    this.rightKey = parameter.rightKey;
    this.leftKey = parameter.leftKey;
  }

  draw() {
    context.drawImage(
      image,
      maps.platform.x, maps.platform.y, maps.platform.width, maps.platform.height,
      this.x, this.y, this.width, this.height,
    );
  }
}
