<script>
    export let items = [];  // Array of {src, alt, type: 'image'|'video'} objects
    let currentIndex = 0;
    let isOpen = false;
    
    const isMobile = () => window.innerWidth <= 768;

    function handleKey(event) {
        if (!isOpen) {
            if ((event.key === 'Enter' || event.key === ' ') && !isMobile()) {
                isOpen = true;
            }
            return;
        }

        switch (event.key) {
            case 'Escape':
                closeCarousel();
                break;
            case 'ArrowLeft':
                previousItem();
                break;
            case 'ArrowRight':
                nextItem();
                break;
        }
    }

    function handleBackdropClick(event) {
        // Stop event propagation
        event.stopPropagation();
        
        // Only close if clicking directly on the backdrop
        if (event.target.classList.contains('carousel-backdrop')) {
            closeCarousel();
        }
    }

    function closeCarousel() {
        isOpen = false;
        currentIndex = 0;  // Reset to first image when closing
    }

    function nextItem() {
        if (currentIndex === items.length - 1) {
            // If we're at the last item, close the carousel
            closeCarousel();
        } else {
            // Otherwise, move to next item
            currentIndex = (currentIndex + 1) % items.length;
        }
    }

    function previousItem() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    }

    $: currentItem = items[currentIndex];
</script>

<svelte:window on:keydown={handleKey} />

<div 
    class="cursor-zoom-in md:cursor-zoom-in cursor-default" 
    on:click={() => !isMobile() && (isOpen = true)}
    on:keypress={handleKey}
    role="button"
    tabindex="0"
>
    <slot />
</div>

{#if isOpen}
    <div 
        class="carousel-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        on:click={handleBackdropClick}
        role="presentation"
    >
        <div 
            class="relative max-w-[90vw] max-h-[90vh]"
            on:click|stopPropagation={() => {}}
        >
            {#if currentItem.type === 'video'}
                <video
                    src={currentItem.src}
                    controls
                    autoplay
                    muted
                    class="min-h-[50vh] max-h-[90vh] min-w-[50vw] max-w-[90vw] w-auto h-auto object-contain"
                >
                    <track kind="captions">
                </video>
            {:else}
                <img 
                    src={currentItem.src} 
                    alt={currentItem.alt} 
                    class="min-h-[50vh] max-h-[90vh] min-w-[50vw] max-w-[90vw] w-auto h-auto object-contain lightbox-image no-lightbox"
                />
            {/if}

            {#if currentItem.alt}
                <div class="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white text-center">
                    {currentItem.alt}
                </div>
            {/if}

            {#if items.length > 1}
                <!-- Navigation controls container moved up -->
                <div class="absolute bottom-16 left-0 right-0 flex justify-center items-center gap-4">
                    <button
                        class="text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-3"
                        on:click|stopPropagation={previousItem}
                        aria-label="Previous item"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <!-- Item counter -->
                    <div class="bg-black/50 px-3 py-1 rounded-full text-white/70 text-sm font-mono w-[6rem] text-center">
                        {currentIndex + 1} / {items.length}
                    </div>

                    <button
                        class="text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-3"
                        on:click|stopPropagation={nextItem}
                        aria-label="Next item"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            {/if}

            <!-- Close button -->
            <button
                class="absolute -top-2 -right-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
                on:click={closeCarousel}
                aria-label="Close carousel"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
{/if}