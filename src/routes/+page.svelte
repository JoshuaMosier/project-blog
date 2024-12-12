<script>
    import { getPostsByYear } from '$lib/posts';
    import { categories } from '$lib/config';
    
    const postsByYear = getPostsByYear();
    let activeFilters = new Set();
    
    function toggleFilter(category) {
        if (activeFilters.has(category)) {
            activeFilters.delete(category);
        } else {
            activeFilters.add(category);
        }
        activeFilters = activeFilters;
    }

    $: filteredPostsByYear = Object.fromEntries(
        Object.entries(postsByYear).map(([year, posts]) => [
            year,
            activeFilters.size === 0
                ? posts
                : posts.filter(post => 
                    post.categories?.some(category => activeFilters.has(category))
                )
        ]).filter(([_, posts]) => posts.length > 0)
    );
</script>

<div class="max-w-4xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-8">
        <h1 class="text-4xl sm:text-5xl font-bold text-purple-300">Posts</h1>

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

    <section>
        {#each Object.entries(filteredPostsByYear).sort((a, b) => b[0] - a[0]) as [year, yearPosts]}
            <div class="mb-8">
                <h2 class="text-3xl font-bold mb-4 text-gray-400">{year}</h2>
                <ul class="space-y-2">
                    {#each yearPosts as post}
                        <li class="flex justify-between items-baseline">
                            <div class="flex items-center gap-2">
                                <a 
                                    href={post.path}
                                    class="text-blue-300 hover:text-blue-400 text-lg"
                                >
                                    {post.title}
                                </a>
                                <div class="flex gap-1">
                                    {#if post.categories}
                                        {#each post.categories as categoryId}
                                            {#if categories[categoryId]}
                                                <span class="px-2 py-0.5 text-xs rounded {categories[categoryId].activeClass}">
                                                    {categories[categoryId].label}
                                                </span>
                                            {/if}
                                        {/each}
                                    {/if}
                                </div>
                            </div>
                            <span class="hidden sm:inline text-gray-500">{post.displayDate}</span>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </section>

    <footer class="mt-16 mb-8 text-center text-sm text-gray-700">
        © {new Date().getFullYear()} Josh Mosier. All rights reserved.
    </footer>
</div>