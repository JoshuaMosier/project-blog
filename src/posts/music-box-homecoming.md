---
title: "Samsung Ringtone Music Box"
description: "I made Samsung's infamous alarm sound into a 3d-printed music box."
date: 2025-08-02
image: ./music-box.png
categories: ["3d-printing"]
---

<script>
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
</script>

<video src="/posts/music-box/output.mp4" class="w-[400px] max-w-full h-auto rounded-lg shadow-lg mx-auto my-8" controls>
    <track kind="captions">
</video>

## Digital Meets Analog

Samsung's "Homecoming" is one of the default alarm sounds on Samsung phones. Even though I've switched to iPhone for the past few years, hearing it still triggers an immediate stress response.

<div class="flex flex-col items-center gap-4 my-4">
     <div class="w-full max-w-md flex flex-col items-center">
         <AudioPlayer src="/posts/music-box/homecoming.mp3" />
     </div>
</div>

Turns out I'm not alone:

<div class="flex flex-col items-center gap-4 my-4">
     <img src="/posts/music-box/homecoming-youtube-comments.png" alt="Homecoming Comments" class="w-full rounded-lg shadow-md" />
</div>

The ringtone was clearly styled to sound like a music box, but I couldn't find any historical song it was based on, nor anyone who had made it into an actual music box.

Taking a digital song styled after analog technology and making it into the real thing felt right. The extra 'joy' I could bring to those who have dealt with this sound every morning was a bonus.

## 1. The Constraint

To start the project, I bought some cheap wind-up drum-style music boxes from Amazon that I could modify. What I assumed would be a simple process of measuring the drum and printing a new one turned out to be more complicated.

<div class="flex flex-col items-center gap-4 my-4">
     <img src="/posts/music-box/music-box-amazon.jpg" alt="Music Box" class="w-full rounded-lg shadow-md" />
</div>

With 18 total teeth on the comb that plays the notes, I assumed that would give me enough range to fit the ringtone. After transcribing notes from one of the music boxes I had purchased, I found that not only were the notes not chromatic, some of them were duplicates.

It turns out that each music box comb is custom-machined for its specific song. Material underneath each tooth is machined away so it oscillates at the right frequency when struck. The comb only contains the exact notes needed for that particular melody and when a note needs to be played in rapid succession, two teeth are tuned to the same pitch.

I decided I wasn't going to machine my own comb, so the challenge became: could I find an existing music box that already had all the notes I needed?

## 2. Analysis & Transcription

Luckily it wasn't hard to find a MIDI file of the Homecoming ringtone, which gave me a list of the notes I needed to play.

<div class="flex flex-col items-center gap-4 my-4">
    <img src="/posts/music-box/midi-editor.png" alt="MIDI Editor view" class="w-full rounded-lg shadow-md" />
</div>

Now I needed to figure out which notes were available on different music box combs.

### Source Audio

<div class="flex flex-col items-center gap-4 my-4">
    <img src="/posts/music-box/amazon-listing.png" alt="Amazon Listing" class="w-full rounded-lg shadow-md" />
</div>

Amazon had dozens of different music boxes, each with a different comb, but I didn't want to buy them all just to find one that worked. Fortunately, each product listing had a video demo and I extracted the audio from these videos to analyze them.

### Note Detection

I used a program called [Melodyne](https://www.celemony.com/en/melodyne/what-is-melodyne) to automatically transcribe the audio files. I had initially tried onset detection and spectrogram analysis, but Melodyne consistently gave me the cleanest starting point.

<div class="flex flex-col items-center gap-4 my-4">
    <img src="/posts/music-box/melodyne.png" alt="Melodyne pitch detection" class="w-full rounded-lg shadow-md" />
</div>

### MIDI Cleanup

Most of the music boxes had notes between C4 and C7. After filtering Melodyne's output, I exported each song to MIDI and used [MIDI Editor](http://www.midieditor.org/) to make final adjustments. The rhythm didn't need to be perfect, I just needed the right set of notes.

### The Problem

Now that I had Homecoming's notes and could parse notes from each music box, I started looking for overlap. I was hopeful that if two songs were in similar keys, there'd be a good chance the notes would match.

After comparing a dozen music boxes, I hit a wall: **not a single one had all the notes I needed.** Even being off by a single semitone would make it sound wrong.

### The Solution

Then it hit me: I was thinking about this backwards. I couldn't change the notes on the comb, but I *could* change Homecoming. By transposing the melody up or down by semitone intervals, I could shift all the notes while keeping the melody intact.

<div class="flex flex-col items-center gap-4 my-4">
    <img src="/posts/music-box/note-analysis.png" alt="Mapping notes to comb teeth" class="w-full rounded-lg shadow-md" />
</div>

I vibecoded a script to test each music box against Homecoming at all 12 possible transpositions. For each semitone shift, it would check if every note in the transposed melody existed on that comb:

```python
# Try all 12 possible transpositions
for semitones in range(-12, 13):
    shifted_midi_notes = {midi_note_to_name(n + semitones) for n in midi_notes}
    overlap = shifted_midi_notes & available_comb_notes
    overlap_count = len(overlap)
    missing = shifted_midi_notes - available_comb_notes
    
    print(f"Shift {semitones:+} semitones: {overlap_count}/{len(shifted_midi_notes)} notes")
    
    if overlap_count > best_overlap:
        best_overlap = overlap_count
        best_shift = semitones
```

After running through all the combinations, I found it: the "Beauty and the Beast" music box, transposed up 5 semitones, was a perfect match. Every single note in Homecoming existed on that comb.

## 3. Design & Fabrication

With the transposed MIDI file ready, I needed to generate the drum geometry. I found [MIDI to Music Box](https://huggingface.co/spaces/PashaWNN/midi_to_music_box), an openSCAD script by Pasha that generates STL files from MIDI input for this exact style of music box.

<div class="flex flex-col items-center w-full my-8">
    <img src="/posts/music-box/gradio.png" alt="Gradio app" class="w-full h-auto rounded-lg shadow-lg" />
</div>

After verifying the MIDI timing was correct, I generated and printed the drum in PLA on a Bambu Lab X1C. I was worried about the durability of the tiny pins, but they've held up perfectly so far.

Swapping the new drum into the music box was straightforward, a small set screw presses it into the case and aligns it with the comb.

## 4. Final Result

After reseating the drum and making sure the comb was properly resonating, I was impressed by how well it sounded - and then immediately hit with the feeling like I had overslept and was going to be late for school.

<video src="/posts/music-box/music-box-vid.mp4" class="w-[400px] max-w-full h-auto rounded-lg shadow-lg mx-auto my-8" controls>
    <track kind="captions">
</video>


## 5. Next Steps?

I achieved almost exactly what I set out to do, but there's an extra layer I'd like to add eventually.

The parallel between taking a digital sound and making it analog was fun, but since it's used as an alarm, I thought about going further: combining the music box with a mechanical kitchen timer to create a fully analog alarm clock. It would tick down like a timer, then trigger the music box instead of ringing a bell.

<div class="flex flex-col items-center w-full my-8">
    <img src="/posts/music-box/smartphone.png" alt="Technologies replaced by smartphones" class="w-full h-auto rounded-lg shadow-lg" />
</div>

I'm sure I could frame this as social commentary on how smartphones have replaced dozens of analog devices, and reversing it by instead making a digital experience analog, but honestly I just think the mechanism would be neat.
