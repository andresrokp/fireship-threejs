import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);

const aGeometry = new THREE.TorusGeometry(10,3,16,100);
const aMaterial = new THREE.MeshStandardMaterial({color:0xFF6347})
const aMesh = new THREE.Mesh(aGeometry,aMaterial)
scene.add(aMesh)

const aLigthPoint = new THREE.PointLight(0xffffff);
aLigthPoint.position.set(5,5,5)
const anAmbientLight = new THREE.AmbientLight(0xffffff)
scene.add(aLigthPoint, anAmbientLight)

const aLightHelper = new THREE.PointLightHelper(aLigthPoint);
const aGridHelper = new THREE.GridHelper(100,100)
scene.add(aLightHelper, aGridHelper)

/* point stars */
Array(200).fill().forEach(()=>{
  // create shape
  const geoStar = new THREE.SphereGeometry(0.25);
  const matStar = new THREE.MeshStandardMaterial({color:0xffffff});
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
      const textMaterial = new THREE.MeshBasicMaterial();
      const textMesh = new THREE.Mesh(textGeometry,textMaterial);
      textMesh.position.x = -5;
      scene.add(textMesh);
    }
)

camera.position.setZ(30)

const control = new OrbitControls(camera, renderer.domElement)


function animate(){
  requestAnimationFrame(animate)
  
  aMesh.rotateX(0.01)
  aMesh.rotateY(0.005)
  aMesh.rotateZ(0.01)

  control.update()

  renderer.render(scene, camera)
}

animate()