<script>
  import { onMount } from 'svelte';
  // Remove static imports for lazy loading
  // import * as THREE from 'three';
  // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  // import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
  // import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

  export let objUrl;
  let container;

  onMount(async () => {
    // Dynamic imports
    const THREE = await import('three');
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
    const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');
    const { MTLLoader } = await import('three/examples/jsm/loaders/MTLLoader.js');

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1f2937); // Match your site's background
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Enhanced lighting setup
    setupLighting(scene, THREE);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true; // Optional: adds subtle rotation
    controls.autoRotateSpeed = 0.5;

    // First load MTL file
    const mtlLoader = new MTLLoader();
    const mtlUrl = objUrl.replace('.obj', '.mtl');
    
    mtlLoader.load(mtlUrl, (materials) => {
      materials.preload();
      
      // Then load OBJ file with materials
      const loader = new OBJLoader();
      loader.setMaterials(materials);
      loader.load(objUrl, (obj) => {
        // Enable shadows for the object
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(obj);
        
        // Center and scale the object
        const box = new THREE.Box3().setFromObject(obj);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        obj.scale.multiplyScalar(scale);
        obj.position.sub(center.multiplyScalar(scale));
        
        camera.position.z = 1.6;
      });
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    function handleResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  });

  function setupLighting(scene, THREE) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1);
    keyLight.position.set(5, 5, 5);
    keyLight.castShadow = true;
    scene.add(ambientLight);
    scene.add(keyLight);
  }
</script>

<div bind:this={container} class="w-full aspect-square rounded-lg bg-gray-800"></div>