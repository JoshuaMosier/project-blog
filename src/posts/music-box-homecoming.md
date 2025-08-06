---
title: "Custom Music Box – Samsung ‘Homecoming’ Ringtone"
date: 2025-08-02
image: ./music-box.jpg
categories: ["3d-printing"]
---

<script>
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
</script>

<video src="/posts/music-box/output.mp4" class="w-[400px] max-w-full h-auto rounded-lg shadow-lg mx-auto my-8" controls>
    <track kind="captions">
</video>

> **TL;DR:** I transcribed Samsung’s “Homecoming” alarm tone, tracked down a mechanical music-box comb that could actually play it, and 3-D-printed a custom enclosure so the modern digital ringtone can ring out from true analog clockwork.

## Digital Meets Mechanical

Samsung’s *Homecoming* alarm is a curious hybrid: it sounds like an old-school music box, yet it was produced entirely in software. That paradox made me wonder—could I reverse the process and make the tune *physical* again?

This post walks through:

1. Locating a clean MIDI copy of the ringtone.
2. Learning that most retail music boxes are **not chromatic** (they skip notes!).
3. Matching the ringtone’s melody to whatever note sets *do* exist.
4. Ordering a handful of 18-note comb mechanisms from Amazon.
5. Designing & printing a new drum and housing so the comb can play *Homecoming* faithfully.

---

<AudioPlayer src="/posts/music-box/homecoming.mp3" />

## 1. Finding the MIDI

I first grabbed a YouTube rip of the alarm, but background hiss made note detection messy. After some spelunking on XDA forums I found a leaked system dump that contained `Homecoming.ogg`. A quick conversion in **Audacity** plus Melodyne’s note-detection gave me a rough MIDI.

![Melodyne screenshot](/posts/music-box/melodyne.png)

Cleaning and quantising in **MuseScore** left me with a tidy 2-bar melody in C major.

```midi
C5  E5  G5  A5  G5  E5  C5  (rest)
A4  C5  E5  F5  E5  C5  A4
```

---

## 2. The Chromatic Gap Problem

Off-the-shelf crank music boxes use 15- or 18-note combs, but **they skip accidentals** to keep cost down. Common pattern for 18-note comb:

```
C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5 G5 A5 B5 C6 D6 E6 F6
```

Notice there’s **no C# / D# / F# / G# / A#**. Fortunately *Homecoming* sits nicely inside the white keys—except one pesky high B♭.

### Comb shopping spreadsheet

| Vendor | Range | Missing notes | Works? |
|--------|-------|---------------|--------|
| Sankyo 18-note (Amazon) | C4–F6 | all sharps | ✅ yes |
| Unknown 15-note (eBay)   | G3–E5 | no sharps | ❌ too low |

A Sankyo 18-note won.

---

## 3. Remapping the Melody

One note—B♭—was still off-limits. I dropped it an octave and the ear hardly notices. Here’s the adjusted score highlighted on the comb’s tooth map:

<div class="flex flex-col items-center w-full my-8">
    <img src="/posts/music-box/note-chart.png" alt="Note chart overlay" class="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-lg" />
</div>

---

## 4. Designing the Drum & Case

The Sankyo mechanism ships with a blank paper strip and punch. Fun, but tedious. Instead I:

1. Exported the final MIDI to **CSV**.
2. Wrote a small Python script (see GitHub link in footer) that turns timestamps into peg coordinates.
3. Modeled a drum in **Fusion 360** with peg holes.
4. Printed the drum in PETG and the enclosure in silk PLA.

![Printed parts](/posts/music-box/printed-parts.jpg)

The comb bolts in place; a crank fits onto the drum axle.

---

## 5. Assembly & First Play

Moment of truth—after 15 minutes of gentle filing the drum spun freely. Cranking it the first time was strangely nerve-wracking…

<video src="/posts/music-box/output.mp4" class="w-[400px] max-w-full h-auto rounded-lg shadow-lg mx-auto my-8" controls>
    <track kind="captions">
</video>

It works! The shifted B♭ is imperceptible unless you’re actively listening for it.

---

## 6. What I Learned

* **Digital → Analog translation** is sometimes simpler than it looks when the source melody is diatonic.
* 3-D printing replaceable drums is far faster than punching paper strips.
* Old mechanisms + new fabrication = delightful hybrid projects.

---