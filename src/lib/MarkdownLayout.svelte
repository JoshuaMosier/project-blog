<script>
    // These props will be populated from the markdown frontmatter
    export let title;
    export let date;
    export let categories = [];  // Add categories prop

    // Define categories with their styling (same as in landing page)
    const categoryStyles = {
        'software': {
            label: 'Software',
            class: 'bg-blue-900 text-blue-300'
        },
        '3d-printing': {
            label: '3D Printing',
            class: 'bg-orange-900 text-orange-300'
        },
        'electronics': {
            label: 'Electronics',
            class: 'bg-emerald-900 text-emerald-300'
        }
    };

    import Giscus from '$lib/components/Giscus.svelte';
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
                        {#if categoryStyles[category]}
                            <span class="px-2 py-0.5 text-xs rounded {categoryStyles[category].class}">
                                {categoryStyles[category].label}
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
    
    <Giscus 
        repo="JoshuaMosier/project-blog"
        repoId="R_kgDOMnDwhg"
        category="General"
        categoryId="DIC_kwDOMnDwhs4ClJQd"
    />
</article>

<style>
    :global(.prose) {
        color: #fff;
        font-family: 'Inter', sans-serif;
    }
    
    :global(.prose h1, .prose h2, .prose h3, .prose h4) {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
    }
    
    :global(.prose code) {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9em;
    }
    
    :global(.prose a) {
        color: #93c5fd; /* text-blue-300 */
    }
    
    :global(.prose a:hover) {
        color: #60a5fa; /* text-blue-400 */
    }
    
    :global(.prose h2) {
        @apply mt-12 mb-6 pb-2 border-b border-gray-700;
    }
    
    :global(.prose > p:first-of-type) {
        @apply text-lg text-gray-300 leading-relaxed;
    }
    
    :global(.prose blockquote) {
        @apply bg-gray-800/50 border-l-4 border-purple-400 p-4 rounded-r-lg;
    }
    
    :global(.prose pre) {
        @apply bg-gray-800/70 border border-gray-700 rounded-lg shadow-lg;
    }
    
    :global(.prose img) {
        @apply rounded-lg shadow-lg;
    }
</style> 