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

<div class="max-w-5xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-10 animate-fade-in-up">
        <h1 class="text-4xl sm:text-5xl font-bold font-display">
            <span class="bg-gradient-to-r from-violet-400 to-accent-teal bg-clip-text text-transparent">Project Gallery</span>
        </h1>

        <!-- Filter controls -->
        <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm text-slate-500 mr-2">
                Filter:
            </span>
            {#each Object.entries(categories) as [id, category]}
                <button
                    class="px-2.5 py-1 text-sm rounded-md transition-all duration-200 
                           {activeFilters.has(id) ? category.activeClass : category.inactiveClass}"
                    on:click={() => toggleFilter(id)}
                >
                    {category.label}
                </button>
            {/each}
            <button
                class="px-2.5 py-1 text-sm rounded-md transition-all duration-200
                       {activeFilters.size === 0 
                           ? 'bg-bg-tertiary/30 text-slate-600 cursor-not-allowed' 
                           : 'bg-bg-tertiary text-slate-400 hover:bg-bg-tertiary/80 hover:text-slate-300'}"
                on:click={() => activeFilters = new Set()}
                disabled={activeFilters.size === 0}
            >
                Clear
            </button>
        </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
        {#each filteredPosts as post, i}
            <a 
                href={post.path} 
                class="group block animate-fade-in-up"
                style="animation-delay: {i * 50}ms"
            >
                {#if post.image}
                    <div class="relative overflow-hidden rounded-xl bg-bg-secondary border border-bg-tertiary hover:border-violet-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5">
                        <div class="aspect-[4/3] overflow-hidden">
                            <img 
                                src={post.image} 
                                alt={post.title}
                                class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        {#if post.categories}
                            <div class="absolute bottom-3 left-3 flex gap-1.5">
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
                    <p class="mt-3 text-sm text-slate-400 group-hover:text-violet-400 transition-colors font-medium">{post.title}</p>
                {:else}
                    <div class="relative w-full aspect-[4/3] rounded-xl bg-bg-secondary flex items-center justify-center p-4 border border-bg-tertiary hover:border-accent-teal/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent-teal/5">
                        <h2 class="text-lg font-semibold text-center text-accent-teal leading-tight tracking-wide group-hover:text-accent-teal-light transition-colors">{post.title}</h2>
                        {#if post.categories}
                            <div class="absolute bottom-3 left-3 flex gap-1.5">
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