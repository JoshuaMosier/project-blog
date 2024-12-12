<script>
  import SocialIcons from "./SocialIcons.svelte";
  import Search from "./Search.svelte";
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleLinkClick() {
    if (isMenuOpen) {
      isMenuOpen = false;
    }
  }

  let isMobile = browser && window.innerWidth <= 768;
</script>

<nav class="sticky top-0 z-50 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700">
  <div class="max-w-7xl mx-auto flex items-center justify-between p-4">
    <div class="w-auto md:w-64">
      <SocialIcons />
    </div>
    
    <button 
      class="md:hidden p-2"
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

    <ul class="{isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full left-0 right-0 md:top-auto flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 bg-gray-800/95 md:bg-transparent p-4 md:p-0">
      <li>
        <a 
          href="/" 
          on:click={handleLinkClick}
          class="relative text-white group py-2 {$page.url.pathname === '/' ? 'active' : ''}"
        >
          Home
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
        </a>
      </li>
      <li>
        <a 
          href="/gallery" 
          on:click={handleLinkClick}
          class="relative text-white group py-2 {$page.url.pathname === '/gallery' ? 'active' : ''}"
        >
          Gallery
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
        </a>
      </li>
      <li>
        <a 
          href="/about" 
          on:click={handleLinkClick}
          class="relative text-white group py-2 {$page.url.pathname === '/about' ? 'active' : ''}"
        >
          About
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
        </a>
      </li>
      <li>
        <a 
          href="/resume" 
          on:click={handleLinkClick}
          class="relative text-white group py-2 {$page.url.pathname === '/resume' ? 'active' : ''}"
        >
          Resume
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
        </a>
      </li>
    </ul>

    <div class="hidden md:block w-64">
      <Search />
    </div>
  </div>
</nav> 