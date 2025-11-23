---
title: "Aluminum Casting Projects"
description: "Aluminum casting projects using a Devilforge furnace to create custom medals and coins from recycled cans."
date: 2022-02-15
image: ./green-sand.jpg
categories: ["3d-printing"]
---

<script>
    import PostCarousel from '$lib/components/PostCarousel.svelte';

    const items = [
        { 
            type: 'image',
            src: "/posts/metalcasting/mm-polish.jpg", 
            alt: "Mosier Madness 2022 Medal Casting" 
        },
        { 
            type: 'video',
            src: "/posts/metalcasting/furnace.mp4", 
            alt: "Devilforge furnace setup" 
        },
        { 
            type: 'image',
            src: "/posts/metalcasting/mm-mold.jpg", 
            alt: "Prepped mold half and resin master" 
        },
        { 
            type: 'image',
            src: "/posts/metalcasting/mm-mold-close.jpg", 
            alt: "Close-up of mold half" 
        },
        { 
            type: 'image',
            src: "/posts/metalcasting/mm-mold-top.jpg", 
            alt: "Mold top with pour spout and riser" 
        },
        { 
            type: 'image',
            src: "/posts/metalcasting/mm-post.jpg", 
            alt: "Separated mold halves" 
        },
        { 
            type: 'image',
            src: "/posts/metalcasting/mm-cast1.jpg", 
            alt: "Cast medal" 
        }
    ];

    const rings = [
        { 
            type: 'image',
            src: "/posts/metalcasting/ring-post.jpg", 
            alt: "Ring mold after casting" 
        },
        { 
            type: 'image',
            src: "/posts/metalcasting/ring.jpg", 
            alt: "Cast ring" 
        },
        { 
            type: 'image',
            src: "/posts/metalcasting/ring-close.jpg", 
            alt: "Close-up of the cast ring" 
        }
    ]

</script>

<div class="flex flex-col items-center w-full my-8">
    <img 
        src="/posts/metalcasting/green-sand.jpg" 
        alt="Close-up of the March Madness medal" 
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg" 
    />
</div>

I've been exploring metal casting using a Devilforge furnace to melt aluminum cans into custom medals, rings, and coins.

### Equipment List
- **Furnace:** Devilforge propane furnace
- **Crucible:** #4 Clay graphite crucible
- **Mold Material:** Petrobond/Greensand
- **Safety Gear:** Heat resistant gloves, face shield, leather apron
- **Source Material:** Recycled aluminum cans

## Project Examples

### March Madness Tournament Medal

<PostCarousel {items} />

The tournament medal was my first major casting project. I designed the medal in Blender with a realistic basketball texture. I printed the master pattern in resin with a tab to later attach a ribbon. This took a few attempts to get the mold right with greensand, but I was able to get a decent cast.

### Custom rings
<PostCarousel items={rings} />

These rings were made mostly to test the precision of the casting and to practice surface finishing. The mold worked beautfilly but there was a lot of porosity in the cast.
The rings were also surprisingly light but still felt durable.

### Themed coins

<div class="flex flex-col items-center w-full my-8">
    <img 
        src="/posts/metalcasting/coins2.jpg" 
        alt="Themed coins" 
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg" 
    />
</div>

These coins were made to show off the casting to friends and family. The coins pictured here are a mandalorian medallion, pirate treasure, a bitcoin, and a witcher medallion.

## Learning Experience

This has definitely been an interesting experience, previously I wouldn't have thought I'd be able to make custom cast parts at home this easily. To go from 3d printing the master to casting a finished product has become not only a fun hobby, but also a useful skill to have. Since these projects I've switched to mainly using petrobond for the better surface detail in the mold, but I've also purchased a kayacast investment casting machine and a tabletop burnout furnace to try out lost-wax casting with resin parts.

