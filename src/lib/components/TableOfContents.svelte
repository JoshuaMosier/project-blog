<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  
  let headings = [];
  
  function initializeTableOfContents() {
    headings = Array.from(document.querySelectorAll('article h2, article h3'))
      .map(heading => {
        if (!heading.id) {
          heading.id = heading.textContent.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }
        
        return {
          id: heading.id,
          text: heading.textContent,
          level: parseInt(heading.tagName[1])
        };
      });
  }
  
  onMount(initializeTableOfContents);
  
  // Re-initialize when navigating between pages
  afterNavigate(initializeTableOfContents);
  
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
</script>

<nav class="hidden lg:block sticky top-12 max-h-[calc(100vh-8rem)] overflow-y-auto -ml-12">
  <h4 class="text-xs font-semibold mb-4 text-slate-500 uppercase tracking-wider">Contents</h4>
  <ul class="space-y-1.5 border-l border-bg-tertiary pl-4">
    <!-- Add Top link as first element -->
    <li>
      <button 
        class="text-sm hover:text-violet-400 transition-colors block py-1 text-slate-500 text-left w-full"
        on:click={scrollToTop}
      >
        Back to top
      </button>
    </li>

    {#each headings as heading}
      <li style="margin-left: {(heading.level === 3 ? '0.75rem' : '0')}">
        <a 
          href="#{heading.id}" 
          class="text-sm hover:text-accent-teal transition-colors block py-1 text-slate-500 {heading.level === 3 ? 'text-xs' : ''}"
          on:click|preventDefault={(e) => {
            const element = document.getElementById(heading.id);
            if (element) {
              const offset = 100;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - offset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }}
        >
          {heading.text}
        </a>
      </li>
    {/each}
  </ul>
</nav> 