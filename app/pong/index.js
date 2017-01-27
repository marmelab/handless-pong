import Player from './player';
import Computer from './computer';
import Ball from './ball';

import keyboardController from '../controller/keyboard';
import mouseController from '../controller/mouse';
import eyetrackerController from '../controller/eyetracker';

const animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame || (
  (callback) => { window.setTimeout(callback, 1000 / 60); });

export default class Game {
  constructor() {
    this.bounds = {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    };

    const canvas = document.createElement('canvas');
    canvas.width = this.bounds.width;

    canvas.height = this.bounds.height;
    this.context = canvas.getContext('2d');
    window.addEventListener('load', () => {
      document.body.appendChild(canvas);
      animate(this.step.bind(this));
    });

    const matches = /controller=(.*)$/.exec(window.location.href);
    let controller;
    switch(matches[1]){
        case 'keyboard':
            controller = keyboardController;
            break;
        case 'mouse':
            controller = mouseController;
            break;
        case 'eyetracker':
            controller = eyetrackerController;
            break;
    }

    this.player = new Player(this.bounds, controller);

    this.computer = new Computer(this.bounds);
    this.ball = new Ball(this.bounds.width / 2, this.bounds.height / 2, this.bounds);
  }

  update() {
    this.player.update();
    this.computer.update(this.ball);
    this.ball.update(this.player.paddle, this.computer.paddle);
  }

  render() {
    this.context.fillStyle = '#FFF';
    this.context.fillRect(0, 0, this.bounds.width, this.bounds.height);
    this.player.render(this.context);
    this.computer.render(this.context);
    this.ball.render(this.context);
  }

  step() {
    this.update();
    this.render();
    animate(this.step.bind(this));
  }
}
