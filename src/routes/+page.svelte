<script>
    import { getPostsByYear, posts } from '$lib/posts';
    import { categories } from '$lib/config';
    import SEO from '$lib/components/SEO.svelte';
    
    const postsByYear = getPostsByYear();
    let activeFilters = new Set();
    
    // Get featured projects (most recent 3 with images)
    const featuredProjects = posts.filter(p => p.image).slice(0, 3);
    
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

<SEO />

<div class="max-w-5xl mx-auto">
    <!-- Hero Section -->
    <section class="mb-16 animate-fade-in-up">
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div class="flex-shrink-0">
                <div class="relative">
                    <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-violet-400/30 shadow-xl shadow-violet-500/10">
                        <img 
                            src="/profile-color.png" 
                            alt="Josh Mosier" 
                            class="w-full h-full object-cover"
                        />
                    </div>
                    <div class="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500/20 to-accent-teal/20 blur-xl -z-10"></div>
                </div>
            </div>
            <div class="text-center md:text-left">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
                    <span class="text-slate-100">Hi, I'm </span>
                    <span class="bg-gradient-to-r from-violet-400 to-accent-teal bg-clip-text text-transparent">Josh Mosier</span>
                </h1>
                <p class="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
                    Software developer & mechanical engineer who enjoys building things at the intersection of code, electronics, and fabrication.
                </p>
                <div class="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                    <a href="/about" class="px-5 py-2.5 bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-lg font-medium hover:bg-violet-500/20 transition-all duration-200 hover:scale-105">
                        About Me
                    </a>
                    <a href="/gallery" class="px-5 py-2.5 bg-bg-tertiary text-slate-300 border border-bg-tertiary rounded-lg font-medium hover:border-accent-teal/50 hover:text-accent-teal transition-all duration-200">
                        View Gallery
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Projects -->
    <section class="mb-16">
        <h2 class="text-2xl font-bold font-display text-slate-200 mb-6 flex items-center gap-3">
            <span class="w-8 h-0.5 bg-gradient-to-r from-violet-400 to-transparent"></span>
            Featured Projects
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {#each featuredProjects as project, i}
                <a 
                    href={project.path}
                    class="group relative bg-bg-secondary rounded-xl overflow-hidden border border-bg-tertiary hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 animate-fade-in-up"
                    style="animation-delay: {(i + 1) * 100}ms"
                >
                    <div class="aspect-[4/3] overflow-hidden">
                        <img 
                            src={project.image} 
                            alt={project.title}
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80"></div>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                        <h3 class="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                            {project.title}
                        </h3>
                        {#if project.categories?.length}
                            <div class="flex gap-1.5 mt-2">
                                {#each project.categories as categoryId}
                                    {#if categories[categoryId]}
                                        <span class="px-2 py-0.5 text-xs rounded {categories[categoryId].activeClass}">
                                            {categories[categoryId].label}
                                        </span>
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                    </div>
                </a>
            {/each}
        </div>
    </section>

    <!-- All Posts Section -->
    <section>
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-8">
            <h2 class="text-2xl font-bold font-display text-slate-200 flex items-center gap-3">
                <span class="w-8 h-0.5 bg-gradient-to-r from-accent-teal to-transparent"></span>
                All Posts
            </h2>

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

        {#each Object.entries(filteredPostsByYear).sort((a, b) => b[0] - a[0]) as [year, yearPosts], yearIndex}
            <div class="mb-10 animate-fade-in-up" style="animation-delay: {(yearIndex + 4) * 50}ms">
                <h3 class="text-xl font-bold mb-4 text-slate-500 font-display">{year}</h3>
                <ul class="space-y-3">
                    {#each yearPosts as post, postIndex}
                        <li class="flex justify-between items-baseline relative group py-2 px-3 -mx-3 rounded-lg hover:bg-bg-secondary/50 transition-colors duration-200">
                            <div class="flex items-center gap-3 flex-wrap">
                                <a 
                                    href={post.path}
                                    class="relative text-accent-teal hover:text-violet-400 text-lg font-medium transition-colors duration-150 ease-in-out"
                                >
                                    {#if post.image}
                                        <div class="pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 absolute right-full mr-4 top-1/2 -translate-y-1/2 transition-all duration-200 ease-out z-10">
                                            <img 
                                                src={post.image} 
                                                alt={post.title}
                                                class="max-w-[180px] max-h-[180px] w-auto h-auto object-contain rounded-lg bg-bg-secondary border border-bg-tertiary shadow-xl"
                                            />
                                        </div>
                                    {/if}
                                    {post.title}
                                </a>
                                <div class="flex gap-1.5">
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
                            <span class="hidden sm:inline text-slate-600 text-sm">{post.displayDate}</span>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </section>

    <footer class="mt-20 mb-8 pt-8 border-t border-bg-tertiary text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Josh Mosier
    </footer>
</div>