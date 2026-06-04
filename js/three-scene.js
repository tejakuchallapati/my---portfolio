/* ============================================================
   three-scene.js — Interactive 3D Tech Core with Holographic Icons
   ============================================================ */

(function () {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || !window.THREE) return;

  const parent = canvas.parentElement;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(parent.clientWidth, parent.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, parent.clientWidth / parent.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 6); // Moved camera back to fit larger orbit

  const techGroup = new THREE.Group();
  techGroup.scale.set(0.85, 0.85, 0.85); // Scale down the entire group slightly
  scene.add(techGroup);

  // ── CENTRAL CORE ───────────────────────────────────────────
  const coreGeom = new THREE.OctahedronGeometry(0.6, 0);
  const coreMat = new THREE.MeshPhongMaterial({
    color: 0x7c5cfc,
    emissive: 0x7c5cfc,
    emissiveIntensity: 0.8,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  const core = new THREE.Mesh(coreGeom, coreMat);
  techGroup.add(core);

  const innerCoreGeom = new THREE.OctahedronGeometry(0.3, 0);
  const innerCoreMat = new THREE.MeshPhongMaterial({
    color: 0x00e5ff,
    emissive: 0x00e5ff,
    emissiveIntensity: 1.5,
    transparent: true,
    opacity: 1
  });
  const innerCore = new THREE.Mesh(innerCoreGeom, innerCoreMat);
  techGroup.add(innerCore);

  // ── ROTATING RINGS (HUD) ────────────────────────────────────
  function createRing(radius, tube, color, speed, rotX = 0, rotY = 0) {
    const ringGeom = new THREE.TorusGeometry(radius, tube, 2, 100);
    const ringMat = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0.4
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = rotX;
    ring.rotation.y = rotY;
    ring.userData = { speed };
    return ring;
  }

  techGroup.add(createRing(1.2, 0.01, 0x00e5ff, 0.01, Math.PI / 2));
  techGroup.add(createRing(1.5, 0.01, 0x7c5cfc, -0.01, Math.PI / 4, Math.PI / 4));
  techGroup.add(createRing(1.8, 0.005, 0xffffff, 0.005, Math.PI / 3));

  // ── HOLOGRAPHIC TECH ICONS ──────────────────────────────────
  const techIcons = ["< />", "{ }", "JS", "TS", "⚛", "λ", "⚡", "☁"];
  const iconGroups = [];

  function createIconSprite(text) {
    const canvas = document.createElement('canvas');
    const size = 128;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Draw holographic icon
    ctx.fillStyle = 'rgba(0, 229, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(64, 64, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.8)';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 15;
    ctx.fillText(text, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture, 
      transparent: true,
      opacity: 0.9
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.4, 0.4, 1); // Reduced icon scale to make them look more professional and fit the space
    
    // Orbit parameters
    const orbitRadius = 2.0 + Math.random() * 0.5; // Slightly increased for the larger container
    const orbitSpeed = (Math.random() - 0.5) * 0.012;
    const orbitAngle = Math.random() * Math.PI * 2;
    const orbitOffset = (Math.random() - 0.5) * 1.8;

    return { sprite, orbitRadius, orbitSpeed, orbitAngle, orbitOffset };
  }

  techIcons.forEach(iconText => {
    const iconData = createIconSprite(iconText);
    scene.add(iconData.sprite);
    iconGroups.push(iconData);
  });

  // Lights
  const pLight = new THREE.PointLight(0x7c5cfc, 2, 10);
  pLight.position.set(2, 2, 2);
  scene.add(pLight);
  scene.add(new THREE.AmbientLight(0xffffff, 0.2));

  // Interaction
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Core Animation
    core.rotation.y += 0.01;
    innerCore.rotation.x -= 0.02;
    const pulse = 1 + Math.sin(time * 3) * 0.1;
    innerCore.scale.set(pulse, pulse, pulse);

    // Ring Animation
    techGroup.children.forEach(child => {
      if (child.userData.speed) {
        child.rotation.z += child.userData.speed;
      }
    });

    // Icon Orbit Animation
    iconGroups.forEach((icon, i) => {
      icon.orbitAngle += icon.orbitSpeed;
      icon.sprite.position.x = Math.cos(icon.orbitAngle) * icon.orbitRadius;
      icon.sprite.position.z = Math.sin(icon.orbitAngle) * icon.orbitRadius;
      icon.sprite.position.y = Math.sin(time + i) * 0.5 + icon.orbitOffset;
      
      // Face camera
      icon.sprite.lookAt(camera.position);
    });

    // Group Sway
    techGroup.rotation.y += (mouseX * 0.3 - techGroup.rotation.y) * 0.05;
    techGroup.rotation.x += (mouseY * 0.3 - techGroup.rotation.x) * 0.05;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(parent.clientWidth, parent.clientHeight);
    camera.aspect = parent.clientWidth / parent.clientHeight;
    camera.updateProjectionMatrix();
  });

})();
