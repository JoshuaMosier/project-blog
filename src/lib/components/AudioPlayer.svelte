<script>
  // Simple reusable audio player component.
  // Props:
  // - src  : string (required) – path to the audio file (mp3, wav, etc.)
  // - alt  : string (optional) – caption or description displayed under the player
  // - defaultVolume: number (0–1) – initial volume level, defaults to 0.2 (20%)
  import { onMount } from 'svelte';
  export let src = "";
  export let alt = "";
  export let defaultVolume = 0.2;
  let audioRef;
  onMount(() => {
    if (audioRef && typeof defaultVolume === 'number') {
      audioRef.volume = Math.min(Math.max(defaultVolume, 0), 1);
    }
  });
</script>

<div class="my-6 w-full flex flex-col items-center">
  <audio controls bind:this={audioRef} class="w-full max-w-[600px] rounded-lg shadow-lg">
    <source {src} />
    Your browser does not support the audio element.
  </audio>

  {#if alt}
    <p class="text-sm text-gray-400 italic mt-2 text-center px-2">{alt}</p>
  {/if}
</div>
