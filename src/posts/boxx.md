---
title: "Custom Arcade-Style SSBM Controller"
date: 2023-07-21
image: ./v2_box.jpg
categories: ["3d-printing", "electronics"]
---

<script>
    import PostCarousel from '$lib/components/PostCarousel.svelte';

    const items = [
        { 
            type: 'image',
            src: "/posts/boxx/v2_box.jpg", 
            alt: "Finished Controller v2" 
        },
        { 
            type: 'image',
            src: "/posts/boxx/v1_box_render.png", 
            alt: "v1 Controller Render" 
        },
        { 
            type: 'video',
            src: "/posts/boxx/v1_button.mp4", 
            alt: "Resin keycap test" 
        },
        { 
            type: 'image',
            src: "/posts/boxx/v1_plate.jpg", 
            alt: "Keyswitch plate from sendcutsend" 
        },
        { 
            type: 'image',
            src: "/posts/boxx/v1_plate_buttons.jpg", 
            alt: "Keyswitch plate with buttons" 
        },
        { 
            type: 'image',
            src: "/posts/boxx/v1_wiring.jpg", 
            alt: "v1 Controller Wiring" 
        },
        { 
            type: 'image',
            src: "/posts/boxx/v1_front.jpg", 
            alt: "v1 Controller Front View" 
        },
        { 
            type: 'image',
            src: "/posts/boxx/v1_back.jpg", 
            alt: "v1 Controller Back View" 
        },
        { 
            type: 'image',
            src: "/posts/boxx/v2_prewire.jpg", 
            alt: "v2 Controller Pre-wiring" 
        },
        { 
            type: 'image',
            src: "/posts/boxx/v2_postwire.jpg",
            alt: "v2 Controller Finished Wiring"
        },
        { 
            type: 'video',
            src: "/posts/boxx/v2_button_test.mp4",
            alt: "v2 Controller Button Test"
        },
        { 
            type: 'image',
            src: "/posts/boxx/v2_case.jpg",
            alt: "v2 Controller Case and injection molded buttons"
        }
    ];
</script>

<PostCarousel {items} />

I built these custom arcade-style Super Smash Bros. Melee controllers as a birthday gift for my brother.
Click on the gallery above for more images and videos of both builds!

## The Build Process  

This build is actually two separate controllers, Version 1 was built in July 2021 and Version 2 was built in June 2023. 

## Version 1
<div class="flex flex-col items-center w-full my-8">
    <img 
        src="/posts/boxx/v1_front.jpg" 
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg" 
    />
</div>

### V1 Components

- **Frame:**  Two-part MDF frame
- **Keycaps:**  SLA resin printed
- **Switchplate:**  Custom steel switchplate from sendcutsend
- **Microcontroller:**  Raspberry pi pico running [haybox firmware](https://github.com/JonnyHaystack/HayBox).
- **Gamecube Cable:**  I soldered a cable from the pico and hand-crimped and asssembled the gamecube adapter port.

Version 1 was built more or less based off the original smash boxx design. I designed a two part frame with a top panel and bottom plate that sandwiched the steel switchplate.
The switch wiring was pretty simple to hand solder together with a raspberry pi pico and some electrical tape to isolate the wires and pico from the switchplate.

The assembly was a bit tedious having to manually drill out each button mounting hole based on the switch plate, but in the end it came together pretty well.

My brother used version as his primary controller for over a year but eventually found the buttons started to wear against the side of the case and weren't as reliable for high APM play. As a birthday gift I decided to build a version 2 taking into account some of the lessons I learned from the first build. 

## Version 2
This time I new that I wanted to try and customize the shape of the controller a bit more and make it more durable. 


<div class="flex flex-col items-center w-full my-8">
    <img 
        src="/posts/boxx/v2_case.jpg" 
        alt="plotify Dashboard" 
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg" 
    />
</div>

### V2 Components

- **Frame:**  Resin printed case from JLC & Steel backplate from sendcutsend
- **Keycaps:**  Multicolor PLA & Nylon
- **Switchplate:**  Integrated into the case
- **Microcontroller:**  Raspberry pi pico running [haybox firmware](https://github.com/JonnyHaystack/HayBox).
- **Gamecube Cable:**  Detachable USB-C to GCC cable
- **Misc:**  Foam insert, adhesive neoprene, and threaded inserts to mount the backplate.

### Design Changes
I modelled a new shape based on the frame1 button layout and integrated the switch mountingplate into the case. 

I ordered two cases to be resin printed from JLC and then sanded, primed, painted them matte black, and clear coated them with SprayMax 2k so it will stand up to oil and sweat.

The additional features with this build were filling the internal space with a custom laser-cut foam insert to dampen the sound of the switches. 
The controller backplate was also made of steel this time and I added adhesive neoprene rubber pad underneath to make it more comfortable and give it a bit more grip. 

This time, instead of wiring the switches directly to the pico I used switch sockets to make it easier to swap out switches.

The first iteration of the keycaps were multicolor printed with my Bambulab X1C to label each of the buttons.

### Final Touches
After version 2 was completed, I added a USB-C port to the case with a detachable cable, along with a mini-keyboard carrying case which perfectly fit the controller.
I also custom ordered a set of nylon keycaps from JLC to match the aesthetic of the controller.

## Conclusion
I've been very pleased with how both builds turned out, but version 2 definitely took it up a notch with the aesthetics where it now feels like a real product.
The controller has lasted over a year now and is still in great condition, I will have to see if there is a v3 in the future with a custom PCB.

