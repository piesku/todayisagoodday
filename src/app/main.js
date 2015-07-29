'use strict';

/* global THREE */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000);

const ambientLight = new THREE.AmbientLight(0xbbbbbb);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture('assets/wall.jpg'),
});

const buildingA = new THREE.Mesh(
  new THREE.BoxGeometry(4, 1, 7), material);
const buildingB = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1, 2), material);
const buildingC = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 4), material);

buildingB.position.set(2, 2, 0);
buildingC.position.set(-1, 2, 0);

scene.add(buildingA);
scene.add(buildingB);
scene.add(buildingC);

camera.position.set(0, 1, 5);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
