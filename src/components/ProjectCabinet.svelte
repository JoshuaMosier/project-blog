<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';

    export let projects = [];

    let container;
    let scene, camera, renderer, planes = [];

    // Configurable parameters
    const VISIBLE_PLANES = 10;
    const PLANE_WIDTH = 4;
    const PLANE_HEIGHT = 3;
    const PLANE_SPACING = 1.5;
    const PLANE_VERTICAL_OFFSET = 0.5; // Constant vertical offset for all planes
    const CAMERA_POSITION = { x: 2, y: 3, z: 5 };
    const CAMERA_LOOK_AT = { x: 0, y: 0, z: 0 };
    const FOG_NEAR = 5;
    const FOG_FAR = 15;
    const SCROLL_SPEED = 0.01;

    // Calculate total loop length
    const LOOP_LENGTH = VISIBLE_PLANES * PLANE_SPACING;

    onMount(() => {
        initScene();
        animate();

        return () => {
            renderer.dispose();
        };
    });

    function initScene() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Add fog
        scene.fog = new THREE.Fog(0x000000, FOG_NEAR, FOG_FAR);

        // Create planes
        const texture = new THREE.TextureLoader().load('/placeholder.jpg');
        for (let i = 0; i < VISIBLE_PLANES; i++) {
            const geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
            const plane = new THREE.Mesh(geometry, material);
            plane.position.z = -i * PLANE_SPACING;
            plane.position.y = PLANE_VERTICAL_OFFSET; // Set constant vertical offset
            planes.push(plane);
            scene.add(plane);
        }

        // Set camera position and orientation
        camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);
        camera.lookAt(new THREE.Vector3(CAMERA_LOOK_AT.x, CAMERA_LOOK_AT.y, CAMERA_LOOK_AT.z));
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function handleScroll(event) {
        const delta = event.deltaY * SCROLL_SPEED;
        planes.forEach((plane) => {
            plane.position.z += delta;
            
            // Wrap around logic
            if (plane.position.z > 0) {
                plane.position.z -= LOOP_LENGTH;
            } else if (plane.position.z <= -LOOP_LENGTH) {
                plane.position.z += LOOP_LENGTH;
            }

            // Update opacity based on position
            plane.material.opacity = 1 - Math.abs(plane.position.z) / FOG_FAR;
        });
    }
</script>

<div bind:this={container} on:wheel={handleScroll} class="w-full h-full"></div>

<style>
    div {
        width: 100%;
        height: 700px;
    }
</style>