<script>
    import { posts } from '$lib/posts';
    import { categories } from '$lib/config';

    let activeFilters = new Set();

    function toggleFilter(category) {
        if (activeFilters.has(category)) {
            activeFilters.delete(category);
        } else {
            activeFilters.add(category);
        }
        activeFilters = activeFilters;
    }

    $: filteredPosts = activeFilters.size === 0
        ? posts
        : posts.filter(post => 
            post.categories?.some(category => activeFilters.has(category))
        );
</script>

<div class="max-w-4xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-8">
        <h1 class="text-4xl sm:text-5xl font-bold text-purple-300">Project Gallery</h1>

        <!-- Filter controls -->
        <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm text-gray-400 mr-2">
                Filter:
            </span>
            {#each Object.entries(categories) as [id, category]}
                <button
                    class="px-2 py-0.5 text-sm rounded transition-colors duration-200 
                           {activeFilters.has(id) ? category.activeClass : category.inactiveClass}"
                    on:click={() => toggleFilter(id)}
                >
                    {category.label}
                </button>
            {/each}
            <button
                class="px-2 py-0.5 text-sm rounded transition-colors duration-200
                       {activeFilters.size === 0 
                           ? 'bg-gray-800/30 text-gray-400/50 cursor-not-allowed' 
                           : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}"
                on:click={() => activeFilters = new Set()}
                disabled={activeFilters.size === 0}
            >
                Clear
            </button>
        </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        {#each filteredPosts as post}
            <a href={post.path} class="block hover:opacity-75 transition-opacity [@media(hover:hover)]:hover:opacity-75">
                {#if post.image}
                    <div class="relative">
                        <img 
                            src={post.image} 
                            alt={post.title}
                            class="w-full h-48 object-contain rounded-lg bg-gray-800"
                        />
                        {#if post.categories}
                            <div class="absolute bottom-2 left-2 flex gap-1">
                                {#each post.categories as categoryId}
                                    {#if categories[categoryId]}
                                        <span class="px-2 py-0.5 text-xs rounded {categories[categoryId].activeClass}">
                                            {categories[categoryId].label}
                                        </span>
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                    </div>
                    <p class="mt-2 text-sm text-gray-400">{post.title}</p>
                {:else}
                    <div class="relative w-full h-48 rounded-lg bg-gray-800 flex items-center justify-center p-4 border border-gray-700">
                        <h2 class="text-xl font-semibold text-center text-blue-300 leading-tight tracking-wide">{post.title}</h2>
                        {#if post.categories}
                            <div class="absolute bottom-2 left-2 flex gap-1">
                                {#each post.categories as categoryId}
                                    {#if categories[categoryId]}
                                        <span class="px-2 py-0.5 text-xs rounded {categories[categoryId].activeClass}">
                                            {categories[categoryId].label}
                                        </span>
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/if}
            </a>
        {/each}
    </div>
</div> 