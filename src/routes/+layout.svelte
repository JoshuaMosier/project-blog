<script>
  import "../app.css";
  import { inject } from '@vercel/analytics';
  import SocialIcons from "$lib/components/SocialIcons.svelte";
  import Search from "$lib/components/Search.svelte";
  inject();
  export let data;
</script>

<svelte:head>
  <title>{data.title ? `${data.title} | Josh Mosier` : 'Josh Mosier'}</title>
  <meta name="description" content={data.description || 'Personal portfolio and blog of Josh Mosier'} />
  <meta property="og:title" content={data.title || 'Josh Mosier'} />
  <meta property="og:description" content={data.description} />
  {#if data.image}
    <meta property="og:image" content={data.image} />
  {/if}
</svelte:head>

<div class="min-h-screen flex flex-col bg-gray-900 text-white">
  <nav class="sticky top-0 z-50 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700">
    <div class="max-w-6xl mx-auto flex items-center justify-between p-4">
      <div class="w-64 flex">
        <SocialIcons />
      </div>
      
      <ul class="flex space-x-8">
        <li><a href="/" class="text-white hover:text-gray-300">Home</a></li>
        <li><a href="/gallery" class="text-white hover:text-gray-300">Gallery</a></li>
        <li><a href="/about" class="text-white hover:text-gray-300">About</a></li>
        <li><a href="/resume" class="text-white hover:text-gray-300">Résumé</a></li>
      </ul>

      <div class="w-64">
        <Search />
      </div>
    </div>
  </nav>

  <main class="flex-grow container mx-auto px-4 py-8">
    <slot />
  </main>
</div>