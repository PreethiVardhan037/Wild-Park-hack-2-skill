// Wild Park 3D Graphics Engine (Three.js + OrbitControls)
// Provides 3D Food Chain graph and Procedural 3D Animal Model generator.

const OrbitControls = THREE.OrbitControls || window.OrbitControls;

// 1. DYNAMIC PROCEDURAL ANIMAL BUILDERS
// Creates stylized, low-poly voxel/mesh shapes to represent classes of animals.
function createProceduralAnimal(speciesId, name) {
  const group = new THREE.Group();
  
  // Materials
  const baseColor = getBiomeColor(speciesId);
  const bodyMat = new THREE.MeshLambertMaterial({ color: baseColor, flatShading: true });
  const detailMat = new THREE.MeshLambertMaterial({ color: 0x222222, flatShading: true });
  const whiteMat = new THREE.MeshLambertMaterial({ color: 0xeeeeee, flatShading: true });
  const goldMat = new THREE.MeshLambertMaterial({ color: 0xe2b85c, flatShading: true });
  const darkRedMat = new THREE.MeshLambertMaterial({ color: 0x881111, flatShading: true });

  const id = parseInt(speciesId);

  // Group by category based on ID mapping
  if (id === 1) { // African Lion
    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(3, 1.8, 1.6), bodyMat);
    body.position.y = 0.5;
    group.add(body);

    // Mane (Big hairy collar)
    const maneMat = new THREE.MeshLambertMaterial({ color: 0x5a3e1a, flatShading: true });
    const mane = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.4, 2.0), maneMat);
    mane.position.set(1.4, 1.0, 0);
    group.add(mane);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), bodyMat);
    head.position.set(1.9, 1.3, 0);
    group.add(head);

    // Snout & Ears
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.6), maneMat);
    snout.position.set(2.5, 1.1, 0);
    group.add(snout);

    // Legs
    for (let x of [-1.0, 1.0]) {
      for (let z of [-0.6, 0.6]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.6, 0.5), bodyMat);
        leg.position.set(x, -0.6, z);
        leg.name = "leg";
        group.add(leg);
      }
    }

    // Tail
    const tail = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.15, 0.15), maneMat);
    tail.position.set(-1.8, 0.8, 0);
    tail.rotation.z = -0.6;
    group.add(tail);

  } else if (id === 2 || id === 6 || id === 11) { // Tiger, Jaguar, Cheetah (Big Felines)
    const patternMat = id === 2 
      ? new THREE.MeshLambertMaterial({ color: 0xe67e22, flatShading: true }) // Tiger
      : new THREE.MeshLambertMaterial({ color: 0xf1c40f, flatShading: true }); // Cheetah/Jaguar

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.4, 1.4), patternMat);
    body.position.y = 0.5;
    group.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 1.1), patternMat);
    head.position.set(1.8, 1.1, 0);
    group.add(head);

    // Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), patternMat);
    earL.position.set(1.8, 1.7, 0.4);
    const earR = earL.clone();
    earR.position.z = -0.4;
    group.add(earL, earR);

    // Legs
    for (let x of [-1.1, 1.1]) {
      for (let z of [-0.5, 0.5]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.6, 0.45), patternMat);
        leg.position.set(x, -0.5, z);
        leg.name = "leg";
        group.add(leg);
      }
    }

    // Tail
    const tail = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 0.15), patternMat);
    tail.position.set(-1.8, 0.8, 0);
    tail.rotation.z = -0.4;
    group.add(tail);

  } else if (id === 36 || id === 47) { // Elephant, Rhino (Large Megaherbivores)
    const megaColor = id === 36 ? 0x7f8c8d : 0x95a5a6;
    const megaMat = new THREE.MeshLambertMaterial({ color: megaColor, flatShading: true });

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.8, 2.6), megaMat);
    body.position.y = 0.8;
    group.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), megaMat);
    head.position.set(2.6, 1.8, 0);
    group.add(head);

    // Elephant Features
    if (id === 36) {
      // Ears
      const earL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.0, 1.6), megaMat);
      earL.position.set(2.3, 1.8, 1.6);
      const earR = earL.clone();
      earR.position.z = -1.6;
      group.add(earL, earR);

      // Trunk
      const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.2, 0.6), megaMat);
      trunk.position.set(3.4, 0.6, 0);
      trunk.rotation.z = 0.2;
      group.add(trunk);

      // Tusks
      const tuskL = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.2, 4), whiteMat);
      tuskL.position.set(3.3, 0.9, 0.5);
      tuskL.rotation.z = 1.2;
      tuskL.rotation.y = 0.2;
      const tuskR = tuskL.clone();
      tuskR.position.z = -0.5;
      tuskR.rotation.y = -0.2;
      group.add(tuskL, tuskR);
    } else {
      // Rhino Horns
      const horn1 = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.9, 4), whiteMat);
      horn1.position.set(3.4, 2.1, 0);
      horn1.rotation.z = -0.8;
      const horn2 = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 4), whiteMat);
      horn2.position.set(3.1, 2.3, 0);
      horn2.rotation.z = -0.8;
      group.add(horn1, horn2);
    }

    // Legs
    for (let x of [-1.4, 1.4]) {
      for (let z of [-0.9, 0.9]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.2, 0.8), megaMat);
        leg.position.set(x, -1.0, z);
        leg.name = "leg";
        group.add(leg);
      }
    }

  } else if (id === 44) { // Reticulated Giraffe
    const giraffeColor = 0xd35400;
    const spotsMat = new THREE.MeshLambertMaterial({ color: giraffeColor, flatShading: true });
    
    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 1.4), spotsMat);
    body.position.y = 1.0;
    group.add(body);

    // Neck (Super long)
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.6, 4.0, 0.6), spotsMat);
    neck.position.set(1.0, 3.2, 0);
    neck.rotation.z = -0.2;
    group.add(neck);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.6, 0.6), spotsMat);
    head.position.set(1.5, 5.0, 0);
    group.add(head);

    // Legs (Very long)
    for (let x of [-0.8, 0.8]) {
      for (let z of [-0.5, 0.5]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.2, 0.35), spotsMat);
        leg.position.set(x, -1.2, z);
        leg.name = "leg";
        group.add(leg);
      }
    }

  } else if (id === 8 || id === 9 || id === 23 || id === 35) { // Birds (Falcon, Eagle, Owl, Songbird)
    const birdColor = id === 8 ? 0x34495e : (id === 9 ? 0x7f8c8d : 0x95a5a6);
    const birdMat = new THREE.MeshLambertMaterial({ color: birdColor, flatShading: true });

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 1.1), birdMat);
    body.position.y = 0.2;
    group.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), birdMat);
    head.position.set(0.9, 0.7, 0);
    group.add(head);

    // Beak
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.4, 4), goldMat);
    beak.position.set(1.3, 0.6, 0);
    beak.rotation.z = -Math.PI / 2;
    group.add(beak);

    // Wings (Wide plates)
    const wingL = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 1.5), birdMat);
    wingL.position.set(0, 0.3, 1.0);
    wingL.name = "wingL";
    const wingR = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 1.5), birdMat);
    wingR.position.set(0, 0.3, -1.0);
    wingR.name = "wingR";
    group.add(wingL, wingR);

    // Tail feathers
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 0.8), birdMat);
    tail.position.set(-1.0, 0, 0);
    tail.rotation.z = 0.2;
    group.add(tail);

    // Legs (Thin twigs)
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.8, 0.15), goldMat);
    legL.position.set(0.1, -0.6, 0.25);
    const legR = legL.clone();
    legR.position.z = -0.25;
    group.add(legL, legR);

  } else if (id === 5 || id === 10 || id === 22 || id === 50) { // Reptiles/Worms (Crocodile, Snakes, Earthworm)
    const reptColor = id === 5 ? 0x27ae60 : (id === 10 ? 0x16a085 : (id === 22 ? 0x2ecc71 : 0xd35400));
    const reptMat = new THREE.MeshLambertMaterial({ color: reptColor, flatShading: true });

    if (id === 5) { // Crocodile
      // Body
      const body = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.7, 1.4), reptMat);
      body.position.y = 0.1;
      group.add(body);

      // Tail
      const tail = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 0.8), reptMat);
      tail.position.set(-2.6, 0.1, 0);
      tail.name = "tail";
      group.add(tail);

      // Head (Wide jaws)
      const head = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 1.2), reptMat);
      head.position.set(2.0, 0.2, 0);
      group.add(head);

      const jaw = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 1.0), reptMat);
      jaw.position.set(2.3, -0.15, 0);
      group.add(jaw);

      // Tiny Legs
      for (let x of [-1.1, 1.1]) {
        for (let z of [-0.7, 0.7]) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.4), reptMat);
          leg.position.set(x, -0.4, z);
          group.add(leg);
        }
      }
    } else { // Snake or Worm (Multi-segmented chain)
      const segmentCount = id === 50 ? 10 : 7;
      const size = id === 50 ? 0.25 : 0.35;
      
      for (let i = 0; i < segmentCount; i++) {
        const seg = new THREE.Mesh(new THREE.BoxGeometry(size * 1.5, size, size), reptMat);
        seg.position.x = -i * size * 1.1;
        seg.name = `segment_${i}`;
        // Give the head a special detail
        if (i === 0) {
          seg.scale.set(1.3, 1.2, 1.2);
          const tongue = new THREE.Mesh(new THREE.BoxGeometry(size, 0.05, 0.1), darkRedMat);
          tongue.position.x = size;
          seg.add(tongue);
        }
        group.add(seg);
      }
    }

  } else if (id === 4 || id === 48) { // Aquatic / Fish (Whale, Shark, Swim reptiles)
    const aquaColor = id === 4 ? 0x2c3e50 : 0x16a085;
    const aquaMat = new THREE.MeshLambertMaterial({ color: aquaColor, flatShading: true });

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.8, 1.8), aquaMat);
    body.position.y = 0.5;
    group.add(body);

    // Tail fin
    const tail = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.6), aquaMat);
    tail.position.set(-2.2, 0.5, 0);
    tail.name = "tail";
    group.add(tail);

    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.6, 2.0), aquaMat);
    fin.position.set(-2.8, 0.5, 0);
    tail.add(fin); // nest in tail for movement

    // Flippers
    const flipL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.15, 1.6), aquaMat);
    flipL.position.set(0.8, 0, 1.3);
    flipL.rotation.y = 0.5;
    flipL.rotation.z = -0.3;
    const flipR = flipL.clone();
    flipR.position.z = -1.3;
    flipR.rotation.y = -0.5;
    group.add(flipL, flipR);

  } else if (id === 15 || id === 16 || id === 17 || id === 37 || id === 39 || id === 45) { // Medium Quadrupeds (Wolf, Fox, Zebra, Deer, Boar)
    // Generic four legged body
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 1.0), bodyMat);
    body.position.y = 0.4;
    group.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.8), bodyMat);
    head.position.set(1.4, 0.9, 0);
    group.add(head);

    // Snout
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.5), detailMat);
    snout.position.set(1.9, 0.8, 0);
    group.add(snout);

    // Ears / Antlers
    if (id === 39) { // Gazelle (Horn cones)
      const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.8, 4), detailMat);
      hornL.position.set(1.4, 1.6, 0.25);
      hornL.rotation.z = -0.3;
      const hornR = hornL.clone();
      hornR.position.z = -0.25;
      group.add(hornL, hornR);
    } else {
      const earL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.4, 0.2), bodyMat);
      earL.position.set(1.3, 1.5, 0.25);
      const earR = earL.clone();
      earR.position.z = -0.25;
      group.add(earL, earR);
    }

    // Legs
    for (let x of [-0.8, 0.8]) {
      for (let z of [-0.4, 0.4]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.3), bodyMat);
        leg.position.set(x, -0.5, z);
        leg.name = "leg";
        group.add(leg);
      }
    }

  } else { // Small critter (Panda, Meerkat, Rabbit, Insects, etc.)
    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 1.0), bodyMat);
    body.position.y = 0.2;
    group.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), bodyMat);
    head.position.set(0.9, 0.7, 0);
    group.add(head);

    // Legs / Details
    for (let x of [-0.5, 0.5]) {
      for (let z of [-0.4, 0.4]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.6, 0.25), bodyMat);
        leg.position.set(x, -0.4, z);
        leg.name = "leg";
        group.add(leg);
      }
    }
  }

  // Add ambient bounding box to group elements
  group.castShadow = true;
  group.receiveShadow = true;
  group.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return group;
}

// Map animal ID to generic aesthetic colors
function getBiomeColor(speciesId) {
  const id = parseInt(speciesId);
  if (id <= 6) return 0xf43f5e; // Apex red
  if (id <= 13) return 0xa855f7; // Tertiary purple
  if (id <= 35) return 0xe2b85c; // Secondary amber
  if (id <= 49) return 0x10b981; // Primary herbivore green
  return 0x0ea5e9; // Decomposer blue
}

// 2. MAIN 3D DETAIL PROFILE VIEW LOOP
let detailScene, detailCamera, detailRenderer, detailControls, detailAnimId;
let currentDetailObject = null;

export function renderAnimal3D(containerId, species) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Cleanup old context
  if (detailAnimId) {
    cancelAnimationFrame(detailAnimId);
    detailAnimId = null;
  }
  container.innerHTML = "";

  // Scene
  detailScene = new THREE.Scene();

  // Camera
  detailCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  detailCamera.position.set(4, 3, 5);

  // Renderer
  detailRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  detailRenderer.setSize(container.clientWidth, container.clientHeight);
  detailRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  detailRenderer.shadowMap.enabled = true;
  container.appendChild(detailRenderer.domElement);

  // Controls
  detailControls = new OrbitControls(detailCamera, detailRenderer.domElement);
  detailControls.enableDamping = true;
  detailControls.dampingFactor = 0.05;
  detailControls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't go below floor
  detailControls.minDistance = 3;
  detailControls.maxDistance = 15;

  // Grid / Ground
  const grid = new THREE.GridHelper(20, 20, 0x10b981, 0x11221a);
  grid.position.y = -1.2;
  detailScene.add(grid);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  detailScene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 7);
  dirLight.castShadow = true;
  detailScene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0x10b981, 0.25);
  fillLight.position.set(-5, 3, -5);
  detailScene.add(fillLight);

  // Load Model
  currentDetailObject = createProceduralAnimal(species.id, species.name);
  currentDetailObject.position.y = -0.2;
  detailScene.add(currentDetailObject);

  // Animation variables
  let clock = new THREE.Clock();
  let spinActive = false;

  // Set spin triggers
  const spinBtn = document.getElementById("btn-spin-detail");
  if (spinBtn) {
    spinBtn.onclick = () => {
      spinActive = !spinActive;
      spinBtn.classList.toggle("active", spinActive);
    };
  }

  // Animation Loop
  function animate() {
    detailAnimId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Custom breathing / moving animation based on elements
    if (currentDetailObject) {
      // Gentle breathing scale
      currentDetailObject.scale.y = 1.0 + Math.sin(elapsedTime * 2.5) * 0.02;

      // Leg animations (simulate slow pacing)
      currentDetailObject.traverse(child => {
        if (child.name === "leg") {
          // alternate swing
          const offset = child.position.x > 0 ? 0 : Math.PI;
          child.rotation.z = Math.sin(elapsedTime * 3 + offset) * 0.15;
        }
        if (child.name === "wingL") {
          child.rotation.z = Math.sin(elapsedTime * 12) * 0.4;
        }
        if (child.name === "wingR") {
          child.rotation.z = -Math.sin(elapsedTime * 12) * 0.4;
        }
        if (child.name === "tail") {
          child.rotation.y = Math.sin(elapsedTime * 4) * 0.2;
        }
        if (child.name.startsWith("segment_")) {
          const index = parseInt(child.name.split("_")[1]);
          child.position.z = Math.sin(elapsedTime * 3 - index * 0.5) * 0.15;
          child.rotation.y = Math.cos(elapsedTime * 3 - index * 0.5) * 0.1;
        }
      });

      // Continuous spin if selected
      if (spinActive) {
        currentDetailObject.rotation.y += 0.015;
      }
    }

    detailControls.update();
    detailRenderer.render(detailScene, detailCamera);
  }

  animate();

  // Resize handler
  const resizeHandler = () => {
    if (!container || !detailCamera || !detailRenderer) return;
    detailCamera.aspect = container.clientWidth / container.clientHeight;
    detailCamera.updateProjectionMatrix();
    detailRenderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", resizeHandler);
}


// 3. 3D INTERACTIVE FOOD WEB GRAPH
let fcScene, fcCamera, fcRenderer, fcControls, fcAnimId;
let fcNodes = [];
let fcLines = [];
let raycaster, mouse;
let hoveredNode = null;
let currentOnSelect = null;

export function initFoodChain3D(containerId, animalData, onNodeSelect) {
  const container = document.getElementById(containerId);
  if (!container) return;

  currentOnSelect = onNodeSelect;

  // Cleanup old contexts
  if (fcAnimId) {
    cancelAnimationFrame(fcAnimId);
    fcAnimId = null;
  }
  container.innerHTML = "";
  fcNodes = [];
  fcLines = [];

  // Scene
  fcScene = new THREE.Scene();
  fcScene.fog = new THREE.FogExp2(0x07120a, 0.015);

  // Camera
  fcCamera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  fcCamera.position.set(0, 15, 60);

  // Renderer
  fcRenderer = new THREE.WebGLRenderer({ antialias: true });
  fcRenderer.setSize(container.clientWidth, container.clientHeight);
  fcRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(fcRenderer.domElement);

  // Controls
  fcControls = new OrbitControls(fcCamera, fcRenderer.domElement);
  fcControls.enableDamping = true;
  fcControls.dampingFactor = 0.05;
  fcControls.minDistance = 15;
  fcControls.maxDistance = 120;

  // Setup Raycasting for Mouse Interactivity
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  fcScene.add(ambient);

  const ptLight1 = new THREE.PointLight(0x10b981, 1, 100);
  ptLight1.position.set(0, 30, 0);
  fcScene.add(ptLight1);

  const ptLight2 = new THREE.PointLight(0xe2b85c, 0.8, 100);
  ptLight2.position.set(0, -30, 0);
  fcScene.add(ptLight2);

  // Build rings and coordinate nodes
  const levels = {
    "Apex Predator": { y: 20, r: 16, color: 0xf43f5e },
    "Tertiary Consumer": { y: 10, r: 24, color: 0xa855f7 },
    "Secondary Consumer": { y: 0, r: 32, color: 0xe2b85c },
    "Primary Consumer": { y: -10, r: 24, color: 0x10b981 },
    "Decomposer": { y: -20, r: 8, color: 0x0ea5e9 }
  };

  // Pre-sort species by level for ring distribution
  const levelBuckets = {};
  for (let key in levels) levelBuckets[key] = [];

  animalData.forEach(animal => {
    if (levelBuckets[animal.trophic]) {
      levelBuckets[animal.trophic].push(animal);
    }
  });

  // Position nodes
  const nodePositionMap = {};

  for (let key in levels) {
    const list = levelBuckets[key];
    const len = list.length;
    const yVal = levels[key].y;
    const radius = levels[key].r;
    const color = levels[key].color;

    list.forEach((animal, index) => {
      const angle = (index / len) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Create Node Mesh
      // Scale based on trophic level
      let size = 0.8;
      if (key === "Apex Predator") size = 1.6;
      else if (key === "Tertiary Consumer") size = 1.3;
      else if (key === "Secondary Consumer") size = 1.0;
      else if (key === "Primary Consumer") size = 1.1;

      const geom = new THREE.SphereGeometry(size, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const nodeMesh = new THREE.Mesh(geom, mat);
      nodeMesh.position.set(x, yVal, z);
      nodeMesh.userData = { animal: animal };
      fcScene.add(nodeMesh);

      // Create glowing core
      const coreGeom = new THREE.SphereGeometry(size * 0.4, 4, 4);
      const coreMat = new THREE.MeshBasicMaterial({ color: color });
      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      nodeMesh.add(coreMesh);

      fcNodes.push(nodeMesh);
      nodePositionMap[animal.id] = nodeMesh.position;
    });

    // Draw Ring guides
    const ringGeom = new THREE.RingGeometry(radius - 0.1, radius + 0.1, 64);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: color, 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.08
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = yVal;
    fcScene.add(ringMesh);
  }

  // Draw connecting edges representing prey -> predator
  animalData.forEach(predator => {
    const pPos = nodePositionMap[predator.id];
    if (!pPos) return;

    predator.preyIds.forEach(preyId => {
      const preyPos = nodePositionMap[preyId];
      if (!preyPos) return;

      // Draw line
      const points = [preyPos, pPos];
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.10
      });
      
      const line = new THREE.Line(lineGeom, lineMat);
      line.userData = { predatorId: predator.id, preyId: preyId };
      fcScene.add(line);
      fcLines.push(line);
    });
  });

  // Interactive controls button bindings
  const resetBtn = document.getElementById("btn-reset-cam");
  if (resetBtn) {
    resetBtn.onclick = () => {
      fcCamera.position.set(0, 15, 60);
      fcControls.target.set(0, 0, 0);
    };
  }

  let autoRotate = false;
  const rotateBtn = document.getElementById("btn-toggle-auto");
  if (rotateBtn) {
    rotateBtn.onclick = () => {
      autoRotate = !autoRotate;
      rotateBtn.classList.toggle("active", autoRotate);
      rotateBtn.innerHTML = autoRotate 
        ? `<i data-lucide="pause"></i> Pause Rotate`
        : `<i data-lucide="play"></i> Toggle Rotate`;
      lucide.createIcons();
    };
  }

  // Mouse Interactions
  const onMouseMove = (event) => {
    const rect = fcRenderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
  };

  const onClick = () => {
    raycaster.setFromCamera(mouse, fcCamera);
    const intersects = raycaster.intersectObjects(fcNodes);

    if (intersects.length > 0) {
      const selectedNode = intersects[0].object;
      const animal = selectedNode.userData.animal;
      highlightGraphConnections(animal.id);
      if (currentOnSelect) {
        currentOnSelect(animal);
      }
    }
  };

  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("click", onClick);

  // Animation Loop
  let clock = new THREE.Clock();
  
  function animate() {
    fcAnimId = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Pulse nodes gently
    fcNodes.forEach(node => {
      node.scale.setScalar(1.0 + Math.sin(time * 2 + node.position.x) * 0.05);
    });

    // Auto rotate
    if (autoRotate) {
      fcScene.rotation.y += 0.003;
    }

    // Raycast check for hover state (visual glow)
    raycaster.setFromCamera(mouse, fcCamera);
    const intersects = raycaster.intersectObjects(fcNodes);

    if (intersects.length > 0) {
      const hitNode = intersects[0].object;
      if (hoveredNode !== hitNode) {
        if (hoveredNode) hoveredNode.material.opacity = 0.8;
        hoveredNode = hitNode;
        hoveredNode.material.opacity = 1.0;
        container.style.cursor = "pointer";
      }
    } else {
      if (hoveredNode) {
        hoveredNode.material.opacity = 0.8;
        hoveredNode = null;
      }
      container.style.cursor = "default";
    }

    fcControls.update();
    fcRenderer.render(fcScene, fcCamera);
  }

  animate();

  // Resize handler
  const resizeHandler = () => {
    if (!container || !fcCamera || !fcRenderer) return;
    fcCamera.aspect = container.clientWidth / container.clientHeight;
    fcCamera.updateProjectionMatrix();
    fcRenderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", resizeHandler);
}

// Highlights lines connected to the selected animal: Red for predators, Green for prey
function highlightGraphConnections(selectedId) {
  fcLines.forEach(line => {
    const { predatorId, preyId } = line.userData;
    
    if (predatorId === selectedId) {
      // Selected is predator -> this line is prey being eaten (Highlight green/blue)
      line.material.color.setHex(0x10b981);
      line.material.opacity = 0.85;
      line.material.linewidth = 2;
    } else if (preyId === selectedId) {
      // Selected is prey -> this line is predator eating it (Highlight red/pink)
      line.material.color.setHex(0xf43f5e);
      line.material.opacity = 0.85;
      line.material.linewidth = 2;
    } else {
      // Dim out unrelated lines
      line.material.color.setHex(0xffffff);
      line.material.opacity = 0.03;
      line.material.linewidth = 1;
    }
  });

  // Pulse the selected node core and highlight it
  fcNodes.forEach(node => {
    if (node.userData.animal.id === selectedId) {
      node.material.opacity = 1.0;
      node.material.color.setHex(0xffffff); // Glow white outer mesh
      node.scale.setScalar(1.4);
    } else {
      const origColor = getBiomeColor(node.userData.animal.id);
      node.material.color.setHex(origColor);
      node.material.opacity = 0.5;
    }
  });
}
