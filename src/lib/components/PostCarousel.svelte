<script>
    import ImageCarousel from './ImageCarousel.svelte';
    
    export let items = [];
    export let containerClass = "w-[400px] max-w-full";
</script>

<div class="flex flex-col items-center w-full my-8">
    <ImageCarousel {items}>
        {#if items[0].type === 'video'}
            <video
                src={items[0].src}
                class="{containerClass} h-auto rounded-lg shadow-lg mx-auto cursor-pointer"
                controls
            >
                <track kind="captions">
            </video>
        {:else}
            <img 
                src={items[0].src} 
                alt={items[0].alt} 
                class="{containerClass} h-auto rounded-lg shadow-lg mx-auto cursor-pointer no-lightbox" 
            />
        {/if}
    </ImageCarousel>
    <span class="mt-2 text-sm text-gray-400 italic">
        Click above to view project images
    </span>
</div>