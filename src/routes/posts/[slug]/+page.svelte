<script>
    import ReadingProgress from '$lib/components/ReadingProgress.svelte';
    import TableOfContents from '$lib/components/TableOfContents.svelte';
    export let data;
</script>

<ReadingProgress />

<div class="relative max-w-4xl mx-auto px-4">
    <!-- Main content stays centered -->
    <article>
        <svelte:component this={data.content} />
    </article>
    
    <!-- Table of Contents positioned with sticky positioning -->
    <div class="fixed top-24 right-[calc(40%+33rem)] w-64">
        <TableOfContents />
    </div>
</div>