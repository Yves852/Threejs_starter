import "./style.css";
import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const canvas = document.querySelector(".webgl"); // App root
const scene = new THREE.Scene(); // Scene of the action
scene.background = textureLoader.load("./textures/background.jpg"); // Set background image

const camera = new THREE.PerspectiveCamera( // Set camera
    75, // FOV
    window.innerWidth / window.innerHeight, // Ratio
    0.1, // Closest distance allowed for camera
    150 // Farest distance allowed for camera
);
// Positionning camera in X Y Z
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 100;

// Add camera to the scene
scene.add(camera);

// Geometry
const earthGeometry = new THREE.SphereGeometry(12, 30, 30);
const earthMap = textureLoader.load("./textures/earth.jpg");
const earthMaterial = new THREE.MeshBasicMaterial({
    map: earthMap,
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Instantiate renderer with canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

// Update canvas size
renderer.setSize(window.innerWidth, window.innerHeight);

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Earth rotation
    earth.rotation.y = elapsedTime;

    renderer.render(scene, camera);
    requestAnimationFrame(tick); // Call tick every frame
};

tick(); // First call of tick
