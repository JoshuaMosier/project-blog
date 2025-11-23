---
title: Streamlit Runner - A Simple VS Code Extension
description: "A VS Code extension adding a context menu option to easily run Streamlit applications."
date: 2024-12-10
image: ./streamlit-runner.png
categories: ["programming"]
---

<div class="flex flex-col items-center w-full my-8">
    <img 
        src="/posts/streamlit-runner/streamlit-runner.png" 
        alt="Streamlit Runner Extension Screenshot" 
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg" 
    />
    <a 
        href="https://marketplace.visualstudio.com/items?itemName=joshrmosier.streamlit-runner" 
        class="mt-2 text-sm text-blue-300 hover:text-blue-400 italic"
        target="_blank" 
        rel="noopener noreferrer"
    >
        View on VS Code Marketplace →
    </a>
</div>

I created a small VS Code extension to solve a minor annoyance in my Streamlit development workflow. Instead of typing `streamlit run` in the terminal each time, I wanted a simple right-click option to launch my apps.

## Why I Built This

While working on various Streamlit projects, I found myself repeatedly typing the same terminal command. The solution was straightforward - add a context menu option to do this automatically. Nothing groundbreaking, just a small quality-of-life improvement.

## The Implementation

The extension is quite simple, consisting of just a few core components:

- A command registration for the context menu
- Basic terminal management for running the Streamlit command
- Simple error handling for missing dependencies

## What I Learned

This was my first time creating a VS Code extension, and while it's a very basic one, I learned about:

- The basic structure of VS Code extensions
- How to interact with VS Code's terminal API
- The process of publishing to the VS Code marketplace

## Next Steps

While the extension is intentionally minimal, I might add a few small features if users request them:

- Basic configuration options
- Support for common Streamlit CLI arguments
- Simple status indicators