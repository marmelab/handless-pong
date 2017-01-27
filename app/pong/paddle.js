export default class Paddle {
  constructor(x, y, width, height, bounds) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
    this.maxWidth = bounds.width;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if (this.x < 0) { // all the way to the left
      this.x = 0;
    } else if (this.x + this.width > this.maxWidth) { // all the way to the right
      this.x = this.maxWidth - this.width;
    }
  }

  render(context) {
    context.fillStyle = '#000';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
