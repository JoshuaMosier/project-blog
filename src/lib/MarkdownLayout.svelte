<script>
    // These props will be populated from the markdown frontmatter
    export let title;
    export let date;
    export let categories = [];
    export let description = '';

    // Import categories from config
    import { categories as categoryConfig } from '$lib/config';

    import Giscus from '$lib/components/Giscus.svelte';
    import { posts } from '$lib/posts';
    import Lightbox from '$lib/components/Lightbox.svelte';

    // Find current post index
    const currentPostIndex = posts.findIndex(post => post.title === title);
    
    // Get previous and next posts
    const previousPost = currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;
    const nextPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;

    import { onMount } from 'svelte';
    
    onMount(() => {
        // Only apply lightbox if screen width is > 768px
        if (window.innerWidth > 768) {
            const images = document.querySelectorAll('.prose img:not(.no-lightbox)');
            images.forEach(img => {
                // Create wrapper and Lightbox component
                const wrapper = document.createElement('div');
                const lightbox = new Lightbox({
                    target: wrapper,
                    props: {
                        src: img.getAttribute('src'),
                        alt: img.getAttribute('alt') || ''
                    }
                });

                // Move the image into the Lightbox slot
                const slotContainer = wrapper.querySelector('[role="button"]');
                if (slotContainer) {
                    slotContainer.appendChild(img.cloneNode(true));
                    img.parentNode.replaceChild(wrapper, img);
                }
            });
        }
    });
</script>

<article class="max-w-4xl mx-auto px-4 animate-fade-in-up">
    <header class="max-w-4xl mx-auto mb-12 text-center">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 leading-tight font-display bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">{title}</h1>
        
        {#if description}
            <p class="text-base text-slate-400 mb-6 leading-relaxed max-w-2xl mx-auto">{description}</p>
        {/if}
        
        <div class="max-w-lg mx-auto border-b border-bg-tertiary py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            {#if date}
                <time class="font-medium flex items-center gap-2">
                    <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(`${date.split('T')[0]}T12:00:00Z`).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'America/New_York'
                    })}
                </time>
            {/if}
            
            {#if categories?.length}
                <div class="flex gap-2">
                    {#each categories as category}
                        {#if categoryConfig[category]}
                            <span class="px-2.5 py-1 text-xs rounded-md {categoryConfig[category].activeClass}">
                                {categoryConfig[category].label}
                            </span>
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    </header>
    
    <div class="markdown-content w-full mx-auto prose prose-invert max-w-none">
        <slot />
    </div>
    
    <div class="max-w-4xl mx-auto">
        <hr class="my-16 border-bg-tertiary" />
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {#if nextPost}
                <a 
                    href={nextPost.path}
                    class="group flex items-center p-4 bg-bg-secondary rounded-xl border border-bg-tertiary hover:border-accent-teal/40 transition-all duration-300 no-underline hover:shadow-lg hover:shadow-accent-teal/5"
                >
                    <span class="mr-3 text-slate-500 group-hover:text-accent-teal transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </span>
                    <div class="flex flex-col">
                        <span class="text-xs text-slate-500 uppercase tracking-wider mb-1">Next</span>
                        <span class="text-accent-teal group-hover:text-accent-teal-light transition-colors line-clamp-2 font-medium">{nextPost.title}</span>
                    </div>
                </a>
            {:else}
                <div></div>
            {/if}

            {#if previousPost}
                <a 
                    href={previousPost.path}
                    class="group flex items-center justify-end p-4 bg-bg-secondary rounded-xl border border-bg-tertiary hover:border-violet-500/40 transition-all duration-300 no-underline hover:shadow-lg hover:shadow-violet-500/5"
                >
                    <div class="flex flex-col items-end">
                        <span class="text-xs text-slate-500 uppercase tracking-wider mb-1">Previous</span>
                        <span class="text-accent-teal group-hover:text-violet-400 transition-colors line-clamp-2 text-right font-medium">{previousPost.title}</span>
                    </div>
                    <span class="ml-3 text-slate-500 group-hover:text-violet-400 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </a>
            {/if}
        </div>
    </div>
    
    <!-- <Giscus 
        repo="JoshuaMosier/project-blog"
        repoId="R_kgDOMnDwhg"
        category="General"
        categoryId="DIC_kwDOMnDwhs4ClJQd"
    /> -->
</article>