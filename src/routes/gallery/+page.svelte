<script>
    import { posts } from '$lib/posts';
</script>

<div class="max-w-4xl mx-auto">
    <h1 class="text-5xl font-bold mb-8 text-purple-300">Project Gallery</h1>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        {#each posts as post}
            <a href={post.path} class="block hover:opacity-75 transition-opacity">
                {#if post.image}
                    <img 
                        src={post.image} 
                        alt={post.title}
                        class="w-full h-48 object-cover rounded-lg"
                    />
                    <p class="mt-2 text-sm text-gray-400">{post.title}</p>
                {:else}
                    <div class="w-full h-48 rounded-lg bg-gray-800 flex items-center justify-center p-4 border border-gray-700">
                        <h2 class="text-xl font-semibold text-center text-blue-300 leading-tight tracking-wide">{post.title}</h2>
                    </div>
                {/if}
            </a>
        {/each}
    </div>
</div> 