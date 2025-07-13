import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const textureloader = new THREE.TextureLoader()

const alphafloortext = textureloader.load('./floor/alpha.jpg')

const floorcolortext = textureloader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg')
floorcolortext.colorSpace = THREE.SRGBColorSpace
floorcolortext.wrapS = THREE.RepeatWrapping
floorcolortext.wrapT = THREE.RepeatWrapping
floorcolortext.repeat.set(5, 5)

const floorARMtext = textureloader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg')
floorARMtext.wrapS = THREE.RepeatWrapping
floorARMtext.wrapT = THREE.RepeatWrapping
floorARMtext.repeat.set(5, 5)

const floornormaltext = textureloader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg')
floornormaltext.wrapS = THREE.RepeatWrapping
floornormaltext.wrapT = THREE.RepeatWrapping
floornormaltext.repeat.set(5, 5)

const floordisplacementtext = textureloader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg')
floordisplacementtext.wrapS = THREE.RepeatWrapping
floordisplacementtext.wrapT = THREE.RepeatWrapping
floordisplacementtext.repeat.set(5, 5)

const wallcolortext = textureloader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg')
wallcolortext.colorSpace = THREE.SRGBColorSpace
const wallARMtext = textureloader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg')
const wallnormaltext = textureloader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg')

const roofcolortext = textureloader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg')
roofcolortext.colorSpace = THREE.SRGBColorSpace
roofcolortext.wrapS = THREE.RepeatWrapping
roofcolortext.repeat.set(3,1)

const roofARMtext = textureloader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg')
roofARMtext.wrapS = THREE.RepeatWrapping
roofARMtext.repeat.set(3,1)

const roofnormaltext = textureloader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg')
roofnormaltext.wrapS = THREE.RepeatWrapping
roofnormaltext.repeat.set(3,1)

const bushnormaltext = textureloader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg')
bushnormaltext.repeat.set(2, 1)
bushnormaltext.wrapS = THREE.RepeatWrapping

const bushcolortext = textureloader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg')
bushcolortext.colorSpace = THREE.SRGBColorSpace
bushcolortext.repeat.set(2, 1)
bushcolortext.wrapS = THREE.RepeatWrapping

const bushARMtext = textureloader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg')
bushARMtext.repeat.set(2, 1)
bushARMtext.wrapS = THREE.RepeatWrapping

const gravenormaltext = textureloader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg')
gravenormaltext.repeat.set(0.3,0.4)

const gravecolortext = textureloader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg')
gravecolortext.colorSpace = THREE.SRGBColorSpace
gravecolortext.repeat.set(0.3,0.4)

const graveARMtext = textureloader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg')
graveARMtext.repeat.set(0.3,0.4)

const doorcolortext = textureloader.load('./door/color.jpg')
doorcolortext.colorSpace = THREE.SRGBColorSpace
const dooralphatext = textureloader.load('./door/alpha.jpg')
const doorambientOcclusiontext = textureloader.load('./door/ambientOcclusion.jpg')
const doorheighttext = textureloader.load('./door/height.jpg')
const doormetalnesstext = textureloader.load('./door/metalness.jpg')
const doornormaltext = textureloader.load('./door/normal.jpg')
const doorroughnesstext = textureloader.load('./door/roughness.jpg')

// const chimneycolor = textureloader.load('./chimney/chimney_diff.jpg')
// chimneycolor.colorSpace = THREE.SRGBColorSpace
// const chimneyARM = textureloader.load('./chimney/chimney_arm.jpg')
// const chimneynormal = textureloader.load('./chimney/chimney_nor_gl.jpg')
// const chimneyheight = textureloader.load('./chimney/chimney_disp.jpg')
// const chimneyao = textureloader.load('./chimney/chimney_ao.jpg')
/**
 * House
 */
// Temporary sphere
const house = new THREE.Group()
scene.add(house)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallcolortext,
        aoMap: wallARMtext,
        roughnessMap: wallARMtext,
        metalnessMap: wallARMtext,
        normalMap: wallnormaltext,
    })
)
house.add(walls)
walls.position.y += 1.252
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofcolortext,
        aoMap: roofARMtext,
        roughnessMap: roofARMtext,
        metalnessMap: roofARMtext,
        normalMap: roofnormaltext
    })
)
house.add(roof)
roof.position.y = 2.5 + 0.752
roof.rotation.y = 0.785

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorcolortext,
        transparent: true,
        alphaMap: dooralphatext,
        aoMap: doorambientOcclusiontext,
        roughnessMap: doorroughnesstext,
        metalnessMap: doormetalnesstext,
        normalMap: doornormaltext,
        displacementMap: doorheighttext,
        displacementScale: 0.15,
        displacementBias: -0.04
    })
)
house.add(door)
door.position.y = 1.25
door.position.z = 2.01 


const chimneyOuterRadius = 0.25
const chimneyInnerRadius = 0.18
const chimneyHeight = 1
const chimneyRadialSegments = 32

const chimneyGeometry = new THREE.CylinderGeometry(
    chimneyOuterRadius, chimneyOuterRadius, chimneyHeight, chimneyRadialSegments, 1, true // openEnded = true
)
const chimneyMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide,
    map: wallcolortext,
        aoMap: wallARMtext,
        roughnessMap: wallARMtext,
        metalnessMap: wallARMtext,
        normalMap: wallnormaltext,
 })
const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial)
house.add(chimney)
chimney.position.set(1.2, 3.25, -1.2)
chimney.castShadow = true
chimney.scale.set(1, 1.5, 1)

const smokeParticles = []
const smokeGroup = new THREE.Group()
scene.add(smokeGroup)

// Load the smoke texture
const smokeTexture = textureloader.load('./chimney/smoke/blackSmoke00.png')

const smokeMaterial = new THREE.SpriteMaterial({
    map: smokeTexture,
    transparent: true,
    opacity: 0.4,
    depthWrite: false
})

function emitSmoke() {
    const smoke = new THREE.Sprite(smokeMaterial.clone())
    
    smoke.position.set(
        chimney.position.x + (Math.random() - 0.5) * 0.3,
        chimney.position.y + chimney.scale.y * 0.5 - 0.1,
        chimney.position.z + (Math.random() - 0.5) * 0.3
    )

    smoke.scale.set(0.2, 0.2, 0.2)
    smoke.material.opacity = 0.5
    smoke.startTime = performance.now()

    smokeGroup.add(smoke)
    smokeParticles.push(smoke)
}


const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16,0, Math.PI * 2, Math.PI / 2, Math.PI),
    new THREE.MeshStandardMaterial({})
)
house.add(bulb)
bulb.position.set(0, 2.53, 2.3)
// bulb.rotation.x = Math.PI * 4

const bushgeometry = new THREE.SphereGeometry(0.5, 16, 16)
const bushmaterial = new THREE.MeshStandardMaterial({
        color: '#ccffcc',
        map: bushcolortext,
        aoMap: bushARMtext,
        roughnessMap: bushARMtext,
        metalnessMap: bushARMtext,
        normalMap: bushnormaltext,
    })

const bush1 = new THREE.Mesh(bushgeometry, bushmaterial)
bush1.position.set(0.8, 0.2, 2.2)
bush1.scale.set(1,1,1)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushgeometry, bushmaterial)
bush2.position.set(1.4,0.2,2.2)
bush2.scale.set(0.5, 0.5, 0.5)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushgeometry, bushmaterial)
bush3.position.set(-0.8, 0.2, 2.2)
bush3.scale.set(0.9,0.9,0.9)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushgeometry, bushmaterial)
bush4.position.set(-1.2, 0.2, 2.6)
bush4.scale.set(0.4,0.4,0.4)
bush4.rotation.x = -0.75
house.add(bush1, bush2, bush3, bush4)

const floor =  new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({side: THREE.DoubleSide,
        alphaMap: alphafloortext,
        transparent: true,
        map: floorcolortext,
        aoMap: floorARMtext,
        roughnessMap: floorARMtext,
        metalnessMap: floorARMtext,
        normalMap: floornormaltext,
        displacementMap: floordisplacementtext,
        displacementScale: 0.3,
        displacementBias: -0.2
    })
    
)

const gravegeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const gravematerial = new THREE.MeshStandardMaterial({
    map: gravecolortext,
    aoMap: graveARMtext,
    roughnessMap: graveARMtext,
    metalnessMap: graveARMtext,
    normalMap: gravenormaltext,
})
const graves = []


for(let i = 0; i < 30; i++)
{
    const grave = new THREE.Mesh(gravegeometry, gravematerial)
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    
    grave.position.x = x
    grave.position.z = z
    grave.position.y =Math.random() * 0.4
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    graves.push(grave)
    scene.add(grave)
}

scene.add(floor)
floor.rotation.x = -1.57

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const pointlight = new THREE.PointLight('#ff7d46', 5)
pointlight.position.set(0, 2.3, 2.3)
house.add(pointlight)

const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

// ========== Hanging Man Group ==========
const manGroup = new THREE.Group();
const wholesuicide = new THREE.Group();
scene.add(wholesuicide);
// Rope
const ropeLength = 0.385;
const ropeGeo = new THREE.CylinderGeometry(0.02, 0.02, ropeLength, 8);
const ropeMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
const rope = new THREE.Mesh(ropeGeo, ropeMat);
rope.position.y = ropeLength / 2 + 1; // Start high
wholesuicide.add(rope);

// Head
const headGeo = new THREE.SphereGeometry(0.1, 16, 16);
const headMat = new THREE.MeshStandardMaterial({ color: 0xffd1a4 });
const head = new THREE.Mesh(headGeo, headMat);
head.position.y = 1; // Right below the rope
manGroup.add(head);

// Eyes (small red spheres)
const eyeGeo = new THREE.SphereGeometry(0.0185, 8, 8);
const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
leftEye.position.set(-0.025, 1.02, 0.09); // left eye
manGroup.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
rightEye.position.set(0.025, 1.02, 0.09); // right eye
manGroup.add(rightEye);

// Red glowing lights from eyes
const leftEyeLight = new THREE.PointLight(0xff0000, 5, 0.5);
leftEyeLight.position.set(-0.025, 1.02, 1.185); // Position at the same place as left eye
manGroup.add(leftEyeLight);

const rightEyeLight = new THREE.PointLight(0xff0000, 1, 0.5);
rightEyeLight.position.copy(rightEye.position);
manGroup.add(rightEyeLight);

// Blood on neck (small red torus as blood ring)
const bloodGeo = new THREE.TorusGeometry(0.09, 0.01, 8, 16);
const bloodMat = new THREE.MeshStandardMaterial({ color: 0x8b0000 });
const blood = new THREE.Mesh(bloodGeo, bloodMat);
blood.rotation.x = Math.PI / 2;
blood.rotation.x = -0.8
blood.position.y = 0.925;
blood.position.z = -0.01; 
manGroup.add(blood);

// const smileGeo = new THREE.TorusGeometry(0.05, 0.005, 8, 20, Math.PI); // Half ring (semicircle)
// const smileMat = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Bright red
// const smile = new THREE.Mesh(smileGeo, smileMat);
// smile.rotation.x = Math.PI // Curve downwards (frown)
// // smile.rotation.y = Math.PI / 8; // Face the front
// // smile.rotation.z = Math.PI;
// smile.position.set(0, 0.975, 0.09); // Slightly below eyes, front of face
// manGroup.add(smile);
// smile.position.y = 0.2
// Body
const bodyGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x5555ff });
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.position.y = 0.65; // Below the head
manGroup.add(body);

// Optional: Legs
const legGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.4, 8);
const legMat = new THREE.MeshStandardMaterial({ color: 0xffd1a4 });

const leftLeg = new THREE.Mesh(legGeo, legMat);
leftLeg.position.set(-0.05, 0.25, 0);
manGroup.add(leftLeg);

const rightLeg = leftLeg.clone();
rightLeg.position.x = 0.05;
manGroup.add(rightLeg);

const armGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.3, 8);

const leftarm = new THREE.Mesh(armGeo, legMat);
leftarm.position.set(-0.1, 0.7, 0);
manGroup.add(leftarm);

const rightarm = leftarm.clone();
rightarm.position.x = 0.1;

manGroup.add(rightarm);

// Position the entire manGroup
manGroup.position.set(0, 0, 0); // adjust as needed
scene.add(manGroup);
wholesuicide.add(manGroup);
wholesuicide.position.set(-1.5, 1.2, 2.3)
manGroup.position.z = 0.09



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 3
camera.position.z = 7
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap

directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true        
ghost3.castShadow = true
walls.castShadow = true
roof.castShadow = true
roof.receiveShadow = true
bush1.castShadow = true
bush2.castShadow = true 
bush3.castShadow = true
bush4.castShadow = true
bush1.receiveShadow = true
bush2.receiveShadow = true
bush3.receiveShadow = true
bush4.receiveShadow = true
door.receiveShadow = true
floor.receiveShadow = true
walls.receiveShadow = true
graves.forEach(grave => {
    grave.castShadow = true
    grave.receiveShadow = true
})
    
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

const sky = new Sky()
sky.scale.setScalar(100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

scene.fog = new THREE.FogExp2('#04343f', 0.1)

// const smokeParticles = []
// const smokeCount = 30
// const smokeGeometry = new THREE.SphereGeometry(0.06, 8, 8)
// const smokeMaterial = new THREE.MeshStandardMaterial({
//     color: 0xcccccc,
//     transparent: true,
//     opacity: 0.5
// })

// // Create smoke spheres and add to scene
// for (let i = 0; i < smokeCount; i++) {
//     const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial.clone())
//     smoke.position.set(
//         1.2 + (Math.random() - 0.5) * 0.05,
//         3.75 + i * 0.07,
//         -1.2 + (Math.random() - 0.5) * 0.05
//     )
//     smoke.material.opacity = 0.5 - i * 0.012 // Fade out higher particles
//     scene.add(smoke)
//     smokeParticles.push(smoke)
// }



/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle *3.45)
    
    const ghost2Angle = -elapsedTime * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle *3.45)

    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle *3.45)

    function updateSmoke() {
    const now = performance.now()

    for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const smoke = smokeParticles[i]
        const age = now - smoke.startTime

        smoke.position.y += 0.003 + Math.random() * 0.002
        smoke.position.x += (Math.random() - 0.5) * 0.001
        smoke.position.z += (Math.random() - 0.5) * 0.001
        smoke.scale.x += 0.0007
        smoke.scale.y += 0.0007
        smoke.material.opacity -= 0.0012

        if (smoke.material.opacity <= 0) {
            smokeGroup.remove(smoke)
            smokeParticles.splice(i, 1)
        }
        }
    }


    updateSmoke()
    const time = performance.now();
    
    manGroup.rotation.y = Math.sin(time * 0.006) * 0.2;
    manGroup.position.x = Math.cos(time * 0.006) * 0.18;
    
    rope.rotation.y = Math.sin(time * 0.006) * 0.2;
    rope.position.x = Math.cos(time * 0.006) * 0.18;

    leftLeg.rotation.x = Math.sin(time * 0.006) * 0.2;
    rightLeg.rotation.x = Math.cos(time * 0.006) * 0.2;

    leftarm.rotation.x = Math.sin(time * 0.006) * 0.3;
    rightarm.rotation.x = Math.cos(time * 0.006) * 0.3;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
setInterval(emitSmoke, 150) // emit smoke every 150ms
