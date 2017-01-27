export default class Ball {
  constructor(x, y, bounds) {
    this.originalX = x;
    this.originalY = y;
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
    this.maxWidth = bounds.width;
    this.maxHeight = bounds.height;
  }

  update(paddle1, paddle2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    const topX = this.x - 5;
    const topY = this.y - 5;
    const bottomX = this.x + 5;
    const bottomY = this.y + 5;

    if (this.x - 5 < 0) { // hitting the left wall
      this.x = 5;
      this.x_speed = -this.x_speed;
    } else if (this.x + 5 > this.maxWidth) { // hitting the right wall
      this.x = this.maxWidth - 5;
      this.x_speed = -this.x_speed;
    }

    if (this.y < 0 || this.y > this.maxHeight) { // a point was scored
      this.x_speed = 0;
      this.y_speed = 3;
      this.x = this.originalX;
      this.y = this.originalY;
    }

    if (topY > this.originalY) {
      if (
          topY < (paddle1.y + paddle1.height) &&
          bottomY > paddle1.y &&
          topX < (paddle1.x + paddle1.width) &&
          bottomX > paddle1.x
      ) {
      // hit the first paddle
        this.y_speed = -3;
        this.x_speed += (paddle1.x_speed / 2);
        this.y += this.y_speed;
      }
    } else if (
        topY < (paddle2.y + paddle2.height) &&
        bottomY > paddle2.y &&
        topX < (paddle2.x + paddle2.width) &&
        bottomX > paddle2.x
    ) {
      // hit the second paddle
      this.y_speed = 3;
      this.x_speed += (paddle2.x_speed / 2);
      this.y += this.y_speed;
    }
  }

  render(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = '#000000';
    context.fill();
  }
}
