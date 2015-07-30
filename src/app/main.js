'use strict';

/* global THREE, THREEx */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / window.innerHeight, 0.1, 10);

const controls = new THREE.OrbitControls(camera);

const orientation = new THREEx.DeviceOrientationState();

const ambientLight = new THREE.AmbientLight(0xbbbbbb);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

THREEx.WindowResize(renderer, camera);
THREEx.FullScreen.bindKey({
  dblclick: true,
});

const wall = new THREE.MeshPhongMaterial({
  map: THREE.ImageUtils.loadTexture('assets/wall.jpg'),
});

const roofs = new THREE.MeshPhongMaterial({
  map: THREE.ImageUtils.loadTexture('assets/roofs.jpg'),
});

const meshFaceMaterial = new THREE.MeshFaceMaterial(
  [wall, wall, wall, wall, roofs, wall]);

const roof1 = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(1, 0),
  new THREE.Vector2(1, 0.25),
  new THREE.Vector2(0, 0.25),
];

const roof2 = [
  new THREE.Vector2(0, 0.25),
  new THREE.Vector2(1, 0.25),
  new THREE.Vector2(1, 0.5),
  new THREE.Vector2(0, 0.5),
];

const roof3 = [
  new THREE.Vector2(0, 0.5),
  new THREE.Vector2(1, 0.5),
  new THREE.Vector2(1, 0.75),
  new THREE.Vector2(0, 0.75),
];

const roof4 = [
  new THREE.Vector2(0, 0.75),
  new THREE.Vector2(1, 0.75),
  new THREE.Vector2(1, 1),
  new THREE.Vector2(0, 1),
];

const geometry1 = new THREE.BoxGeometry(1, 2, 7);
const geometry2 = new THREE.BoxGeometry(1, 2, 2);
const geometry3 = new THREE.BoxGeometry(1, 2, 4);
const geometry4 = new THREE.BoxGeometry(1, 2, 3);

geometry1.faceVertexUvs[0][8] = [ roof2[0], roof2[1], roof2[3] ];
geometry1.faceVertexUvs[0][9] = [ roof2[1], roof2[2], roof2[3] ];

geometry2.faceVertexUvs[0][8] = [ roof1[0], roof1[1], roof1[3] ];
geometry2.faceVertexUvs[0][9] = [ roof1[1], roof1[2], roof1[3] ];

geometry3.faceVertexUvs[0][8] = [ roof3[0], roof3[1], roof3[3] ];
geometry3.faceVertexUvs[0][9] = [ roof3[1], roof3[2], roof3[3] ];

geometry4.faceVertexUvs[0][8] = [ roof4[0], roof4[1], roof4[3] ];
geometry4.faceVertexUvs[0][9] = [ roof4[1], roof4[2], roof4[3] ];

const building1 = new THREE.Mesh(geometry1, meshFaceMaterial);
const building2 = new THREE.Mesh(geometry2, meshFaceMaterial);
const building3 = new THREE.Mesh(geometry3, meshFaceMaterial);
const building4 = new THREE.Mesh(geometry4, meshFaceMaterial);

building1.position.set(0, -0.60, 3.5);
building1.rotateZ(Math.PI / 2);

building2.position.set(-2, 2, 1);

building3.position.set(-1, 2, 2);

building4.position.set(2, 1.5, 1.5);
building4.rotateZ(Math.PI / 2);

scene.add(building1);
scene.add(building2);
scene.add(building3);
scene.add(building4);

camera.position.set(0, 0, 8);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
  //console.log(orientation.angleX());
}

render();
