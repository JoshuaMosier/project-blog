---
title: Building a 3D Printed Pullback Car Mechanism
description: "A 3D-printed pullback car mechanism designed for a kinematics project, featuring a dual gear train system."
date: 2021-05-04
image: ./pullback.png
categories: ["3d-printing"]
---

<div class="flex flex-col items-center w-full my-8">
    <img 
        src="/posts/pullback/pullback.png" 
        alt="3D Printed Pullback Car Prototype" 
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg" 
    />
    <a 
        href="https://www.youtube.com/watch?v=a9JcV-hAEtk" 
        class="mt-2 text-sm text-blue-300 hover:text-blue-400 italic"
        target="_blank" 
        rel="noopener noreferrer"
    >
        Watch the demonstration →
    </a>
</div>

For our kinematics term project, we developed a functional pullback toy car mechanism using 3D printing. The mechanism uses a gear system and spring to convert backward motion into forward movement through a dual gear train system.

## How It Works

The pullback mechanism operates through a simple principle: when the car is pulled backward, the rear wheels' rotation engages a gear train connected to a torsion spring. The gearbox contains two gear trains - one for winding (reverse) and one for release (forward).

Our calculations showed:
- Theoretical output/input ratio: 12.25:1
- Measured displacement ratio: 22-25:1
- Reverse gear train ratio: 147:8
- Forward gear train ratio: 1.5:1

## Design and Implementation

The project involved:
- CAD modeling in Fusion 360
- Gear design optimization to reduce interference
- 3D printing on an Artillery Sidewinder X1
- Assembly with focus on the spring mechanism
- TPU material for rear tire traction

The design uses translating pink and orange gears that mesh with the main blue gear. This creates separate gear trains for forward and reverse movement, allowing for the difference between input and output displacement.

## Testing Results

Testing of the mechanism showed:
- Travel distance up to 15 feet from full pullback
- First prototype: 22:1 displacement ratio
- Second prototype: 25:1 displacement ratio
- Consistent performance in repeated tests

## Lessons Learned

The project provided experience with:
- Gear train design
- 3D printing tolerances
- Spring mechanics
- Material selection

[Watch the demonstration →](https://www.youtube.com/watch?v=a9JcV-hAEtk)

*This project was completed as part of ME 3604 coursework by Josh Mosier and Zach Sucher.*