import './style.css'
import * as THREE from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);

const aGeometry = new THREE.TorusGeometry(10,3,16,100);
const aMaterial = new THREE.MeshBasicMaterial({color:0xFF6347, wireframe:true})
const aMesh = new THREE.Mesh(aGeometry,aMaterial)


scene.add(aMesh)
camera.position.setZ(30)

function animate(){
  requestAnimationFrame(animate)
  
  aMesh.rotateX(0.01)
  aMesh.rotateY(0.005)
  aMesh.rotateZ(0.01)

  renderer.render(scene, camera)
}

animate()