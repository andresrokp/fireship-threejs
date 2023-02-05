import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import Stats from 'three/examples/jsm/libs/stats.module'



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);

const aGeometry = new THREE.TorusGeometry(10,0.5,16,100);
const aMaterial = new THREE.MeshStandardMaterial({color:0xFF1187})
const aMesh = new THREE.Mesh(aGeometry,aMaterial)
scene.add(aMesh)

// TODO: abstract torus generation in a function
const torus2geom = new THREE.TorusGeometry(10,0.5,16,100);
const torus2mat = new THREE.MeshStandardMaterial({color:0x8763ff})
const torus2mesh = new THREE.Mesh(torus2geom,torus2mat)
scene.add(torus2mesh)

const torus3geom = new THREE.TorusGeometry(10,0.5,16,100);
const torus3mat = new THREE.MeshStandardMaterial({color:0x65ff65})
const torus3mesh = new THREE.Mesh(torus3geom,torus3mat)
scene.add(torus3mesh)

const aLigthPoint = new THREE.PointLight(0xffffff);
aLigthPoint.position.set(10,5,5)
const anAmbientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(aLigthPoint, anAmbientLight)

const aLightHelper = new THREE.PointLightHelper(aLigthPoint);
const aGridHelper = new THREE.GridHelper(100,100)
scene.add(aLightHelper, aGridHelper)

/* point stars */
Array(200).fill().forEach(()=>{
  // create shape
  const geoStar = new THREE.SphereGeometry(0.25);
  const matStar = new THREE.MeshStandardMaterial({color:0x3300ff});
  const meshStar = new THREE.Mesh(geoStar, matStar);
  // position triad generation and seting
  const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))
  meshStar.position.set(x,y,z)
  // adding to scene
  scene.add(meshStar)
})

/* Text */
const fontLoader = new FontLoader();
fontLoader.load(
  'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
  (loadedFont) =>{
      const textGeometry = new TextGeometry('Hello, bitches!',{
        height:1,
        size:1,
        font:loadedFont
      });
      const textMaterial = new THREE.MeshStandardMaterial({color:0xccffff});
      const textMesh = new THREE.Mesh(textGeometry,textMaterial);
      textMesh.position.x = -5;
      textMesh.position.z = -1;
      scene.add(textMesh);      

      const basicLen = 0.3
      const textGeometry2 = new TextGeometry('By: andresrokp',{
        height:basicLen,
        size:basicLen,
        font:loadedFont
      });
      const textMaterial2 = new THREE.MeshStandardMaterial({color:0xccffdd});
      const textMesh2 = new THREE.Mesh(textGeometry2,textMaterial2);
      textMesh2.position.x = 1.4;
      textMesh2.position.y = -basicLen-0.1;
      textMesh2.position.z = -basicLen;
      scene.add(textMesh2)
    }
)

camera.position.setZ(0.2)
camera.position.setX(2)

const control = new OrbitControls(camera, renderer.domElement)

const stats = Stats()
stats.showPanel(1)
document.body.appendChild(stats.dom)

function animate(){
  requestAnimationFrame(animate)
  
  // TODO: obstract rotations in a function
  aMesh.rotateX(0.01)
  aMesh.rotateY(0.005)
  aMesh.rotateZ(0.01)
  
  torus2mesh.rotateX(-0.015)
  torus2mesh.rotateY(-0.0055)
  torus2mesh.rotateZ(-0.015)

  torus3mesh.rotateX(-0.0081)
  torus3mesh.rotateY(0.0035)
  torus3mesh.rotateZ(-0.0081)
  
  
  stats.update()

  control.update()

  renderer.render(scene, camera)
}

animate()