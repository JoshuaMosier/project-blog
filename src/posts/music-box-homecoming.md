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

Samsung’s "Homecoming" sound is almost universally hated for its use as the default morning alarm for Samsung phones. Even though I've switched to iphone for the past few years, it still triggers a reaction every time I hear it. 

<div class="flex flex-col items-center gap-4 my-4">
     <div class="w-full max-w-md flex flex-col items-center">
         <AudioPlayer src="/posts/music-box/homecoming.mp3" />
     </div>
</div>

It's safe to say that this is not a unique experience:

<div class="flex flex-col items-center gap-4 my-4">
     <img src="/posts/music-box/homecoming-youtube-comments.png" alt="Homecoming Comments" class="w-full rounded-lg shadow-md" />
</div>

It was pretty evident that the ringtone was supposed to sound like a music box, but from what my research could tell me, the tune wasn't based on any historical song, nor could I find anyone who had made it into a music box.

Taking a digital song that was styled after an analog technology and making it into the real thing felt like the right thing to do.
The extra 'joy' I could bring to those who have dealt with this sound every day was a bonus.

## 1. The Mechanism
I find music boxes to be really interesting mechanically because they're only a few components away from being a fully functional mechanical watch. It makes sense, both are wound to store energy in a main spring and then release it in a controlled manner to keep time. I'd encourage you to watch [this video](https://www.youtube.com/watch?v=COty6_oDEkk) from engineerguy for a more detailed explanation.

<div class="flex flex-col items-center gap-4 my-4">
     <img src="/posts/music-box/music-box-pocketwatch.jpg" alt="Music Box Pocketwatch" class="w-full rounded-lg shadow-md" />
</div>

To start the project, I bought some cheap wind-up drum-style music boxes from Amazon that I could modify. What I assumed was going to be a simple process of measuring the drum and then printing a new one turned out to be a bit more complicated.

With 18 total teeth on the comb that plays the notes, I assumed that would give me enough octaves in order to fit the ringtone. After manually transcribing the notes from a Star Wars music box, I found that not only were the notes not chromatic, some of them were duplicates. This meant I wasn't guaranteed to be able to replicate the song if I was missing any notes.

It turns out that the comb for each song is different. Material underneath each tooth is machined away so that when a pin on the drum hits the tooth, it oscillates at a specific frequency to play the desired note. For this style of music box, the comb only has the notes required to play the specific tune. Sometimes when a note needs to be played in rapid succession in the song, two separate teeth will be used to play the same note which is why I found duplicates.

It would be difficult to create my own comb, so the challenge became figuring out if there was a comb from another song that had the same set of notes I needed.

## 2. Analysis & Transcription

Luckily it wasn't too hard to find a midi file of the homecoming song which made it easy to get a list of the notes I needed to play.

<div class="flex flex-col items-center gap-4 my-4">
    <img src="/posts/music-box/midi-editor.png" alt="MIDI Editor view" class="w-full rounded-lg shadow-md" />
</div>

Now that I had the list of notes from 'Homecoming', I had to figure out a way to get the notes that were available on different combs.

### Source Audio
<div class="flex flex-col items-center gap-4 my-4">
    <img src="/posts/music-box/amazon-listing.png" alt="Amazon Listing" class="w-full rounded-lg shadow-md" />
</div>

Amazon had quite a few options for different music boxes which would all have different combs, but I didn't want to buy all of them just to find one that would work. Fortunately, each product listing had a video of the music box being played which allowed me extract audio files for all of them.

### Note Detection
I don't have perfect pitch, but with enough time I could have transcribed the notes manually. However, to speed things up, I used a program called [Melodyne](https://www.celemony.com/en/melodyne/what-is-melodyne) that would automatically transcribe the audio files for me. I had intially tried using onset detection and spectrogram analysis, but Melodyne was able to consistently get me a good starting point.

<div class="flex flex-col items-center gap-4 my-4">
    <img src="/posts/music-box/melodyne.png" alt="Melodyne pitch detection" class="w-full rounded-lg shadow-md" />
</div>

### MIDI Cleanup
Most of the music boxes all had notes between C4 and C7, so once I was able to roughly filter the output from Melodyne, I exported them to a MIDI file. I used [MIDI Editor](http://www.midieditor.org/) to visualize the output and make any final adjustments. It wasn't important that the rhythm was perfect as long as I had the right set of notes.

### Comb Mapping
Now that I had the list of notes from 'Homecoming' and I could parse the list of notes from each midi file, I was ready to start mapping the overlap. I was hopeful that if two songs used the same key, there would be a good chance that the notes would overlap.

Unfortunately, even after comparing a dozen audio files, there wasn't one that had a perfect overlap. If I was missing even one note off by a half step, it would sound 'off'. The solution to this was transposition. I wasn't able to change any of the notes on the comb, but I could still shift the notes of 'Homecoming' by different semitone intervals that would still keep the melody sounding right.

<div class="flex flex-col items-center gap-4 my-4">
    <img src="/posts/music-box/note-analysis.png" alt="Mapping notes to comb teeth" class="w-full rounded-lg shadow-md" />
</div>

I wrote a quick script to compare the set of notes from 'Homecoming' against the available notes on each comb. By shifting the target song up and down semitone-by-semitone, I looked for a shift where every note in the melody existed on the physical comb.
Once I added in the transposition logic, I was able to determine that the 'beauty and the beast' music box shifted 5 semitones up would be a perfect match.

## 3. Design & Fabrication

I was ready to dive in start CADing the new drum based on the transposed notes and timing, but I found someone who had already done the hard part for me with an openSCAD script for the same style of music box: [MIDI to Music Box](https://huggingface.co/spaces/PashaWNN/midi_to_music_box). Shoutout to Pasha for sharing his work!

<div class="flex flex-col items-center w-full my-8">
    <img src="/posts/music-box/gradio.png" alt="Gradio app" class="w-full h-auto rounded-lg shadow-lg" />
</div>

I still had to have come up with the initial list of notes and make sure the midi timing was correct, but now I was ready to create the new drum.

I printed the new drum in PLA on a Bambu Lab X1C. I was worried about the durability of the tiny pins, but the print quality was precise enough that they held up perfectly. Swapping the new drum into the music box was relatively straightforward with a small set screw that presses it into the rest of the case and aligns it with the comb.

## 4. Final Result

After reseating the drum and making sure the comb was properly resonating, I was impressed by how well it sounded and then immediately hit with the feeling like I had overslept and was going to be late for school.

<div class="flex flex-col items-center w-full my-8">
    <img src="/posts/music-box/music-box.png" alt="Final 3D printed music box" class="w-full h-auto rounded-lg shadow-lg" />
</div>

## 5. Next Steps?

I think I achieved almost exactly what I set out to do, but there's an extra layer I'd like to add eventually.
The parallel between taking a digital song and making it analog was fun, but the fact that it's used as an alarm and ringtone gave me the idea to make it into a full analog timer as well. 

By combining the music box with a mechanical kitchen timer, I could theoretically create an analog alarm that would tick down and then instead of ringing a bell, it would trigger the music box. 

<div class="flex flex-col items-center w-full my-8">
    <img src="/posts/music-box/smartphone.png" alt="Smartphone" class="w-full h-auto rounded-lg shadow-lg" />
</div>

I could turn this into a social commentary on how quickly we've replaced analog technology through the juxtaposition of taking a digital thing and making it analog instead of the other way around, but mostly I just think it'd be neat.