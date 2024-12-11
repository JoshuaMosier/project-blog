<script>
    // These props will be populated from the markdown frontmatter
    export let title;
    export let date;
    export let image = null; // Make image optional
</script>

<article class="prose prose-invert mx-auto">
    <header class="mb-8">
        <h1 class="text-4xl font-bold mb-2">{title}</h1>
        {#if date}
            <time class="text-gray-400">
                {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </time>
        {/if}
        {#if image}
            <img 
                src={image} 
                alt={title}
                class="mt-4 w-full max-h-96 object-cover rounded-lg"
            />
        {/if}
    </header>
    
    <div class="markdown-content">
        <slot />
    </div>
</article>

<style>
    :global(.prose) {
        max-width: 65ch;
        color: #fff;
    }
    
    :global(.prose a) {
        color: #93c5fd; /* text-blue-300 */
    }
    
    :global(.prose a:hover) {
        color: #60a5fa; /* text-blue-400 */
    }
</style> 