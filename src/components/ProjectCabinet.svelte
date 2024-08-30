<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import * as THREE from 'three';
    import { gsap } from 'gsap';

    export let projects = [];

    const dispatch = createEventDispatcher();
    let container;
    let scene, camera, renderer, planes = [];
    let raycaster, mouse;

    // Configurable parameters
    const VISIBLE_PLANES = 10;
    const PLANE_WIDTH = 4;
    const PLANE_HEIGHT = 3;
    const PLANE_SPACING = 1.5;
    const PLANE_VERTICAL_OFFSET = 0.5; // Constant vertical offset for all planes
    const CAMERA_POSITION = { x: 3, y: 3, z: 5 };
    const CAMERA_LOOK_AT = { x: 0, y: 0, z: 0 };
    const FOG_NEAR = 1;
    const FOG_FAR = 15;
    const SCROLL_SPEED = 0.01;

    // Calculate total loop length
    const LOOP_LENGTH = VISIBLE_PLANES * PLANE_SPACING;

    let currentIndex = 0;

    onMount(() => {
        initScene();
        animate();
        window.addEventListener('resize', onWindowResize);

        return () => {
            renderer.dispose();
            window.removeEventListener('resize', onWindowResize);
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
        projects.forEach((project, index) => {
            const texture = new THREE.TextureLoader().load(`/projects/${project.imageFilename}`);
            const geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
            const plane = new THREE.Mesh(geometry, material);
            plane.position.z = index * PLANE_SPACING;  // Reversed order
            plane.position.y = PLANE_VERTICAL_OFFSET; // Set constant vertical offset
            plane.userData.project = project;
            plane.userData.index = index;
            planes.push(plane);
            scene.add(plane);
        });

        // Initialize raycaster and mouse
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();

        // Set camera position and orientation
        camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);
        camera.lookAt(new THREE.Vector3(CAMERA_LOOK_AT.x, CAMERA_LOOK_AT.y, CAMERA_LOOK_AT.z));
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    function moveCabinetTo(index) {
        const targetZ = index * PLANE_SPACING;  // Reversed direction
        gsap.to(scene.position, {
            z: -targetZ,  // Negative to move towards the camera
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
                // Wrap planes around to create infinite loop effect
                planes.forEach((plane) => {
                    if (plane.position.z + scene.position.z < -PLANE_SPACING) {
                        plane.position.z += LOOP_LENGTH;
                    } else if (plane.position.z + scene.position.z > LOOP_LENGTH - PLANE_SPACING) {
                        plane.position.z -= LOOP_LENGTH;
                    }
                });
            },
            onComplete: () => {
                currentIndex = index;
                dispatch('projectFocus', projects[index]);
            }
        });
    }

    export function focusProject(project) {
        const index = projects.findIndex(p => p === project);
        if (index !== -1) {
            moveCabinetTo(index);
        }
    }
</script>

<div bind:this={container} class="w-full h-full"></div>

<style>
    div {
        width: 100%;
        height: 700px;
    }
</style>