<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  
    export let glbUrl;
    let container;
  
    onMount(() => {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1f2937);
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
  
      // Enhanced lighting setup
      setupLighting(scene);
  
      // Add controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
  
      // Load GLB file
      const loader = new GLTFLoader();
      loader.load(
          glbUrl,
          (gltf) => {
              const model = gltf.scene;
              
              // Enable shadows for the model
              model.traverse((child) => {
                  if (child instanceof THREE.Mesh) {
                      child.castShadow = true;
                      child.receiveShadow = true;
                  }
              });
  
              scene.add(model);
              
              // Center and scale the model
              const box = new THREE.Box3().setFromObject(model);
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());
              const maxDim = Math.max(size.x, size.y, size.z);
              const scale = 2 / maxDim;
              model.scale.multiplyScalar(scale);
              model.position.sub(center.multiplyScalar(scale));
              
              camera.position.z = 1.6;
          },
          (progress) => {
              console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
          },
          (error) => {
              console.error('Error loading GLTF:', error);
          }
      );
  
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
  
    function setupLighting(scene) {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      const keyLight = new THREE.DirectionalLight(0xffffff, 1);
      keyLight.position.set(5, 5, 5);
      keyLight.castShadow = true;
      scene.add(ambientLight);
      scene.add(keyLight);
    }
  </script>
  
  <div bind:this={container} class="w-full aspect-square rounded-lg bg-gray-800"></div>