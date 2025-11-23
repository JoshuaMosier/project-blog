---
title: "Building a Movie Poster Mosaic Generator"
description: "A Python application that generates mosaic movie posters from thousands of smaller poster thumbnails using color analysis."
date: 2023-10-13
image: ./movie-posters.jpg
categories: ["programming"]
---

<div class="flex flex-col items-center w-full my-8">
    <img 
        src="/posts/movie-posters/movie-posters.jpg" 
        alt="Example mosaic poster" 
        class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg mx-auto" 
    />
    <a 
        href="/posts/movie-posters/full-res.jpg" 
        class="mt-2 text-sm text-blue-300 hover:text-blue-400 italic"
        target="_blank" 
        rel="noopener noreferrer"
    >
        View full resolution mosaic→
    </a>
</div>

I built a Python application that generates movie posters made up of thousands of tiny movie poster thumbnails. The program analyzes colors to create a larger image mosaic while maintaining visual coherence.

## The Technical Challenge

Creating photo mosaics presents several interesting technical challenges:

- Analyzing and matching colors effectively across thousands of images
- Optimizing image processing for reasonable performance
- Maintaining visual quality at both macro and micro scales
- Handling different poster aspect ratios and sizes

The core of the solution uses k-d trees for efficient color matching and PIL for image processing. Here's a simplified example of how the color matching works:

```python
def build_kd_tree(color_data):
    points = []
    filenames = []
    for filename, details in color_data.items():
        dominant_color = details['colors'][0]
        points.append(dominant_color)
        filenames.append(filename)
    return KDTree(points), filenames
```

## Image Processing Pipeline

The full process involves several steps:

1. Download and preprocess movie poster images
2. Extract dominant colors from each poster
3. Build a searchable color database
4. Generate the mosaic by matching target colors
5. Create final output in multiple sizes with proper DPI

## Optimization Techniques

Some key optimizations I implemented:

- Caching preprocessed image data in JSON
- Using numpy for faster color calculations
- Implementing parallel processing for image analysis
- Pre-filtering images based on color characteristics

## Production Features

Beyond the core mosaic generation, I added several features for production use:

- Multiple output sizes (16x20", 18x24", 24x36")
- Border and borderless variants
- High-resolution 300 DPI output
- Preview image generation
- Automated listing photo creation

## Lessons Learned

This project taught me a lot about:

- Color space mathematics and perception
- Image processing optimization techniques
- Working with large datasets of images
- Balancing quality vs performance tradeoffs

The most challenging aspect was tuning the color matching algorithm to produce visually pleasing results while maintaining reasonable processing times.



*Built with Python, PIL, numpy, and lots of movie posters*
