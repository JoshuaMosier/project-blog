<script>
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import { inject } from '@vercel/analytics';
  inject();
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  injectSpeedInsights();
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
  <link 
    rel="alternate" 
    type="application/rss+xml" 
    title="RSS Feed for Josh Mosier's Blog" 
    href="/rss.xml"
  />
</svelte:head>

<div class="min-h-screen flex flex-col bg-gray-900 text-white">
  <Navbar />
  <main class="flex-grow container mx-auto px-4 py-8">
    <slot />
  </main>
</div>