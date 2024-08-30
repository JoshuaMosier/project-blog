<script>
  import "../app.css";
  import { inject } from '@vercel/analytics';
  inject();
</script>

<div class="flex flex-col min-h-screen bg-gray-900 text-white">
  <nav class="bg-gray-800 p-4">
    <ul class="flex justify-center space-x-8">
      <li><a href="/" class="text-white hover:text-gray-300">Home</a></li>
      <li><a href="/about" class="text-white hover:text-gray-300">About</a></li>
      <li><a href="/contact" class="text-white hover:text-gray-300">Contact</a></li>
    </ul>
  </nav>

  <main class="flex-grow container mx-auto px-4 py-8 max-w-4xl">
    <slot />
  </main>
</div>