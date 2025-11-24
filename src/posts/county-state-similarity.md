---
title: "County State Similarity"
description: "Finding which US counties look most like US states using computer vision."
date: 2025-11-24
image: ./West_Virginia_best_match.png
categories: ["programming"]
---

I recently came across a [tweet by RyanWx_](https://x.com/RyanWx_/status/1888037348988043306) showing counties near Oklahoma that look suspiciously like Oklahoma itself.

<div class="flex flex-col items-center gap-4 my-4">
     <img src="/posts/county-state-similarity/Oklahoma_best_match.png" alt="Oklahoma similarity match" class="w-full rounded-lg shadow-md" />
</div>

It got me thinking: what is the "most recursive" county in the US? Which county looks most like its own state? Or, ignoring location, which county looks most like *any* state?

I decided to run a computer vision analysis on all 3,000+ US counties against all 50 states to find out.

## 1. The Constraint

Comparing geographic shapes is tricky because "similarity" can mean different things. In this case, I wanted to find shapes that were visually similar regardless of:
1.  **Scale**: A county is much smaller than a state.
2.  **Rotation**: The county might be rotated relative to the state.
3.  **Position**: The location doesn't matter (we're looking for shape only).

Simple pixel-by-pixel overlap wouldn't work because aligning the shapes is a hard problem in itself. I needed a mathematical way to describe the "essence" of a shape that I could compare directly.

## 2. Analysis & Transcription

The solution is **Elliptic Fourier Descriptors (EFDs)**. This is a technique often used in biology to classify leaf shapes. It works by tracing the outline of a shape and decomposing it into a series of ellipses (harmonics).

By normalizing these descriptors, we can get a set of numbers that represents the shape's geometry independent of its size, rotation, or starting point.

<div class="flex flex-col items-center gap-4 my-4">
    <!-- Visual explanation of EFDs would go here if I had one, but code suffices -->
</div>

I wrote a Python script to process the Census Bureau's shapefiles. Here's the core logic that converts a geographic boundary into a comparable signature:

```python
def process_shape(geometry, n_points=100, n_harmonics=20):
    # Sample boundary points
    boundary_points = sample_boundary(geometry, n_points)
    
    # Compute EFDs
    coeffs = elliptic_fourier_descriptors(boundary_points, order=n_harmonics)
    
    # Normalize coefficients to be invariant to rotation, translation, and scale
    coeffs_normalized = normalize_efd(coeffs)
    
    return coeffs_normalized
```

With this signature, I could calculate the Euclidean distance between any state and any county to get a "similarity score".

## 3. The Results

After crunching the numbers for over 150,000 combinations, here are some of the best matches.

### West Virginia vs. Park County, Wyoming
This was one of the highest similarity scores in the entire dataset. Park County, WY captures the irregular borders of West Virginia surprisingly well.

<div class="flex flex-col items-center gap-4 my-4">
     <img src="/posts/county-state-similarity/West_Virginia_best_match.png" alt="West Virginia vs Park County" class="w-full rounded-lg shadow-md" />
</div>

### Illinois vs. Lawrence County, Illinois
This is a great example of "recursive geography". Lawrence County is actually *in* Illinois and shares a very similar vertical, slightly tapered shape.

<div class="flex flex-col items-center gap-4 my-4">
     <img src="/posts/county-state-similarity/Illinois_best_match.png" alt="Illinois vs Lawrence County" class="w-full rounded-lg shadow-md" />
</div>

### Florida vs. Union County, South Dakota
Florida is a hard shape to match because of the panhandle. The algorithm found Union County, SD, which has a similar "body with a protrusion" structure, even if it's not a perfect match.

<div class="flex flex-col items-center gap-4 my-4">
     <img src="/posts/county-state-similarity/Florida_best_match.png" alt="Florida vs Union County" class="w-full rounded-lg shadow-md" />
</div>

### Minnesota vs. Leelanau County, Michigan
Another interesting cross-state match.

<div class="flex flex-col items-center gap-4 my-4">
     <img src="/posts/county-state-similarity/Minnesota_best_match.png" alt="Minnesota vs Leelanau County" class="w-full rounded-lg shadow-md" />
</div>

## 4. Next Steps?

The current analysis treats every shape as a closed loop. It works great for states like Wyoming or Colorado (rectangles match rectangles), but struggles with complex coastlines like Maryland or disconnected landmasses like Hawaii.

A fun extension would be to build an interactive map where you can click a state and see its "county twin," or vice versa. For now, I'm just happy to know that if West Virginia ever needs a body double, Park County, Wyoming is ready to step in.

