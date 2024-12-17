---
title: "Maglev Ghost & Banshee w/ Wireless LEDs"
date: 2021-10-01
image: ./ghost/ghost.jpg
categories: ["3d-printing", "electronics"]
---

<script>
    import PostCarousel from '$lib/components/PostCarousel.svelte';

    const ghostItems = [
        { 
            type: 'video',
            src: "/posts/ghost-banshee/ghost/ghost-placement.mp4", 
            alt: "Wireless LEDs powering on" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/ghost/ghost.jpg", 
            alt: "Finished Maglev Ghost" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/ghost/ghost-pla-parts.jpg", 
            alt: "Ghost v1 PLA components" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/ghost/ghost-pla.jpg", 
            alt: "Test run of PLA-ghost" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/ghost/ghost-painting.jpg", 
            alt: "In-progress painting of resin parts" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/ghost/ghost-progress.jpg", 
            alt: "Jank painting setup" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/ghost/ghost-underside.jpg", 
            alt: "Wiring internal LEDs" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/ghost/ghost-rear.JPG", 
            alt: "Close-up View" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/ghost/ghost-rear-lev.JPG", 
            alt: "Levitating rear-view" 
        }
    ];

    const bansheeItems = [
        { 
            type: 'image',
            src: "/posts/ghost-banshee/banshee/banshee-lev.JPG", 
            alt: "Finished Maglev Banshee" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/banshee/banshee-primed.jpg", 
            alt: "Primed resin prints" 
        },
        { 
            type: 'video',
            src: "/posts/ghost-banshee/banshee/banshee-painting-ref.mp4", 
            alt: "Color-shift painting reference" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/banshee/banshee-underside.jpg", 
            alt: "Banshee Wiring Internal LEDs" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/banshee/banshee-lev-front.JPG", 
            alt: "Banshee Front View" 
        },
        { 
            type: 'image',
            src: "/posts/ghost-banshee/banshee/banshee-lev-side.JPG", 
            alt: "Banshee Side View" 
        },
        { 
            type: 'video',
            src: "/posts/ghost-banshee/banshee/banshee-lev-vid.mp4", 
            alt: "Banshee levitating test-run" 
        }
    ];
</script>


## Halo Reach: Ghost
<PostCarousel items={ghostItems} />

## Halo Reach: Banshee
<PostCarousel items={bansheeItems} />

I created these custom floating Halo Ghost and Banshee models as part of a secret santa project. Click on the image galleries above to see more of the build process!

## The Build Process  

This project started in October 2021 and was completed in December 2021. Here's a quick overview of the key elements:

- **3D printed Ghost and Banshee models** – Each Covenant vehicle was modeled after the game assets and printed in multiple parts for optimal detail.
- **Custom levitation bases** – Designed to house the electronics and complement the Covenant aesthetic featuring the seventh column logo
- **Magnetic levitation kit** – DIY maglev units using both rare-earth and electromagnets
- **Wireless LED system** – Custom-integrated lighting that powers on without physical connections through wireless power coils.
- **Hand-painted details** – Featuring the iconic purple/blue Covenant color scheme with color-shiftmetallic finishes

## Technical Details  

The 3D printing process went through multiple iterations:
- Initial prototypes in PLA to test fit and levitation
- Final versions in resin for superior detail and finish
- Multiple test prints to perfect the wireless LED housing

Resin-based 3D printing allowed for incredible precision, capturing every detail of these iconic Covenant vehicles. Post-printing, the pieces underwent thorough cleaning, curing, and sanding to achieve a smooth surface for painting.  

The levitation platforms were designed to conceal the maglev electronics while maintaining the Covenant aesthetic. The wireless LED system was particularly challenging to integrate, requiring careful consideration of weight distribution to maintain stable levitation while achieving the underside glow.

## Learning Experience  

This project was a fun challenge building from some of my previous projects with these DIY maglev kits like the [Baby Yoda Crib](/posts/maglev-baby-yoda). I always enjoy pushing the envelope with these projects so I'm super pleased with how the wireless LEDs turned out.