import "./style.css";
import * as THREE from "three";
import { GreaterStencilFunc } from "three";

const canvas = document.querySelector(".webgl"); // App root
const scene = new THREE.Scene(); // Scene of the action
const camera = new THREE.PerspectiveCamera( // Set camera
    75, // FOV
    window.innerWidth / window.innerHeight, // Ratio
    0.1, // Closest distance allowed for camera
    150 // Farest distance allowed for camera
);
// Positionning camera in X Y Z
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;

// Add camera to the scene
scene.add(camera);

// Geometry
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Material
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
});

// Assemble cube
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cube);

// Instantiate renderer with canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

// Update canvas size
renderer.setSize(window.innerWidth, window.innerHeight);

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Add rotation to the cube for every new frame
    // Rotation shift given by time diff
    cube.rotation.y = elapsedTime;

    renderer.render(scene, camera);
    requestAnimationFrame(tick); // Call tick every frame
};

tick(); // First call of tick
