'use strict';

import { fullscreen } from './fullscreen';
import { scene, camera } from './scene';

const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
const stereo = new THREE.StereoEffect(renderer);
stereo.separation = 1;
stereo.focalLength = 7;

stereo.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

THREEx.WindowResize(renderer, camera);

let controls = new THREE.OrbitControls(camera);

function setOrientationControls(e) {
  if (!e.alpha) {
    return;
  }
  controls = new THREE.DeviceOrientationControls(camera, true);
  controls.connect();
  controls.update();
  renderer.domElement.addEventListener(
    'click', () => fullscreen(document.body), false);
  window.removeEventListener('deviceorientation', setOrientationControls, true);
}
window.addEventListener('deviceorientation', setOrientationControls, true);



function update(dt) {
  controls.update(dt);
}

function render() {
  requestAnimationFrame(render);
  update(clock.getDelta());
  stereo.render(scene, camera);
}

render();
