---
title: "Solving 100 Pics with WordNet"
description: "Using computer vision and semantic similarity to crush a mobile trivia game."
date: 2025-11-25
image: ./gameplay.png
categories: ["python", "computer-vision", "nlp"]
---

<script>
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
</script>

"100 Pics Quiz" is a popular mobile game where you're shown a picture and have to guess what it is using a jumbled set of letters. It's usually pretty easy, but sometimes the "Animal" is some obscure species of lemur, or the "Logo" is from a company that went defunct in the 90s.

<div class="flex flex-col items-center gap-4 my-4">
     <img src="/posts/100-pics-solver/gameplay.png" alt="100 Pics Gameplay" class="w-[400px] max-w-full rounded-lg shadow-md" />
</div>

Naturally, instead of just googling the answer, I spent a few hours writing a Python script to play the game for me.

## 1. The Constraint

The game gives us three key pieces of information:
1.  **The Category**: We select this before playing (e.g., "Animals", "Logos", "Food").
2.  **The Word Length**: Indicated by the number of empty gray boxes.
3.  **The Letters**: A pool of ~14 scrambled letters to choose from.

My goal was to build a tool that could look at my screen, parse this info, and tell me the most likely answer.

## 2. Analysis & Transcription

The first step is Computer Vision. I used `cv2` (OpenCV) and `pytesseract` to read the game state.

### Isolating the Letters
The letters always appear in green tiles at the bottom. To get a clean read for the OCR (Optical Character Recognition), I masked out everything that wasn't that specific shade of green (`#22a976`).

```python
def process_letters_morphological(img):
    # Convert to HSV and create mask for target color
    hsv = cv2.cvtColor(bottom_section, cv2.COLOR_BGR2HSV)
    target_color = hex_to_bgr('22a976')
    
    # Create mask based on color tolerance
    mask = cv2.inRange(hsv, lower_bound, upper_bound)
    
    # Morphological erosion to separate letters from tile borders
    kernel = np.ones((2, 2), np.uint8)
    eroded = cv2.erode(mask, kernel, iterations=1)
        
    return eroded
```

### Counting the Length
Finding the target word length was simpler: I just looked for the gray empty boxes (`#E4E9E9`) and counted the contours.

```python
# Count gray squares for word length
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
mask = cv2.inRange(gray, lower_gray, upper_gray)
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
word_length = len([c for c in contours if cv2.contourArea(c) > 100])
```

## 3. The Solution

Once we have the letters `[A, C, T, A, R, ...]` and a length `3`, we can find all valid English words that fit. But "CAT", "RAT", "CAR", and "ART" might all be valid. How do we know which one matches the picture?

We don't look at the picture at all. We look at the **Category**.

### Semantic Similarity with WordNet
If the category is "Animals", "CAT" is a much better guess than "CAR". To quantify this, I used **WordNet**, a lexical database for English.

I calculated a score for every candidate word based on its semantic relationship to the category name.

```python
def calculate_category_score(self, word: str, category: str) -> float:
    word_synsets = wn.synsets(word)
    category_synsets = wn.synsets(category)
    
    for word_syn in word_synsets:
        # Check if word is a hyponym (specific instance) of the category
        # e.g. "Cat" is a hyponym of "Animal"
        category_path = word_syn.hypernym_paths()
        for path in category_path:
            if any(cat in path for cat in category_synsets):
                return 1.0  # Direct relationship found
```

If there wasn't a direct parent-child relationship (hypernym/hyponym), I fell back to a path similarity score, which measures how close the two concepts are in the WordNet tree.

### The Frequency Boost
Sometimes WordNet can be too academic. It might think "FELIS" is a great match for "Animal", but the game wants "CAT". To fix this, I added a weight for **word frequency**. Common words are more likely to be the answer.

```python
final_score = (
    weights['wordnet'] * wordnet_score +
    weights['frequency'] * freq_score
)
```

## 4. Final Result

The script runs in a terminal next to the game. It takes a screenshot, processes it, and spits out the ranked answers.

<div class="flex flex-col items-center gap-4 my-4">
     <img src="/posts/100-pics-solver/gameplay-2.png" alt="Solver Output" class="w-[400px] max-w-full rounded-lg shadow-md" />
</div>

It's surprisingly effective. Even without seeing the image, the combination of letter constraints + length constraints + semantic category is usually enough to narrow the search space down to a single correct answer.

