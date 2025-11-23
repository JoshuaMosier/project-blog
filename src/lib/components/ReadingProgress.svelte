<script>
  import { onMount, onDestroy } from 'svelte';
  import { readingProgress, showReadingProgress } from '$lib/stores/readingProgress';
  
  onMount(() => {
    // Enable the progress bar
    showReadingProgress.set(true);
    
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
      
      // Calculate progress percentage
      const newProgress = Math.max(0, Math.min(100, (currentScroll / scrollableDistance) * 100));
      readingProgress.set(newProgress);
    };
    
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    // Initial calculation
    setTimeout(updateProgress, 100);
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  });

  onDestroy(() => {
    showReadingProgress.set(false);
    readingProgress.set(0);
  });
</script>

<!-- No visual output, just logic -->