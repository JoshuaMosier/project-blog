---
title: Saber Maker - Automated Beat Saber Map Generation
description: "An automated tool using AI to generate custom Beat Saber maps from audio files."
date: 2019-02-16
image: ./saber-maker.jpg
categories: ["programming"]
---

<div class="flex flex-col items-center w-full my-8">
    <img 
        src="/posts/saber-maker/saber-maker.png" 
        alt="Saber Maker Interface" 
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg" 
    />
    <a 
        href="https://devpost.com/software/saber-maker" 
        class="mt-2 text-sm text-blue-300 hover:text-blue-400 italic"
        target="_blank" 
        rel="noopener noreferrer"
    >
        View project on Devpost →
    </a>
</div>

Have you ever wished for more variety in Beat Saber maps? Saber Maker might be the answer you've been looking for—an automated tool that generates Beat Saber maps from your favorite audio files.

## The Problem

Beat Saber is an immensely popular VR rhythm game, where players slice flying blocks to the beat of the music. Despite its thrilling gameplay, the base game only includes 12 songs. Although the community has created many custom maps, these are predominantly EDM or death metal tracks. Crafting maps is labor-intensive, often requiring hours of effort per minute of a song.

## Our Solution

Saber Maker eliminates the manual effort of map creation by using AI to generate Beat Saber maps automatically. Upload any audio file, and Saber Maker does the rest—detecting the beat and notes and generating a playable map instantly. This not only reduces map creation time but also opens up possibilities for maps based on a more diverse range of music genres.

## How It Works

Saber Maker uses neural networks to analyze audio files and create custom map files for Beat Saber. Here's the process:
1. **Beat and Note Detection**: AI models detect patterns, rhythm, and notes in the song.
2. **Map Generation**: Based on this analysis, the tool generates a fully playable Beat Saber map compatible with the game.
3. **Training Data**: Saber Maker's models were trained on data collected from community sites like bsaber.

With this approach, Saber Maker transforms how players experience Beat Saber, offering unlimited variety and a faster way to enjoy new music.

## Built With

The technology stack includes:
- **Python** for backend AI processing
- **JavaScript** and **jQuery** for the frontend interface

## What’s Next?

Saber Maker sets the stage for expanded accessibility and creativity in VR rhythm gaming. It reduces barriers for creators, offering tools to generate maps for songs across all genres. Whether you're a fan of pop, classical, or jazz, Saber Maker promises to enrich your Beat Saber experience.

Explore the project on [Devpost](https://devpost.com/software/saber-maker) and start building your perfect playlist today!
