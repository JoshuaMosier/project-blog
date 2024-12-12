<script>
  import { onMount } from 'svelte';
  
  let progress = 0;
  
  onMount(() => {
    const updateProgress = () => {
      const article = document.querySelector('article');
      if (!article) return;
      
      const windowHeight = window.innerHeight;
      const articleHeight = article.offsetHeight;
      const scrollTop = window.scrollY;
      const articleTop = article.offsetTop;
      
      // Calculate total scrollable distance
      const scrollableDistance = articleHeight - windowHeight;
      
      // Calculate current scroll position relative to the article
      const currentScroll = scrollTop - articleTop;
      
      // Calculate progress percentage, ensuring we reach 100% at the bottom
      progress = Math.max(0, Math.min(100, (currentScroll / scrollableDistance) * 100));
    };
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation
    
    return () => window.removeEventListener('scroll', updateProgress);
  });
</script>

<div class="fixed top-[56px] left-0 w-full h-0.5 bg-gray-800 z-50">
  <div 
    class="h-full bg-purple-300 transition-all duration-100 ease-out" 
    style:width="{progress}%"
  />
</div> 