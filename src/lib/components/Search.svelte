<!-- src/lib/components/Search.svelte -->
<script>
    import { posts } from '$lib/posts';
    import { postContent } from '$lib/postContent';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let searchQuery = '';
    let showResults = false;
    let searchResults = [];
    let searchInput;
    let searchTimeout;
    let contentCache = new Map();

    // Add helper function to get context snippet
    function getContextSnippet(content, query, snippetLength = 50) {
        const lowerContent = content.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const index = lowerContent.indexOf(lowerQuery);
        
        if (index === -1) return '';
        
        const start = Math.max(0, index - snippetLength);
        const end = Math.min(content.length, index + query.length + snippetLength);
        
        // Get the three parts of the snippet: before match, match, and after match
        const beforeMatch = content.slice(start, index);
        const match = content.slice(index, index + query.length);
        const afterMatch = content.slice(index + query.length, end);
        
        // Add ellipsis if truncated
        const prefix = start > 0 ? '...' : '';
        const suffix = end < content.length ? '...' : '';
        
        // Return an object with the parts for highlighting
        return {
            prefix,
            beforeMatch,
            match,
            afterMatch,
            suffix
        };
    }

    // Debounced search function
    async function performSearch() {
        console.log('Performing search for:', searchQuery);
        
        if (searchQuery.length < 2) {
            searchResults = [];
            showResults = false;
            return;
        }

        const query = searchQuery.toLowerCase();
        console.log('Normalized query:', query);

        // Search in titles and pre-processed content
        searchResults = posts
            .filter(post => {
                const titleMatch = post.title.toLowerCase().includes(query);
                const contentMatch = postContent[post.id]?.toLowerCase().includes(query);
                return titleMatch || contentMatch;
            })
            .map(post => ({
                ...post,
                snippet: postContent[post.id] ? getContextSnippet(postContent[post.id], query) : ''
            }))
            .slice(0, 5);
        
        console.log('Final search results:', searchResults);
        showResults = true;
    }

    // Debounced search handler
    $: {
        console.log('Search query changed:', searchQuery);
        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    }

    // Handle click outside to close results
    function handleClickOutside(event) {
        if (searchInput && !searchInput.contains(event.target)) {
            showResults = false;
        }
    }

    // Navigate to selected result
    function handleSelect(path) {
        searchQuery = '';
        showResults = false;
        goto(path);
    }
</script>

<div class="relative w-full" bind:this={searchInput}>
    <div class="relative w-full">
        <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search posts..."
            class="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg 
                   focus:outline-none focus:border-purple-500 text-gray-200 
                   placeholder-gray-400"
        />
        {#if searchQuery}
            <button
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                on:click={() => { searchQuery = ''; showResults = false; }}
            >
                ✕
            </button>
        {/if}
    </div>

    {#if showResults}
        <div class="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg 
                    shadow-lg overflow-hidden">
            {#if searchResults.length > 0}
                <ul>
                    {#each searchResults as result}
                        <li>
                            <button
                                class="w-full px-4 py-2 text-left hover:bg-gray-700 text-gray-200"
                                on:click={() => handleSelect(result.path)}
                            >
                                <div class="text-sm font-medium">{result.title}</div>
                                {#if result.snippet}
                                    <div class="text-xs text-gray-400 mt-1 line-clamp-2">
                                        {result.snippet.prefix}{result.snippet.beforeMatch}
                                        <span class="bg-purple-500/30 text-purple-200 font-medium">
                                            {result.snippet.match}
                                        </span>
                                        {result.snippet.afterMatch}{result.snippet.suffix}
                                    </div>
                                {/if}
                                {#if result.displayDate}
                                    <div class="text-xs text-gray-400 mt-1">{result.displayDate}</div>
                                {/if}
                            </button>
                        </li>
                    {/each}
                </ul>
            {:else}
                <div class="px-4 py-2 text-sm text-gray-400">
                    No results found
                </div>
            {/if}
        </div>
    {/if}
</div>