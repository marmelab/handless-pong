import { AIM } from './mode';

const width = 320;
const height = 240;
const topDist = '0px';
const leftDist = '0px';

const setup = function () {
  const video = document.getElementById('webgazerVideoFeed');
  video.style.display = 'block';
  video.style.position = 'absolute';
  video.style.top = topDist;
  video.style.left = leftDist;
  video.width = width;
  video.height = height;
  video.style.margin = '0px';

  webgazer.params.imgWidth = width;
  webgazer.params.imgHeight = height;

  const overlay = document.createElement('canvas');
  overlay.id = 'overlay';
  overlay.style.position = 'absolute';
  overlay.width = width;
  overlay.height = height;
  overlay.style.top = topDist;
  overlay.style.left = leftDist;
  overlay.style.margin = '0px';

  document.body.appendChild(overlay);

  const cl = webgazer.getTracker().clm;

  function drawLoop() {
    requestAnimFrame(drawLoop);
    overlay.getContext('2d').clearRect(0, 0, width, height);
    if (cl.getCurrentPosition()) {
      cl.draw(overlay);
    }
  }
  drawLoop();
};

let checkIfWebGazerReadyInterval;
const checkIfWebGazerReady = () => {
  if (webgazer.isReady()) {
    setup();
    clearInterval(checkIfWebGazerReadyInterval);
  }
};

const controller = (player) => {
  checkIfWebGazerReadyInterval = setInterval(checkIfWebGazerReady, 100);

  window.addEventListener('load', () => {
    webgazer.setRegression('ridge')
            .setTracker('clmtrackr')
            .setGazeListener((data) => {
              if (data == null) {
                return;
              }
              player.aim = data.x;
            })
            .begin()
            .showPredictionPoints(true)
    ;
  });

  window.onbeforeunload = function () {
    webgazer.end();
  };
};

controller.mode = AIM;

export default controller;
