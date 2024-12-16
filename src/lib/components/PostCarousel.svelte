<script>
    import ImageCarousel from './ImageCarousel.svelte';
    
    export let items = [];
    export let containerClass = "w-[400px] max-w-full";

    // Mobile carousel state
    let mobileCurrentIndex = 0;

    function nextMobileItem() {
        mobileCurrentIndex = (mobileCurrentIndex + 1) % items.length;
    }

    function prevMobileItem() {
        mobileCurrentIndex = (mobileCurrentIndex - 1 + items.length) % items.length;
    }
</script>

<div class="flex flex-col items-center w-full my-8">
    {#if items && items.length > 0}
        <!-- Desktop Carousel -->
        <div class="hidden md:block">
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
            <p class="text-sm text-gray-400 italic mt-2 text-center">Click image above to view gallery</p>
        </div>

        <!-- Mobile Carousel -->
        <div class="md:hidden w-full px-4">
            <div class="relative">
                <div class="aspect-[4/3] w-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                    {#if items[mobileCurrentIndex].type === 'video'}
                        <video
                            src={items[mobileCurrentIndex].src}
                            class="w-full h-full object-contain"
                            controls
                        >
                            <track kind="captions">
                        </video>
                    {:else}
                        <img 
                            src={items[mobileCurrentIndex].src} 
                            alt={items[mobileCurrentIndex].alt} 
                            class="w-full h-full object-contain" 
                        />
                    {/if}
                </div>

                <!-- Navigation buttons -->
                {#if items.length > 1}
                    <button
                        class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white/70 hover:text-white p-2 rounded-full"
                        on:click={prevMobileItem}
                        aria-label="Previous image"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white/70 hover:text-white p-2 rounded-full"
                        on:click={nextMobileItem}
                        aria-label="Next image"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <!-- Image counter -->
                    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white/70 px-3 py-1 rounded-full text-sm">
                        {mobileCurrentIndex + 1} / {items.length}
                    </div>
                {/if}
            </div>

            {#if items[mobileCurrentIndex].alt}
                <p class="text-sm text-gray-400 italic mt-2 text-center">
                    {items[mobileCurrentIndex].alt}
                </p>
            {/if}
        </div>
    {:else}
        <p>No images to display</p>
    {/if}
</div>

<style>
    /* Hide scrollbar but keep functionality */
    .scrollbar-hide {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;     /* Firefox */
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;             /* Chrome, Safari and Opera */
    }
</style>