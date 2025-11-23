<script>
    import { page } from '$app/stores';

    export let title = 'Josh Mosier';
    export let description = 'Personal portfolio and blog of Josh Mosier';
    export let image = '/profile.png';
    export let article = false;
    export let author = 'Josh Mosier';

    $: fullTitle = title === 'Josh Mosier' ? title : `${title} | Josh Mosier`;
    $: url = $page.url.href;
    $: imageUrl = image.startsWith('http') ? image : `${$page.url.origin}${image}`;
</script>

<svelte:head>
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={article ? 'article' : 'website'} />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:site_name" content="Josh Mosier" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:title" content={fullTitle} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={imageUrl} />

    {#if article}
        <meta property="article:author" content={author} />
    {/if}
</svelte:head>
