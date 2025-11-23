<script>
    import ReadingProgress from '$lib/components/ReadingProgress.svelte';
    import TableOfContents from '$lib/components/TableOfContents.svelte';
    import SEO from '$lib/components/SEO.svelte';
    export let data;
</script>

<SEO 
    title={data.metadata.title}
    description={data.metadata.description}
    image={data.metadata.image}
    article={true}
/>

<ReadingProgress />

<div class="relative max-w-4xl mx-auto px-4">
    <!-- Main content stays centered -->
    <article>
        <svelte:component this={data.content} />
    </article>
    
    <!-- Table of Contents positioned with sticky positioning -->
    <div class="fixed top-60 right-[calc(50%+33rem)] w-32">
        <TableOfContents />
    </div>
</div>