import Paddle from './paddle';

import { AIM, MOVES } from '../controller/mode';

export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const NO_MOVE = 'NO_MOVE';

export default class Player {
  constructor(bounds, controller) {
    this.paddle = new Paddle(bounds.width / 2, bounds.height - 20, 50, 10, bounds);
    this.mode = controller.mode;
    this.action = NO_MOVE;
    this.aim = null;
    this.update = this.mode === AIM ? this.updateAim : this.updateMove;
    controller(this);
  }

  updateAim() {
    if (this.aim < this.paddle.x) {
      this.paddle.move(-4, 0);
    } else if (this.aim > this.paddle.x) {
      this.paddle.move(4, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }

  updateMove() {
    switch (this.action) {
      case MOVE_LEFT:
        this.paddle.move(-4, 0);
        break;
      case MOVE_RIGHT:
        this.paddle.move(4, 0);
        break;
      default:
        this.paddle.move(0, 0);
    }
  }

  render(context) {
    this.paddle.render(context);
  }
}
