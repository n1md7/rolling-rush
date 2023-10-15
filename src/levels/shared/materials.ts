import * as THREE from 'three';

const imageCanvas = document.createElement('canvas')!;
const context = imageCanvas.getContext('2d')!;

imageCanvas.width = imageCanvas.height = 100; // 1m x 1m

context.fillStyle = '#000000';
context.fillRect(0, 0, 100, 100);

// Creating a checkerboard pattern with four squares
// [white, black]
// [black, white]
context.fillStyle = '#ffffff';
context.fillRect(0, 0, 50, 50);
context.fillRect(50, 50, 50, 50);

const map = new THREE.CanvasTexture(imageCanvas);
map.colorSpace = THREE.SRGBColorSpace;
map.repeat.set(5, 5);
map.wrapS = THREE.RepeatWrapping;
map.wrapT = THREE.RepeatWrapping;

export const finishFloorMaterial = new THREE.MeshStandardMaterial({ map });
export const startFloorMaterial = new THREE.MeshStandardMaterial({ color: 'limegreen' });
export const middleFloorMaterial = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
export const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
export const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });
