import './style.css';
import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');

// Scene

const scene = new THREE.Scene();

// Camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;
scene.add(camera);

//Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})

renderer.setSize(window.innerWidth, window.innerHeight);
