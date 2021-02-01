class Block extends Rectangle {
  constructor(parameter) {
    super(parameter);

    this.color = parameter.color;
  }

  draw() {
    context.drawImage(
      image,
      maps[this.color].x, maps[this.color].y, maps[this.color].width, maps[this.color].height,
      this.x, this.y, this.width, this.height,
    );
  }
}
