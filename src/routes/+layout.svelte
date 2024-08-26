<script>
  import "../app.css";
  import { inject } from '@vercel/analytics'
</script>

<div class="min-h-screen bg-gray-100">
  <nav class="bg-gray-800 p-4">
    <ul class="flex justify-center space-x-8">
      <li><a href="/" class="text-white hover:text-gray-300">Home</a></li>
      <li><a href="/about" class="text-white hover:text-gray-300">About</a></li>
      <li><a href="/contact" class="text-white hover:text-gray-300">Contact</a></li>
    </ul>
  </nav>

  <div class="min-h-screen bg-gray-900 text-white">
    <main class="container mx-auto px-4 py-8 max-w-2xl ">
      <slot />
    </main>
  </div>
</div>