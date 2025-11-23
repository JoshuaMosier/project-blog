<script>
    // These props will be populated from the markdown frontmatter
    export let title;
    export let date;
    export let categories = [];

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

<article class="prose prose-invert max-w-4xl mx-auto">
    <header class="mb-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
        <h1 class="text-4xl font-bold mb-2">{title}</h1>
        <div class="flex justify-between items-center">
            {#if date}
                <time class="text-gray-400">
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
                            <span class="px-2 py-0.5 text-xs rounded {categoryConfig[category].activeClass}">
                                {categoryConfig[category].label}
                            </span>
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    </header>
    
    <div class="markdown-content max-w-2xl mx-auto">
        <slot />
    </div>
    
    <div class="max-w-6xl mx-auto">
        <hr class="my-16 border-gray-700" />
        
        <div class="grid grid-cols-2 gap-4">
            {#if nextPost}
                <a 
                    href={nextPost.path}
                    class="group flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-colors no-underline"
                >
                    <span class="mr-3 text-gray-400 group-hover:text-purple-300">←</span>
                    <div class="flex flex-col">
                        <span class="text-sm text-gray-400">Next</span>
                        <span class="text-blue-300 group-hover:text-blue-400 line-clamp-2">{nextPost.title}</span>
                    </div>
                </a>
            {:else}
                <div></div>
            {/if}

            {#if previousPost}
                <a 
                    href={previousPost.path}
                    class="group flex items-center justify-end p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-colors no-underline"
                >
                    <div class="flex flex-col items-end">
                        <span class="text-sm text-gray-400">Previous</span>
                        <span class="text-blue-300 group-hover:text-blue-400 line-clamp-2 text-right">{previousPost.title}</span>
                    </div>
                    <span class="ml-3 text-gray-400 group-hover:text-purple-300">→</span>
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