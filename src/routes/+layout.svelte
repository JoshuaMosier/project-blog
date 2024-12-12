<script>
  import "../app.css";
  import { inject } from '@vercel/analytics';
  import SocialIcons from "$lib/components/SocialIcons.svelte";
  inject();
</script>

<div class="min-h-screen flex flex-col bg-gray-900 text-white">
  <nav class="sticky top-0 z-50 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700">
    <div class="max-w-4xl mx-auto flex items-center justify-between p-4">
      <div class="w-32">
        <!-- Left spacer to help with centering -->
      </div>
      
      <ul class="flex space-x-8">
        <li><a href="/" class="text-white hover:text-gray-300">Home</a></li>
        <li><a href="/gallery" class="text-white hover:text-gray-300">Gallery</a></li>
        <li><a href="/about" class="text-white hover:text-gray-300">About</a></li>
        <li><a href="/resume" class="text-white hover:text-gray-300">Resume</a></li>
      </ul>

      <div class="w-32 flex justify-end">
        <SocialIcons />
      </div>
    </div>
  </nav>

  <main class="flex-grow container mx-auto px-4 py-8">
    <slot />
  </main>
</div>