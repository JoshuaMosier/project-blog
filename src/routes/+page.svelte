<script>
    import { getPostsByYear } from '$lib/posts';
    const postsByYear = getPostsByYear();
</script>

<div class="max-w-2xl mx-auto">
    <h1 class="text-5xl font-bold mb-8 text-purple-300">Posts</h1>

    <section>
        {#each Object.entries(postsByYear).sort((a, b) => b[0] - a[0]) as [year, yearPosts]}
            <div class="mb-8">
                <h2 class="text-3xl font-bold mb-4 text-gray-400">{year}</h2>
                <ul class="space-y-2">
                    {#each yearPosts as post}
                        <li class="flex justify-between items-baseline">
                            <a 
                                href={post.path}
                                class="text-blue-300 hover:text-blue-400 text-lg"
                            >
                                {post.title}
                            </a>
                            <span class="text-gray-500">{post.displayDate}</span>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </section>
</div>