class Rectangle {
  constructor(parameter) {
    this.x = parameter.x;
    this.y = parameter.y;
    this.width = parameter.width;
    this.height = parameter.height;
  }

  draw() {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.strokeStyle = 'blue';
    context.stroke();
  }

  intersection(block) {
    return Rectangle.intersection(this, block);
  }

  static intersection(blockA, blockB) {
    const pointsA = [
      { x: blockA.x, y: blockA.y },
      { x: blockA.x + blockA.width, y: blockA.y },
      { x: blockA.x, y: blockA.y + blockA.height },
      { x: blockA.x + blockA.width, y: blockA.y + blockA.height },
    ];

    for (const pointA of pointsA) {
      if (blockB.x <= pointA.x
              && pointA.x <= blockB.x + blockB.width
              && blockB.y <= pointA.y
              && pointA.y <= blockB.y + blockB.height) {
        return true;
      }
    }
    const pointsB = [
      { x: blockB.x, y: blockB.y },
      { x: blockB.x + blockB.width, y: blockB.y },
      { x: blockB.x, y: blockB.y + blockB.height },
      { x: blockB.x + blockB.width, y: blockB.y + blockB.height },
    ];

    for (const pointB of pointsB) {
      if (blockA.x <= pointB.x
              && pointB.x <= blockA.x + blockA.width
              && blockA.y <= pointB.y
              && pointB.y <= blockA.y + blockA.height) {
        return true;
      }
    }
    return false;
  }
}
