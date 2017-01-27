import { MOVE_LEFT, MOVE_RIGHT, NO_MOVE } from '../pong/player';
import { MOVES } from './mode';

const KEY_LEFT = 37;
const KEY_RIGHT = 39;

const keyToActionMapping = {
  [KEY_LEFT]: MOVE_LEFT,
  [KEY_RIGHT]: MOVE_RIGHT,
};

const controller = (player) => {
  window.addEventListener('keydown', (event) => {
    player.action = keyToActionMapping[event.keyCode];
  });

  window.addEventListener('keyup', (event) => {
    if (player.action === keyToActionMapping[event.keyCode]) {
      player.action = NO_MOVE;
    }
  });
};

controller.mode = MOVES;

export default controller;
