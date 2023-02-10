import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import Stats from 'three/examples/jsm/libs/stats.module'

// threejs basics
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.setZ(25)
// UI powerups
const control = new OrbitControls(camera, renderer.domElement)
const stats = Stats()
stats.showPanel(1)
document.body.appendChild(stats.dom)

// torus
const TORUS_DATA = [10, 0.5, 16, 100] // [radius, section, segments, arc]
function torusGenerator(data, color){
  const torusGeometry = new THREE.TorusGeometry(...data);
  const torusMaterial = new THREE.MeshStandardMaterial({color: color});
  const torusMesh =  new THREE.Mesh(torusGeometry,torusMaterial);
  return torusMesh;
}
const torus1 = torusGenerator(TORUS_DATA, 0xFF1187)
const torus2 = torusGenerator(TORUS_DATA, 0x8763ff)
const torus3 = torusGenerator(TORUS_DATA, 0x65ff65)
scene.add(torus1, torus2, torus3)

// lights
const aLigthPoint = new THREE.PointLight(0xffffff);
aLigthPoint.position.set(10,5,5)
const anAmbientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(aLigthPoint, anAmbientLight)
// visual helpers
const aLightHelper = new THREE.PointLightHelper(aLigthPoint);
const aGridHelper = new THREE.GridHelper(100,100)
scene.add(aLightHelper, aGridHelper)

// point stars
Array(200).fill().forEach(()=>{
  // create shape
  const geoStar = new THREE.SphereGeometry(0.25);
  const matStar = new THREE.MeshStandardMaterial({color:0x4444ff});
  const meshStar = new THREE.Mesh(geoStar, matStar);
  // position generation and setting
  const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))
  meshStar.position.set(x,y,z)
  // adding to scene
  scene.add(meshStar)
})

// spheres
function sphereGenerator(radius, color, wire){
  const sphereGeom = new THREE.SphereGeometry(radius);
  const sphereMat = new THREE.MeshStandardMaterial({color:color, wireframe:wire});
  return new THREE.Mesh(sphereGeom, sphereMat);
}
const planet = sphereGenerator(TORUS_DATA[0], 0xff0000, true);
const  departurePoint = sphereGenerator(0.2,0xffffff, false);
const  arrivalPoint = sphereGenerator(0.2,0xffffff, false);
scene.add(planet, departurePoint, arrivalPoint)

// projectile box
const projectileGeom = new THREE.BoxGeometry(0.5,0.5,2);
const projectileMat = new THREE.MeshStandardMaterial({color:0x00ff00});
const  projectileMesh = new THREE.Mesh( projectileGeom,  projectileMat);
scene.add(projectileMesh)

// *positioning*
// point Departure
const departureSpherical = new THREE.Spherical(TORUS_DATA[0],3.1415/2,3.1415/4)
departurePoint.position.setFromSpherical(departureSpherical)
// point Arrival
const arrivalSpherical = new THREE.Spherical(TORUS_DATA[0],3.1415*3/4,-3.1415/8)
const arrivalVector3 = new THREE.Vector3().setFromSpherical(arrivalSpherical)
arrivalPoint.position.copy(arrivalVector3)
// delta angles
const deltaPhi = arrivalSpherical.phi - departureSpherical.phi
const deltaTheta = arrivalSpherical.theta - departureSpherical.theta
// projectile
const projectileSpherical = new THREE.Spherical().copy(departureSpherical)
projectileSpherical.radius += 1;
const projectileVector3 = new THREE.Vector3().setFromSpherical(projectileSpherical)
projectileMesh.position.copy(projectileVector3)

/* Text */
function textGenerator(msg,h,s,font,color){ // mesage, height, size, loadedFont, color
  const textGeometry = new TextGeometry(msg,{
    height:h,
    size:s,
    font:font
  });
  const textMaterial = new THREE.MeshStandardMaterial({color:color});
  return new THREE.Mesh(textGeometry,textMaterial);
}
const fontLoader = new FontLoader();
fontLoader.load(
  './droid_serif_regular.typeface.json',
  (loadedFont) =>{
      const text1 = textGenerator('Hello, bitches!',1,1,loadedFont,0xccffff);
      text1.position.set(-5,0,-1);
      scene.add(text1);

      const len = 0.3
      const text2 = textGenerator('By: andresrokp',len,len,loadedFont,0xccffff);
      scene.add(text2)
    }
)

function rotateMesh(mesh,rx,ry,rz){
  mesh.rotateX(rx);
  mesh.rotateY(ry);
  mesh.rotateZ(rz);
}

function animate(){
  requestAnimationFrame(animate)
  
  rotateMesh(torus1,0.01,0.005,0.01);
  rotateMesh(torus2,-0.015,-0.0055,-0.015);
  rotateMesh(torus3,-0.0081,0.0035,-0.0081);

  // TODO: rotate planet and keep geometrical relative coherence

  // projectile movement
  projectileVector3.setFromSpherical(projectileSpherical);
  if(arrivalVector3.angleTo(projectileVector3) > 0.01){
    projectileSpherical.phi += deltaPhi*0.003
    projectileSpherical.theta += deltaTheta*0.003
    projectileMesh.lookAt(new THREE.Vector3().setFromSpherical(projectileSpherical));
    projectileMesh.position.setFromSpherical(projectileSpherical);
  };

  stats.update();
  control.update();
  renderer.render(scene, camera);
}
animate();


// reset button action
const resetButton = document.getElementsByClassName('reset-btn')[0]
resetButton.addEventListener('click',(e)=>{
  projectileSpherical.copy(departureSpherical).radius += 1
  projectileVector3.setFromSpherical(projectileSpherical)
})