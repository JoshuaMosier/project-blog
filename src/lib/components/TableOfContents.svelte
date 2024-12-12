<script>
  import { onMount } from 'svelte';
  
  let headings = [];
  let activeId = '';
  
  onMount(() => {
    // Get all h2 and h3 headings from the article
    headings = Array.from(document.querySelectorAll('article h2, article h3'))
      .map(heading => {
        // Generate an ID if none exists
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
      
    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        // Sort entries by their position to ensure we select the topmost visible heading
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          activeId = visibleEntries[0].target.id;
        }
      },
      { 
        rootMargin: '-20px 0px -80% 0px',
        threshold: [0.1]
      }
    );
    
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  });

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
</script>

<nav class="hidden lg:block sticky top-12 max-h-[calc(100vh-8rem)] overflow-y-auto -ml-12">
  <h4 class="text-sm font-semibold mb-4 text-gray-400">Table of Contents</h4>
  <ul class="space-y-2">
    <!-- Add Top link as first element -->
    <li>
      <button 
        class="text-sm hover:text-purple-300 transition-colors block py-1 text-gray-400 text-left w-full"
        on:click={scrollToTop}
      >
        Back to top
      </button>
    </li>

    {#each headings as heading}
      <li class="pl-{(heading.level - 2) * 4}">
        <a 
          href="#{heading.id}" 
          class="text-sm hover:text-purple-300 transition-colors block py-1
                 {activeId === heading.id ? 'text-purple-300' : 'text-gray-400'}"
          on:click|preventDefault={(e) => {
            const element = document.getElementById(heading.id);
            if (element) {
              const offset = 80;
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