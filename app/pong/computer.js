import Paddle from './paddle';

export default class Computer {
  constructor(bounds) {
    this.maxWidth = bounds.width;
    this.paddle = new Paddle(bounds.width / 2, 20, 50, 10, bounds);
  }

  update(ball) {
    const xPos = ball.x;
    let diff = -((this.paddle.x + (this.paddle.width / 2)) - xPos);
    if (diff < 0 && diff < -4) { // max speed left
      diff = -5;
    } else if (diff > 0 && diff > 4) { // max speed right
      diff = 5;
    }
    this.paddle.move(diff, 0);
    if (this.paddle.x < 0) {
      this.paddle.x = 0;
    } else if (this.paddle.x + this.paddle.width > this.maxWidth) {
      this.paddle.x = this.maxWidth - this.paddle.width;
    }
  }

  render(context) {
    this.paddle.render(context);
  }

}
