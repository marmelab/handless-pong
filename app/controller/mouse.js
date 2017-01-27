import { AIM } from './mode';

const controller = (player) => {
  window.addEventListener('mousemove', (event) => {
    player.aim = event.clientX;
  });
};

controller.mode = AIM;

export default controller;
