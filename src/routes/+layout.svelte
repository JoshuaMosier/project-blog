<script>
  import "../app.css";
  import { inject } from '@vercel/analytics';
  import SocialIcons from "$lib/components/SocialIcons.svelte";
  import Search from "$lib/components/Search.svelte";
  import { page } from '$app/stores';
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
  <nav class="sticky top-0 z-50 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700">
    <div class="max-w-7xl mx-auto flex items-center justify-between p-4">
      <div class="w-64">
        <SocialIcons />
      </div>
      
      <ul class="flex space-x-8">
        <li>
          <a 
            href="/" 
            class="relative text-white group py-2 {$page.url.pathname === '/' ? 'active' : ''}"
          >
            Home
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
          </a>
        </li>
        <li>
          <a 
            href="/gallery" 
            class="relative text-white group py-2 {$page.url.pathname === '/gallery' ? 'active' : ''}"
          >
            Gallery
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
          </a>
        </li>
        <li>
          <a 
            href="/about" 
            class="relative text-white group py-2 {$page.url.pathname === '/about' ? 'active' : ''}"
          >
            About
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
          </a>
        </li>
        <li>
          <a 
            href="/resume" 
            class="relative text-white group py-2 {$page.url.pathname === '/resume' ? 'active' : ''}"
          >
            Résumé
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
          </a>
        </li>
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