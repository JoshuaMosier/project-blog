<script>
  import SocialIcons from "./SocialIcons.svelte";
  import Search from "./Search.svelte";
  import { page } from '$app/stores';
  import { readingProgress, showReadingProgress } from '$lib/stores/readingProgress';

  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleLinkClick() {
    if (isMenuOpen) {
      isMenuOpen = false;
    }
  }
</script>

<nav class="sticky top-0 z-50 bg-bg-secondary/95 backdrop-blur-md border-b border-bg-tertiary">
  <div class="max-w-7xl mx-auto flex items-center justify-between p-4">
    <div class="w-auto md:w-64">
      <SocialIcons />
    </div>
    
    <button 
      class="md:hidden p-2 text-slate-300 hover:text-violet-400 transition-colors"
      on:click={toggleMenu}
      aria-label="Toggle menu"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        />
      </svg>
    </button>

    <ul class="{isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full left-0 right-0 md:top-auto flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 bg-bg-secondary/95 md:bg-transparent p-4 md:p-0 backdrop-blur-md md:backdrop-blur-none">
      <li>
        <a 
          href="/" 
          on:click={handleLinkClick}
          class="relative text-slate-300 group py-2 font-medium transition-colors hover:text-white {$page.url.pathname === '/' ? 'active' : ''}"
        >
          Home
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-accent-teal transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
        </a>
      </li>
      <li>
        <a 
          href="/gallery" 
          on:click={handleLinkClick}
          class="relative text-slate-300 group py-2 font-medium transition-colors hover:text-white {$page.url.pathname === '/gallery' ? 'active' : ''}"
        >
          Gallery
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-accent-teal transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
        </a>
      </li>
      <li>
        <a 
          href="/about" 
          on:click={handleLinkClick}
          class="relative text-slate-300 group py-2 font-medium transition-colors hover:text-white {$page.url.pathname === '/about' ? 'active' : ''}"
        >
          About
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-accent-teal transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
        </a>
      </li>
      <li>
        <a 
          href="/resume" 
          on:click={handleLinkClick}
          class="relative text-slate-300 group py-2 font-medium transition-colors hover:text-white {$page.url.pathname === '/resume' ? 'active' : ''}"
        >
          Resume
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-accent-teal transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
        </a>
      </li>
    </ul>

    <div class="hidden md:block w-64">
      <!-- <Search /> -->
    </div>
  </div>
  
  {#if $showReadingProgress}
    <div 
      class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-400 to-accent-teal transition-all duration-100 ease-out z-50" 
      style:width="{$readingProgress}%"
    />
  {/if}
</nav>