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
    200 // Farest distance allowed for camera
);
// Positionning camera in X Y Z
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 100;

// Add camera to the scene
scene.add(camera);

// Earth
// Geometry
const earthGeometry = new THREE.SphereGeometry(6, 30, 30);
const earthMap = textureLoader.load("./textures/earth.jpg");
const earthMaterial = new THREE.MeshBasicMaterial({
    map: earthMap,
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

scene.add(earth);

// Sun
const sunMap = textureLoader.load("./textures/sun.jpg");
const sunGeometry = new THREE.SphereGeometry(20, 30, 30);
const sunMaterial = new THREE.MeshMatcapMaterial({
    map: sunMap,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

scene.add(sun);

// Mercury
const mercuryGeometry = new THREE.SphereGeometry(2, 30, 30);
const mercuryMap = textureLoader.load("./textures/mercury.jpg");
const mercuryMaterial = new THREE.MeshBasicMaterial({
    map: mercuryMap,
});
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

scene.add(mercury);

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
    earth.rotation.y = elapsedTime * 2;
    // Rotate around sun
    earth.position.x = Math.sin(elapsedTime * 0.2274) * 70;
    earth.position.z = Math.cos(elapsedTime * 0.2274) * 70;

    mercury.rotation.y = elapsedTime;

    mercury.position.x = Math.sin(elapsedTime * 0.365) * 40;
    mercury.position.z = Math.cos(elapsedTime * 0.365) * 40;

    renderer.render(scene, camera);
    requestAnimationFrame(tick); // Call tick every frame
};

tick(); // First call of tick
