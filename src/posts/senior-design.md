---
title: Developing a Smart Haptic Wristband for Robot-Human Communication
date: 2021-09-03
image: ./senior-design.png
---

<div class="flex flex-col items-center w-full my-8">  
    <img  
        src="/posts/senior-design/senior-design.png"  
        alt="On Air Smart Status Light"  
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg"  
    />  
    <a  
        href="https://arxiv.org/abs/2109.01747"  
        class="mt-2 text-sm text-blue-300 hover:text-blue-400 italic"  
        target="_blank"  
        rel="noopener noreferrer"  
    >  
        View paper on Arxiv →  
    </a>  
</div> 

It started with a fascinating challenge: how do we help robots communicate better with humans? As part of my senior design team at Virginia Tech, we tackled this problem by developing a novel haptic wristband that could bridge the communication gap between robots and their human operators.

## The Problem

When working with robotic systems, particularly in shared autonomy scenarios, it's often unclear what the robot has learned or when it needs additional guidance. Traditional visual feedback requires constantly watching the robot, which isn't always practical when you need to multitask. We needed a way to let the robot "tap you on the wrist" when it needed help.

## The Solution

Our solution was a lightweight, wireless haptic wristband that provides two types of feedback:
- A gentle squeeze mechanism that can alert the user when the robot needs attention
- Six vibrotactors arranged around the wrist that can create directional patterns to guide user input

## Building the Device

The development process was incredibly rewarding and challenging. Here are some key features we implemented:

### The Squeeze Mechanism
One of our biggest innovations was the cord and reel system controlled by a high-torque N20 DC motor. We designed it to provide gentle but noticeable squeeze notifications while keeping the band comfortable during extended wear. The cord is never in direct contact with the wearer's skin, and we normally keep it in a relaxed state.

### Vibrotactile Feedback
We incorporated six cylindrical ERM motors evenly spaced around the wristband. Each vibrotactor sits in a custom resin-printed housing that transfers vibrations directly to the skin. One of the trickiest parts was designing the accordion-style band that could fit different wrist sizes while keeping vibrations isolated between motors.

### Housing Design
The electronics housing went through several iterations before we got it right. We needed to fit the microcontroller, battery, squeeze mechanism, and motor drivers in a compact package while keeping it lightweight and comfortable. The final design uses a modular approach that makes assembly and maintenance straightforward.

## Technical Challenges

Some of the biggest challenges we faced included:
- Designing a flexible band that could accommodate different wrist sizes while maintaining consistent haptic feedback
- Creating a squeeze mechanism that was both gentle and reliable
- Managing power consumption to ensure the wireless device could operate for extended periods
- Isolating vibrations between motors to create clear directional cues

## Results

Our user studies showed that the wristband, when combined with augmented reality feedback, significantly improved human-robot interaction. Users could focus on other tasks while remaining responsive to the robot's needs, and the directional haptic cues helped them provide more effective guidance when needed.

## Future Possibilities

This project opened up exciting possibilities for human-robot interaction. Some potential future developments include:
- Adding more sophisticated haptic patterns for complex communications
- Incorporating additional sensors for context-aware feedback
- Developing specialized versions for different industrial or assistive robotics applications
- Exploring applications beyond robotics in areas like VR/AR interaction

## Impact

Our wristband represents a step forward in making human-robot interaction more natural and efficient. It demonstrates how thoughtful hardware design can help bridge the gap between humans and robots, making collaborative tasks more intuitive and productive.

---

Looking back, this project taught me invaluable lessons about hardware development, user-centered design, and the importance of multimodal feedback in human-robot interaction. It's exciting to see how a relatively simple device can make such a meaningful difference in how humans and robots work together.